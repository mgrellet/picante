import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RentService} from "../../services/rent.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrls: ['./rent-dialog.component.css']
})
export class RentDialogComponent implements OnInit {
  rentForm: FormGroup;
  suiteSizes: any;
  suiteColors: any;

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<RentDialogComponent>) {
  }

  ngOnInit(): void {
    this.rentForm = this.formBuilder.group({
      //id: '',
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: '',
      phone: '',
      address: '',
      reservationDate: ['', Validators.required],
      type: '',
      size: '',
      model: '',
      color: '',
      shirt: '',
      tie: '',
      vest: '',
      tryDate: '',
      deliveryDate: '',
      returnDate: '',
      price: '',
      advancePayment: '',
      balance: '',
      notes: ''

    })
  }

  search($event: KeyboardEvent) {

  }

  suitSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suitColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco'
  ]
  shirt: boolean;
  tie: boolean;
  vest: boolean;

  addRent() {
    console.log(this.rentForm.value)
    if (this.rentForm.valid) {
      this.rentService.addElement(this.rentForm.value)
      this.showAddMessage();
      this.rentForm.reset();
      this.dialogRef.close();
    }else{
      this.showSnackBar("Revise los campos requeridos", '', 3000);
    }
  }

  showAddMessage() {
    this.showSnackBar('Alquiler agregado para: ' + this.rentForm.value.name, '', 3000);
    this.rentForm.reset();
  }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message
      , action
      , {
        duration: duration,
        panelClass: ['red-snackbar']
      });
  }
}
