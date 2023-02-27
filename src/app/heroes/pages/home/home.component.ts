import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { myAuthInterface } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  get auth() {
    return this.authService.auth;
  }
  constructor(private router: Router, private authService: AuthService) {}
  logout() {
    this.router.navigate(['./auth/login']);
  }
}
