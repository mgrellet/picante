import {Injectable} from '@angular/core';
import {WeeklyRent} from "../components/interfaces/weeklyRent";

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor() {
  }

  weeklyRentList: WeeklyRent[] = [
    {
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

  getWeeklyRent() {
    return this.weeklyRentList.slice();
  }

  deleteElement(index: number) {
    this.weeklyRentList.splice(index, 1);
  }

  addElement(rent: WeeklyRent){
    this.weeklyRentList.unshift(rent);
  }
}
