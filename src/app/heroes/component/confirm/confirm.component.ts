import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroesResponse } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [],
})
export class ConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroesResponse
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data);
  }

  delete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
