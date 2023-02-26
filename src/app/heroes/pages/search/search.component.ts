import { Component } from '@angular/core';
import { HeroesResponse } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  keyword: string = '';
  heroes: HeroesResponse[] = [];
  selectedHero: HeroesResponse | undefined;

  constructor(private heroesService: HeroesService) {}

  searching() {
    this.heroesService
      .getSuggestions(this.keyword.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  theSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      console.log('no value given');

      return;
    }
    const hero: HeroesResponse = event.option.value;
    this.keyword = hero.superhero;

    this.heroesService
      .getHeroById(hero.id!)
      .subscribe((hero) => (this.selectedHero = hero));
  }
}
