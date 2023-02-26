import { Pipe, PipeTransform } from '@angular/core';
import { HeroesResponse } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(value: HeroesResponse): string {
    if (!value.id && !value.alt_img) {
      return 'assets/no-image.png';
    } else if (value.alt_img) {
      return value.alt_img;
    } else {
      return `assets/heroes/${value.id}.jpg`;
    }
  }
}
