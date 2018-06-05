import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ThreadsComponent } from './components/threads/threads.component';
import { CompanyContactComponent } from './components/company-contact/company-contact.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { CompanyService } from '../services/company.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './session/auth.interceptor';
import {ContactService} from '../services/contact.service';
import {ThreadService} from '../services/thread.service';
import {ActionService} from '../services/action.service';
import {TypeService} from '../services/type.service';
import {FormsModule} from '@angular/forms';
import { ModalActionListComponent } from './components/modal-action-list/modal-action-list.component';
import { ModalCompaniesComponent } from './components/modal-companies/modal-companies.component';
import { ModalCompanyContactsComponent } from './components/modal-company-contacts/modal-company-contacts.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponent,
    ContactsComponent,
    ThreadsComponent,
    CompanyContactComponent,
    ActionListComponent,
    ModalActionListComponent,
    ModalCompaniesComponent,
    ModalCompanyContactsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders,
    CompanyService,
    ContactService,
    ThreadService,
    ActionService,
    TypeService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
