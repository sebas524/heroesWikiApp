import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login().subscribe((res) => {
      console.log(res);

      if (res.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }

  loginWithoutCred() {
    this.authService.logout();
    this.router.navigate(['/heroes']);
  }
}
