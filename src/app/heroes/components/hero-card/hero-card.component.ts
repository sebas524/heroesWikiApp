import { Component, Input } from '@angular/core';
import { HeroesResponse } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [],
})
export class HeroCardComponent {
  @Input() heroes: HeroesResponse[] = [];
}
