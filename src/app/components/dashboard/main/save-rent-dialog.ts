import {Component, Inject} from "@angular/core";
import {Rent} from "../../interfaces/rent";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";// constant by material to handle data ids

@Component({
  selector: 'app-rent-dialog',
  template:
    `<h1 mat-dialog-title>Carga de alquiler</h1>
    <mat-dialog-content>
      <p>Guardamos al Señor/a: {{rentFormData.name}} ?</p>
    </mat-dialog-content>
    <mat-dialog-actions>

      <button mat-button [mat-dialog-close]="true">Si</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
    `
})
export class SaveRentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public rentFormData: Rent) {//inject an objet
  }
}
