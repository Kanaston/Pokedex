import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import { PokemonService, PokemonDetail } from '../pokemon.service';

@Component({
  selector: 'app-poke-info',
  imports: [],
  template: `
    <div class="overlay" (click)="cerrar.emit()">
      <div class="modal" (click)="$event.stopPropagation()">
        <button class="cerrar" type="button" (click)="cerrar.emit()">✕</button>

        <img
          [src]="
            pokemon.sprites.other?.['official-artwork']?.front_default ||
            pokemon.sprites.front_default
          "
          [alt]="pokemon.name"
        />
        <h2>#{{ pokemon.id }} {{ pokemon.name }}</h2>

        @if (descripcion()) {
          <p class="descripcion">{{ descripcion() }}</p>
        }

        <div class="tipos">
          @for (t of pokemon.types; track t.type.name) {
            <span class="tipo">{{ t.type.name }}</span>
          }
        </div>

        <h3>Habilidades</h3>
        <ul>
          @for (a of pokemon.abilities; track a.ability.name) {
            <li>{{ a.ability.name }}</li>
          }
        </ul>

        <h3>Stats</h3>
        <ul class="stats">
          @for (s of pokemon.stats; track s.stat.name) {
            <li>{{ s.stat.name }}: {{ s.base_stat }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './Poke-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeInfo implements OnChanges {
  @Input({ required: true }) pokemon!: PokemonDetail;
  @Output() cerrar = new EventEmitter<void>();

  descripcion = signal('');

  constructor(private pokemonSvc: PokemonService) {}

  ngOnChanges() {
    if (!this.pokemon) return;
    this.descripcion.set('');
    this.pokemonSvc.getPokemonSpecies(this.pokemon.id).subscribe({
      next: species => {
        const entry =
          species.flavor_text_entries.find(e => e.language.name === 'es') ??
          species.flavor_text_entries.find(e => e.language.name === 'en');
        if (entry) {
          this.descripcion.set(entry.flavor_text.replace(/\f|\n/g, ' '));
        }
      },
      error: () => {},
    });
  }
}