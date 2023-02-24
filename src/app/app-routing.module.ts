import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const myRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => {
      return import('./auth/auth.module').then((module) => module.AuthModule);
    },
  },
  {
    path: 'heroes',
    loadChildren: () => {
      return import('./heroes/heroes.module').then(
        (module) => module.HeroesModule
      );
    },
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
