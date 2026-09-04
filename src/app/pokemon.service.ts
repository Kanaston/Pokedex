import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PokemonListItem {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: { ['official-artwork']?: { front_default: string } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: PokemonStat[];
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}

export interface Generation {
  id: number;
  region: string;
  start: number;
  end: number;
}

/** Rangos del Pokédex nacional por región. Última generación: 906-1025 */
export const GENERATIONS: Generation[] = [
  { id: 1, region: 'Kanto', start: 1, end: 151 },
  { id: 2, region: 'Johto', start: 152, end: 251 },
  { id: 3, region: 'Hoenn', start: 252, end: 386 },
  { id: 4, region: 'Sinnoh', start: 387, end: 493 },
  { id: 5, region: 'Teselia', start: 494, end: 649 },
  { id: 6, region: 'Kalos', start: 650, end: 721 },
  { id: 7, region: 'Alola', start: 722, end: 809 },
  { id: 8, region: 'Galar', start: 810, end: 898 },
  { id: 9, region: 'Paldea', start: 906, end: 1025 },
];

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';
  private readonly spriteUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) {}

  /** Trae id + nombre + sprite de todos los pokemones entre `start` y `end` */
  getPokemonRange(start: number, end: number): Observable<PokemonListItem[]> {
    const limit = end - start + 1;
    const offset = start - 1;
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `${this.baseUrl}?offset=${offset}&limit=${limit}`
      )
      .pipe(
        map(res =>
          res.results.map((p, index) => {
            const id = start + index;
            return {
              id,
              name: p.name,
              sprite: `${this.spriteUrl}/${id}.png`,
            };
          })
        )
      );
  }

  /** Trae el detalle completo de un pokemon por nombre o id */
  getPokemon(nombreOId: string | number): Observable<PokemonDetail> {
    const valor = typeof nombreOId === 'string' ? nombreOId.toLowerCase().trim() : nombreOId;
    return this.http.get<PokemonDetail>(`${this.baseUrl}/${valor}`);
  }

  /** Trae la descripción (flavor text) de la pokedex. */
  getPokemonSpecies(nombreOId: string | number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.speciesUrl}/${nombreOId}`);
  }
}