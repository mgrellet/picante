import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RentService} from "../../services/rent.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Rent} from "../../interfaces/rent";

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
              private dialogRef: MatDialogRef<RentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: Rent) { // This is the data that we send to dialog
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
    if (this.editData) {
      this.rentForm.controls['dni'].setValue(this.editData.dni)
      this.rentForm.controls['name'].setValue(this.editData.name)
      this.rentForm.controls['email'].setValue(this.editData.email)
      this.rentForm.controls['phone'].setValue(this.editData.phone)
      this.rentForm.controls['address'].setValue(this.editData.address)
      this.rentForm.controls['reservationDate'].setValue(this.editData.reservationDate)
      this.rentForm.controls['type'].setValue(this.editData.type)
      this.rentForm.controls['size'].setValue(this.editData.size)
      this.rentForm.controls['model'].setValue(this.editData.model)
      this.rentForm.controls['color'].setValue(this.editData.color)
      this.rentForm.controls['shirt'].setValue(this.editData.shirt)
      this.rentForm.controls['tie'].setValue(this.editData.tie)
      this.rentForm.controls['vest'].setValue(this.editData.vest)
      this.rentForm.controls['tryDate'].setValue(this.editData.tryDate)
      this.rentForm.controls['deliveryDate'].setValue(this.editData.deliveryDate)
      this.rentForm.controls['returnDate'].setValue(this.editData.returnDate)
      this.rentForm.controls['price'].setValue(this.editData.price)
      this.rentForm.controls['advancePayment'].setValue(this.editData.advancePayment)
      this.rentForm.controls['balance'].setValue(this.editData.balance)
      this.rentForm.controls['notes'].setValue(this.editData.notes)
    }

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
    } else {
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
