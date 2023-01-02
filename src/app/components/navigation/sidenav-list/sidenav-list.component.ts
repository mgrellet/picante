import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from "../../../interfaces/menu";
import {AuthService} from "../../login/auth/auth.service";
import {Subscription} from "rxjs";
import {RentDialogComponent} from "../../rent-dialog/rent-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  menu: Menu[] = [];
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();//close the subcription
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;//true or false
    });
  }

  onLogout() {
    this.authService.logout()
  }

  openDialog() {
    const dialogRef = this.dialog.open(RentDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
