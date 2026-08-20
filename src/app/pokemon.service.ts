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

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';
  private readonly spriteUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) {}

  /** Trae la lista base (id + nombre + sprite) de los primeros `limit` pokemones. */
  getPokemonList(limit = 151): Observable<PokemonListItem[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(`${this.baseUrl}?limit=${limit}`)
      .pipe(
        map(res =>
          res.results.map((p, index) => {
            const id = index + 1;
            return {
              id,
              name: p.name,
              sprite: `${this.spriteUrl}/${id}.png`,
            };
          })
        )
      );
  }

  /** Trae el detalle completo de un pokemon por nombre o id. */
  getPokemon(nombreOId: string | number): Observable<PokemonDetail> {
    const valor = typeof nombreOId === 'string' ? nombreOId.toLowerCase().trim() : nombreOId;
    return this.http.get<PokemonDetail>(`${this.baseUrl}/${valor}`);
  }

  /** Trae la descripción (flavor text) de la pokedex. */
  getPokemonSpecies(nombreOId: string | number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.speciesUrl}/${nombreOId}`);
  }
}