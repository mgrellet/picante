import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {MainComponent} from "./main/main.component";
import {ReportComponent} from "./report/report.component";
import {DemoComponent} from "../demo/demo.component";


const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
      {path: '', component: MainComponent},
      {path: 'reportes', component: ReportComponent},
      {path: 'demo', component: DemoComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
