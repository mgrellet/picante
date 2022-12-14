import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Rent} from "../interfaces/rent";
import {RentService} from "../../services/rent.service";
import {SaveRentDialogComponent} from "./save-rent-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  rentForm: FormGroup
  rent: Rent;
  addClicked: boolean;
  today: Date;

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
    this.rentForm = formBuilder.group({
      dni: this.rentForm.value.dni,
      name: this.rentForm.value.name,
      email: this.rentForm.value.email,
      phone: this.rentForm.value.phone,
      address: this.rentForm.value.address,
      reservationDate: this.rentForm.value.reservationDate,
      type: this.rentForm.value.type,
      size: this.rentForm.value.size,
      model: this.rentForm.value.model,
      color: this.rentForm.value.color,
      shirt: this.rentForm.value.shirt,
      tie: this.rentForm.value.tie,
      vest: this.rentForm.value.vest,
      tryDate: this.rentForm.value.tryDate,
      deliveryDate: this.rentForm.value.deliveryDate,
      returnDate: this.rentForm.value.returnDate,
      price: this.rentForm.value.price,
      advancePayment: this.rentForm.value.advancePayment,
      balance: this.rentForm.value.balance,
      notes: this.rentForm.value.notes

    });
  }

  suiteSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suiteColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco'
  ]
  shirt: boolean;
  tie: boolean;
  vest: boolean;

 ngOnInit(): void {}

  addRent() {
    this.rent = {
      id: '',
      dni: this.rentForm.value.dni,
      name: this.rentForm.value.name,
      email: this.rentForm.value.email,
      phone: this.rentForm.value.phone,
      address: this.rentForm.value.address,
      reservationDate: this.rentForm.value.reservationDate,
      type: this.rentForm.value.type,
      size: this.rentForm.value.size,
      model: this.rentForm.value.model,
      color: this.rentForm.value.color,
      shirt: this.rentForm.value.shirt,
      tie: this.rentForm.value.tie,
      vest: this.rentForm.value.vest,
      tryDate: this.rentForm.value.tryDate,
      deliveryDate: this.rentForm.value.deliveryDate,
      returnDate: this.rentForm.value.returnDate,
      price: this.rentForm.value.price,
      advancePayment: this.rentForm.value.advancePayment,
      balance: this.rentForm.value.balance,
      notes: this.rentForm.value.notes
    }
    const dialogRef = this.dialog.open(SaveRentDialogComponent, {
      data: this.rent
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)// if true, save in DB, if false, if not, return
    })
  }

  saveRent() {
    if (this.addClicked) {
      this.rent = {
        id: '',
        dni: this.rentForm.value.dni,
        name: this.rentForm.value.name,
        email: this.rentForm.value.email,
        phone: this.rentForm.value.phone,
        address: this.rentForm.value.address,
        reservationDate: this.rentForm.value.reservationDate,
        type: this.rentForm.value.type,
        size: this.rentForm.value.size,
        model: this.rentForm.value.model,
        color: this.rentForm.value.color,
        shirt: this.rentForm.value.shirt,
        tie: this.rentForm.value.tie,
        vest: this.rentForm.value.vest,
        tryDate: this.rentForm.value.tryDate,
        deliveryDate: this.rentForm.value.deliveryDate,
        returnDate: this.rentForm.value.returnDate,
        price: this.rentForm.value.price,
        advancePayment: this.rentForm.value.advancePayment,
        balance: this.rentForm.value.balance,
        notes: this.rentForm.value.notes
      }
      this.rentService.addElement(this.rent);
      this.showAddMessage();
    } else {
      this.rentForm.reset()
    }
  }

  showAddMessage() {
    this.snackBar.open('Alquiler agregado para: '
      + this.rentForm.value.name
      , ''
      , {
        duration: 3000
      });
    this.rentForm.reset();
  }

  onAdd(): void {
    this.addClicked = true;
  }

  onClean(): void {
    this.addClicked = false;
  }

  getTodaysDate() {
    this.today = new Date();
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = this.today.getFullYear();
    this.today.getHours();
    const localHour = new DatePipe('en-Us').transform(this.today, 'HH:mm:ss', 'GMT-3');
    return `Fecha de carga: ${dd} del ${mm} de ${yyyy} horas ${localHour}`;
  }
}
