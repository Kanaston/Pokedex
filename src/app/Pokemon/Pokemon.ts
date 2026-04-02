import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  imports: [],
  template: `
      <hr>
      <input #nombrePokemon type="text" (keyup.enter)="buscar(nombrePokemon.value)" placeholder="Ingrese el nombre del Pokémon">
      <button type="button" (click)="buscar(nombrePokemon.value)">Buscar</button>
      <hr>
      @if (pokemonData) {
        <div>
          <img [src]="pokemonData.sprites.front_default">
          <p>Nombre: {{pokemonData.name}}</p>
          <p>Tipo: {{pokemonData.types[0].type.name}}</p>
          <p>Habilidad: {{pokemonData.abilities[0].ability.name}}</p>
        </div>
      }
  `,
  styleUrl: './Pokemon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pokemon implements OnInit { 
  pokemonData: any;

  constructor(
    private pokemonSvc: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buscar('1');
  }

  buscar(nombre: string) {
    if (!nombre) return;
    const nombreLimpio = nombre.toLowerCase().trim();
    this.pokemonSvc.getPokemon(nombreLimpio).subscribe({
      next: res => { 
        console.log(this.pokemonData);
        this.pokemonData = res;
        this.cdr.detectChanges();
      },
      error: err => {
        alert('Error al obtener el Pokémon. Asegúrate de ingresar un nombre válido.');
      }
    });
  }
}
