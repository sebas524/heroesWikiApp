import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { myAuthInterface } from '../interfaces/auth.interface';
import { tap, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: myAuthInterface | undefined;

  get auth(): myAuthInterface {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verifyAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<myAuthInterface>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this.http.get<myAuthInterface>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
