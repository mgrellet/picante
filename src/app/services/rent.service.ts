import {Injectable} from '@angular/core';
import {Rent} from "../interfaces/rent";
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RentService {

  rentList: Rent[]; // naming convention, suffix your observable with $
  list: Observable<Rent[]>;
  rentCollection: AngularFirestoreCollection<Rent>;

  constructor(private angularFirestore: AngularFirestore) {
  }

  getRent(id: string) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .valueChanges();
  }

  fetchRentList(): Observable<Rent[]> {
    this.rentCollection = this.angularFirestore.collection<Rent>('rent');
    return this.rentCollection
      .snapshotChanges()
      .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Rent;
        data.id = a.payload.doc.id;
        return {...data};
      });
    }));


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
    this.angularFirestore
      .collection('rent')
      .add(rent)
      .then(response => {
        console.log(response)
      });
  }

}
