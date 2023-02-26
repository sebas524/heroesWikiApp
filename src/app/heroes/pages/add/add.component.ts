import { Component } from '@angular/core';
import { HeroesResponse, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../component/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent {
  hero: HeroesResponse = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  publishers = [
    {
      id: 'DC Comics',
      description: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
        .subscribe((hero) => (this.hero = hero));
    }
  }

  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if (this.hero.id) {
      //update
      this.heroesService.updateHero(this.hero).subscribe((res) => {
        this.openSnackBar('updated!');
        return (this.hero = res);
      });
    } else {
      //create
      this.heroesService.addNewHero(this.hero).subscribe((res) => {
        this.openSnackBar('succesfully created!');

        return this.router.navigate(['/heroes', res.id]);
      });
    }
  }

  delete() {
    const dialogue = this.dialog.open(ConfirmComponent, {
      width: '550px',
      data: { ...this.hero },
    });

    dialogue.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(this.hero.id!).subscribe((res) => {
          this.openSnackBar('Hero has been deleted.');

          return this.router.navigate(['/heroes']);
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'ok!', { duration: 2500 });
  }
}
