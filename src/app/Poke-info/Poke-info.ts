import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-poke-info',
  imports: [],
  template: `<p>Poke-info works!</p>`,
  styleUrl: './Poke-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeInfo { }
