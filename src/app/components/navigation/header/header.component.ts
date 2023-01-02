import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Menu} from "../../../interfaces/menu";
import {AuthService} from "../../login/auth/auth.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {RentDialogComponent} from "../../rent-dialog/rent-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>(); //will create and output to emit
  isAuth: boolean;
  authSubscription: Subscription;
  menu: Menu[] = [];

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

  onToggleSidenav() {
    this.sidenavToggle.emit(); //emit the action
  }

  onLogout() {
    this.authService.logout();
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
