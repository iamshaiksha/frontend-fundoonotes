import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/Login/Login.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SetPasswordComponent } from './component/set-password/set-password.component';
import { NoteComponent } from './component/note/note.component';
// import { EditlabelComponent } from './component/editlabel/editlabel.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchieveComponent } from './component/archieve/archieve.component';
import { SearchnotesComponent } from './component/searchnotes/searchnotes.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';


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
  },
  {
    path:'resetPassword',
    component:SetPasswordComponent
  },
  {
    path:"notes",
    component:NoteComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,children:
    [ {
      path:'notes',
      component:NoteComponent
    },
    {
      path:"trash",
      component:TrashComponent
    },
    {
      path:"archive",
      component:ArchieveComponent
    },
    {
      path:"searchnotes",
      component:SearchnotesComponent
    },
    {
      path:"collab",
      component:CollaboratorComponent
    }

    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
