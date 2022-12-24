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

  getRent(id: string) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .valueChanges();
  }

  fetchRentList(): Observable<Rent[]> {
    return this.angularFirestore
      .collection<Rent>('rent')
      .valueChanges();
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
      .doc('')
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

  addElement(rent: Rent) {
    this.angularFirestore.collection('rent').add(rent);
  }

}
