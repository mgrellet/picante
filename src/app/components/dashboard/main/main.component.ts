import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RentService} from "../../../services/rent.service";
import {Rent} from "../../interfaces/rent";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SaveRentDialogComponent} from "./save-rent-dialog";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  rentForm: FormGroup
  rent: Rent;
  addClicked: boolean;
  today: Date;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  suiteSizes: number[] = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62
  ]

  suiteColors: string[] = [
    'Gris', 'Gris topo', 'Negro', 'Azul francia', 'Azul oscuro', 'Blanco'
  ]
  shirt: boolean;
  tie: boolean;
  vest: boolean;

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
    this.rentForm = formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      reservationDate: ['', Validators.required],
      type: ['', Validators.required],
      size: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      shirt: ['', Validators.required],
      tie: ['', Validators.required],
      vest: ['', Validators.required],
      tryDate: ['', Validators.required],
      giveDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      price: ['', Validators.required],
      advancePayment: ['', Validators.required],
      balance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addRent() {
    this.dialog.open(SaveRentDialogComponent);
  }

  saveRent() {
    if (this.addClicked) {
      this.rent = {
        id: '',
        name: this.rentForm.value.name,
        color: this.rentForm.value.color,
        size: this.rentForm.value.size,
        type: this.rentForm.value.type,
        balance: this.rentForm.value.balance,
        reservationDate: this.rentForm.value.reservationDate,
        notes: '',
        recipeNumber: 0,

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
