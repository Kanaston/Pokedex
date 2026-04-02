import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeInfo } from './Poke-info/Poke-info';
import { Pokemon } from './Pokemon/Pokemon';

@Component({
  selector: 'app-root',
  imports: [PokeInfo, Pokemon],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Pokedex');
}
