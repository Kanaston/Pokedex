import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PokemonService, PokemonListItem, PokemonDetail } from '../pokemon.service';
import { PokeInfo } from '../Poke-info/Poke-info';

@Component({
  selector: 'app-pokemon',
  imports: [PokeInfo],
  template: `
    <div class="buscador">
      <input
        #nombrePokemon
        type="text"
        (keyup.enter)="buscar(nombrePokemon.value)"
        placeholder="Buscar por nombre o número"
      />
      <button type="button" (click)="buscar(nombrePokemon.value)">Buscar</button>
    </div>

    @if (errorMsg()) {
      <p class="error">{{ errorMsg() }}</p>
    }

    @if (loading()) {
      <p class="cargando">Cargando...</p>
    }

    <div class="grid">
      @for (poke of pokemonList(); track poke.id) {
        <div class="card" (click)="seleccionar(poke.id)">
          <img [src]="poke.sprite" [alt]="poke.name" loading="lazy" />
          <p>#{{ poke.id }} {{ poke.name }}</p>
        </div>
      }
    </div>

    @if (selectedPokemon()) {
      <app-poke-info [pokemon]="selectedPokemon()!" (cerrar)="cerrarModal()"></app-poke-info>
    }
  `,
  styleUrl: './Pokemon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pokemon implements OnInit {
  pokemonList = signal<PokemonListItem[]>([]);
  selectedPokemon = signal<PokemonDetail | null>(null);
  loading = signal(false);
  errorMsg = signal('');

  constructor(private pokemonSvc: PokemonService) {}

  ngOnInit() {
    this.loading.set(true);
    this.pokemonSvc.getPokemonList(151).subscribe({
      next: lista => {
        this.pokemonList.set(lista);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('No se pudo cargar la lista de Pokémon.');
        this.loading.set(false);
      },
    });
  }

  seleccionar(id: number) {
    this.errorMsg.set('');
    this.pokemonSvc.getPokemon(id).subscribe({
      next: detalle => this.selectedPokemon.set(detalle),
      error: () => this.errorMsg.set('No se pudo cargar el detalle del Pokémon.'),
    });
  }

  buscar(nombre: string) {
    if (!nombre) return;
    this.errorMsg.set('');
    this.pokemonSvc.getPokemon(nombre).subscribe({
      next: detalle => this.selectedPokemon.set(detalle),
      error: () => this.errorMsg.set('Pokémon no encontrado. Verifica el nombre o número.'),
    });
  }

  cerrarModal() {
    this.selectedPokemon.set(null);
  }
}