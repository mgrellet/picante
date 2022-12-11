import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Menu} from "../../interfaces/menu";
import {MenuService} from "../../../services/menu.service";
import {AuthService} from "../../login/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>(); //will create and output to emit
isAUth: boolean;
authSubscription: Subscription;
  menu: Menu[] = [];

  constructor(private menuService: MenuService, private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();//close the subcription
  }

  ngOnInit(): void {
    this.authSubscription= this.authService.authChange.subscribe(authStatus =>{
      this.isAUth = authStatus;//true or false
    });
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
