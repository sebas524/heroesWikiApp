import { Pipe, PipeTransform } from '@angular/core';
import { HeroesResponse } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(value: HeroesResponse): string {
    return `assets/heroes/${value.id}.jpg`;
  }
}
