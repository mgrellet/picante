import {Injectable} from '@angular/core';
import {Rent} from "../interfaces/rent";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;


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


          const data = a.payload.doc.data() as any;
          //convert timestamp from firestore to date
          Object.keys(data).filter(key => data[key] instanceof Timestamp)
            .forEach(key => {
              data[key] = data[key].toDate()
            })
          data.id = a.payload.doc.id;
          //console.log("payload data: ", a.payload.doc.data())
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

  getWeeklyRent() {
    return this.rentList;
  }

  addRent(rent: Rent) {

    this.angularFirestore
      .collection('rent')
      .add(rent)
      .then(response => {
        console.log(response)
      });
  }

  updateRent(rent: Rent) {
    let rentToUpdate = {...rent}
    delete rentToUpdate.id
    console.log("rent to update", rentToUpdate)
    return this.angularFirestore
      .collection('rent')
      .doc(rent.id)
      .update({rentToUpdate})
  }

}
