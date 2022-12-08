import {Component} from "@angular/core";

@Component({
  selector: 'app-rent-dialog',
  template: `<h1 mat-dialog-title>Querés guardar este formulatio?</h1>
                 <mat-dialog-actions>
                   <button mat-button [mat-dialog-close]="true">Si</button>
                   <button mat-button [mat-dialog-close]="false">No</button>
                 </mat-dialog-actions>
  `
})
export class SaveRentDialogComponent{

}
