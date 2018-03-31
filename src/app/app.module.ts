import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { appRoutes } from './routerConfig';

import { ValidationService } from './services/validation-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),    
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
