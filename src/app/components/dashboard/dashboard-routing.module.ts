import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {MainComponent} from "./main/main.component";
import {ReportComponent} from "./report/report.component";


const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
      {path: '', component: MainComponent},
      {path: 'reports', component: ReportComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
