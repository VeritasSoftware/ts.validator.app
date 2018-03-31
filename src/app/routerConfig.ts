import { Routes } from '@angular/router';

import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { DetailsComponent } from './components/details/details.component';


export const appRoutes: Routes = [
    { 
      path: 'home', 
      component: HomeComponent 
    },
    { 
      path: 'login', 
      component: LoginComponent 
    },
    { 
      path: 'details', 
      component: DetailsComponent
    }
  ];
