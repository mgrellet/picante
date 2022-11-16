import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RentService} from "../../../services/rent.service";
import {Rent} from "../../interfaces/rent";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  rentForm: FormGroup
  rent: Rent;
  addClicked: boolean

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private snackBar: MatSnackBar,
              private router: Router) {
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

  public onAdd(): void {
    this.addClicked = true;
  }

  public onClean(): void {
    this.addClicked = false;
  }

}
