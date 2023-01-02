import {NgModule} from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/login/signup/signup.component";
import {ReportComponent} from "./components/report/report.component";
import {AuthGuard} from "./components/login/auth/auth.guard";
import {InvoiceComponent} from "./components/invoice/invoice.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'report', component: ReportComponent, canActivate:[AuthGuard]},
  {path: 'invoice', component: InvoiceComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // Are fine to be provide to routing section
})
export class AppRoutingModule {
}
