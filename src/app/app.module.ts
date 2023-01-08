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
import {SignupComponent} from './components/login/signup/signup.component';
import {AuthService} from "./components/login/auth/auth.service";
import {ReportComponent} from "./components/report/report.component";
import {RentService} from "./services/rent.service";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {RentDialogComponent} from './components/rent-dialog/rent-dialog.component';
import { InvoiceDialogComponent } from './components/invoice-dialog/invoice-dialog.component';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ReportComponent,
    RentDialogComponent,
    InvoiceDialogComponent
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
  providers: [AuthService, RentService, DatePipe], //same instance in whole app // providers: [DatePipe]
  bootstrap: [AppComponent],
})
export class AppModule {
}
