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
          return {...data};
        });
      }));
  }

  addRent(rent: Rent) {
    this.angularFirestore
      .collection('rent')
      .add(rent)
      .then(response => {
        console.log(response)
      });
  }

  updateRent(rent: Rent, id: string | undefined) {
    return this.angularFirestore
      .collection('rent')
      .doc(id)
      .set({...rent})
  }

  deleteRent(id: string){
    this.angularFirestore
      .collection('rent')
      .doc(id)
      .delete().then(r => console.log(r));
  }

}
