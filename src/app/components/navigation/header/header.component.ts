import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Menu} from "../../interfaces/menu";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>(); //will create and output to emit

  menu: Menu[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.menuService.getMenu().subscribe(items => {
      this.menu = items;
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit(); //emit the action
  }
}
