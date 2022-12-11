import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../interfaces/menu";
import {MenuService} from "../../../services/menu.service";
import {AuthService} from "../../login/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  menu: Menu[] = [];
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private menuService: MenuService, private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();//close the subcription
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      console.log("authstatus:", authStatus)
      this.isAuth = authStatus;//true or false
    });
  }

  loadMenu() {
    this.menuService.getMenu().subscribe(items => {
      this.menu = items;
    })
  }
}
