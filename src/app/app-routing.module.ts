import {NgModule} from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/login/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReportComponent} from "./components/report/report.component";
import {AuthGuard} from "./components/login/auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'reports', component: ReportComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // Are fine to be provide to routing section
})
export class AppRoutingModule {
}
