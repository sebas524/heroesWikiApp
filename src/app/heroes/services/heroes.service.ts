import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroesResponse } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<HeroesResponse[]> {
    return this.http.get<HeroesResponse[]>(` ${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(`${this.baseUrl}/heroes/${id}`);
  }

  getSuggestions(keyword: string): Observable<HeroesResponse[]> {
    return this.http.get<HeroesResponse[]>(
      ` ${this.baseUrl}/heroes/?q=${keyword}&_limit=6`
    );
  }

  addNewHero(hero: HeroesResponse): Observable<HeroesResponse> {
    return this.http.post<HeroesResponse>(` ${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: HeroesResponse): Observable<HeroesResponse> {
    return this.http.put<HeroesResponse>(
      ` ${this.baseUrl}/heroes/${hero.id}`,
      hero
    );
  }

  deleteHero(id: string): Observable<any> {
    return this.http.delete<any>(` ${this.baseUrl}/heroes/${id}`);
  }
}
