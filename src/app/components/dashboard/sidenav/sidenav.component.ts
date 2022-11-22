import { Component, OnInit } from '@angular/core';
import {Menu} from "../../interfaces/menu";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(){
    this.menuService.getMenu().subscribe(items=>{
      this.menu = items;
    })
  }

}
