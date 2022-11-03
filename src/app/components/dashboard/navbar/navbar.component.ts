import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../../services/menu.service";
import {Menu} from "../../interfaces/menu";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(){
    this.menuService.getMenu().subscribe(items=>{
      console.log(items);
      this.menu = items;
    })
  }
}
