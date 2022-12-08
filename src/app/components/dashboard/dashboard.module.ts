import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {NavbarComponent} from './navbar/navbar.component';
import {MainComponent} from './main/main.component';
import {ReportComponent} from './report/report.component';
import {SaveRentDialogComponent} from "./main/save-rent-dialog";


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    MainComponent,
    ReportComponent,
    SaveRentDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
}
