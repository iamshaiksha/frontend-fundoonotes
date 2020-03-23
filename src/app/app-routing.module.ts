import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/Login/Login.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
 
  { 
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
    
  },

  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'forgetPassword',
    component:ForgetpasswordComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
