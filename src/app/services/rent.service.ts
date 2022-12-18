import {Injectable} from '@angular/core';
import {Rent} from "../components/interfaces/rent";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, tap} from "rxjs";
import {map} from "rxjs-compat/operator/map";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  rentList: Rent[]; // naming convention, suffix your observable with $

  constructor(private angularFirestore: AngularFirestore) {
  }

  weeklyRentList: Rent[] = [
    {
      id: '',
      dni: 12345678,
      name: 'Claudio Argarañaz',
      email: 'c@test.com',
      phone: 316497316497,
      address: 'Av. los andes 123',
      reservationDate: new Date(),
      type: 'Saco',
      size: 56,
      model: 'regular',
      color: 'Negro',
      shirt: false,
      tie: false,
      vest: false,
      tryDate: new Date(),
      deliveryDate: new Date(),
      returnDate: new Date(),
      price: 2500,
      advancePayment: 2500,
      balance: 0,
      notes: 'Se pago todo'
    },
    {
      id: '',
      dni: 12345678,
      name: 'El man',
      email: 'em@test.com',
      phone: 316497316497,
      address: 'Av. los olivos 123',
      reservationDate: new Date(),
      type: 'Traje',
      size: 52,
      model: 'Fit',
      color: 'Azul',
      shirt: false,
      tie: true,
      vest: false,
      tryDate: new Date(),
      deliveryDate: new Date(),
      returnDate: new Date(),
      price: 5000,
      advancePayment: 2000,
      balance: 3000,
      notes: 'Debe plata'
    },
  ];

  getRentListMock(){
    return this.weeklyRentList.slice();
  }

  getRent(id: string) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .valueChanges();
  }

  getRentList() {
    this.angularFirestore
      .collection<Rent>('rent')
      .valueChanges()
      .pipe(
        tap(res => {
          this.rentList = res;
        })
      ).subscribe();

  }

  createRentRegistry(rent: Rent) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('rent')
        .add(rent)
        .then(response => {
          console.log(response);
        }, error => reject(error))
      ;
    })
  }

  deleteRentRegistry(rent: Rent) {
    this.angularFirestore
      .collection('rent')
      .doc(rent.id)
      .delete().then(r => console.log(r));
  }

  updateRentRegistry(rent: Rent, id: string) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .update({
        id: id,
        name: rent.name,
        color: rent.color,
        size: rent.size,
        type: rent.type,
        balance: rent.balance,
        reservationDate: rent.reservationDate,
        notes: '',
        recipeNumber: 0,
      })
  }

  getWeeklyRent() {
    return this.rentList;
  }

  deleteElement(index: number) {
    this.weeklyRentList.splice(index, 1);
  }

  addElement(rent: Rent) {
    this.weeklyRentList.unshift(rent);
  }
}
