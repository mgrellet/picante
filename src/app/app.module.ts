import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {LayoutModule} from '@angular/cdk/layout';
import {SharedModule} from "./components/shared/shared.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { SignupComponent } from './components/login/signup/signup.component';
import {AuthService} from "./components/login/auth/auth.service";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReportComponent} from "./components/report/report.component";
import {SaveRentDialogComponent} from "./components/dashboard/save-rent-dialog.component";
import {RentService} from "./services/rent.service";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ReportComponent,
    SaveRentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, RentService], //same instance in whole app
  bootstrap: [AppComponent],
  entryComponents:[SaveRentDialogComponent]
})
export class AppModule {
}
