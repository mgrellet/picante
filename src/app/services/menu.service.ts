import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../components/interfaces/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu() : Observable<Menu[]>{
    return this.http.get<Menu[]>('./assets/data/menu.json');
  }
}
