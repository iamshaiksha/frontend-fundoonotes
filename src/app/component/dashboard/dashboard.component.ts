import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from "src/app/service/user.service";

import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/model/login';
import { HttpService } from 'src/app/Service/http.service';

import { NoteComponent } from '../note/note.component';
import { NoteComComponent } from '../note-com/note-com.component';
import { MatDialog } from '@angular/material/dialog';
import { LabelsComponent } from '../labels/labels.component';
import { User } from 'src/app/model/User';
import { ViewService } from 'src/app/Service/view.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  login: Login;
  appName: string;
  token: String;
  user: User;
  /**
   * 
   * @param snackBar 
   * @param httpservice 
   * @param formBuilder 
   * @param route 
   * @param router 
   * @param dialog 
   */
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public viewservice:ViewService

  ) { }
  /**
   * getting token from local storage while loading the component
   */
  ngOnInit() {
    this.token = localStorage.getItem("token");
  }
  /**
   * when ever click on edit label dailogbox will open and navigae to labelscomponent
   */
  openDialogLabel(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
    });
  }
  /**
   * when ever click on @Notes button it will navigate to notes component 
   */
  onNotes() {
    this.appName = "Notes"
    this.router.navigate(['dashboard/notes'])
  }
  // openDialogLabel(notes:any):void {

  //   let dialogRef = this.dialog.open(NoteComponent)
  // }

  
  /**
   * when ever click on @Archive button it will navigate to Archive component 
   */
  onArchive() {
    this.appName = "Archive"
    this.router.navigate(['dashboard/archive'])
  }
  /**
   * when ever click on @Trash button it will navigate to Archive component 
   */
  onTrash() {
    this.appName = "Trash"
    this.router.navigate(['dashboard/trash'])
  }
  list: boolean = true;
  grid: boolean = false;
  changeView() {
    if (this.list) {
      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }
    this.viewservice.getView();
  }

  toggle() {
    console.log(this.login);
    this.httpservice
      .postRequest("login", this.login)
      .subscribe((response: any) => {
        if (response.data != null) {
          console.log(response);
          localStorage.setItem("token", response.data);
          localStorage.setItem("email", response.emailId);
          this.snackBar.open(
            "Login Successfull",
            "undo",
            { duration: 25000 }
          );
          this.router.navigate(["/dashboard/notes" + this.token]);
        } else {
          console.log(response);
          //  console.log("Login:" + this.login.email);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      });
  }

}