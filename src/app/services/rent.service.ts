import {Injectable} from '@angular/core';
import {Rent} from "../components/interfaces/rent";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  weeklyRentList: Rent[] = [
    {
      id:'',
      color: 'gris',
      size: 56,
      type: 'saco',
      name: 'Claudio Argañaraz',
      balance: 1000,
      recipeNumber: 1234,
      notes: 'debe 2000',
      reservationDate: '10/11/2022'
    },
    {
      id:'',
      color: 'azul',
      size: 54,
      type: 'ambo',
      name: 'Martín Grellet',
      balance: 0,
      recipeNumber: 4567,
      notes: '',
      reservationDate: '10/11/2022'
    },
  ];

  getRent(id: string) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .valueChanges();
  }

  getRentList() {
    return this.angularFirestore
      .collection('rent')
      .snapshotChanges();
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
    return this.weeklyRentList.slice();
  }

  deleteElement(index: number) {
    this.weeklyRentList.splice(index, 1);
  }

  addElement(rent: Rent) {
    this.weeklyRentList.unshift(rent);
  }
}
