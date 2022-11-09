import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {

  rentForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.rentForm);
  }
}
