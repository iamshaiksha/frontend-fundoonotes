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
import { DataService } from 'src/app/Service/data.service';
import { ImageDialogComponentComponent } from '../image-dialog-component/image-dialog-component.component';
import { ImageService } from 'src/app/Service/image.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { BehaviorSubject } from 'rxjs';
import { Noteservice } from 'src/app/Service/note.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  login: Login;
  appName: string;
  token: String;
  private datauser: User;
  email: string;
  name: string;
  userName: any;

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
    private data: DataService,
    private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public viewservice: ViewService,
    private noteservice: Noteservice,
    private imageService: ImageService,
    private userService: UserService) {
    this.userService.getUser(this.name).subscribe((result) => {
      this.datauser = result;

      //  this.email = this.datauser.email;
      console.log("profile getting single user");
      localStorage.getItem('url')
      console.log(this.datauser);
      console.log(this.datauser.name);
      this.datauser.name
      this.userName = localStorage.getItem("userName");
    });
    {

    }
  }

  /**
   * getting token from local storage while loading the component
   */
  image: String
  ngOnInit() {
    
    this.token = localStorage.getItem("token");
    this.name = localStorage.getItem("name");
    this.image = localStorage.getItem('uurl')
    console.log(this.image)
    // this.getUseInfo();
  }
  myInput = new FormControl();
  private obtainNotes = new BehaviorSubject([]);
  currentMessage = this.obtainNotes.asObservable();

  // getUseInfo()
  // {
  //   this.userService.getUserInformation("ui"+localStorage.getItem("token"));
  // }
  refresh() {
    this.data.changeMessage("refresh")
  }
  /**
   * when ever click on edit label dailogbox will open and navigae to labelscomponent
   */
  openDialogLabel(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
    });
  }
  openImageDialog(): void {
    const dialogRef = this.dialog.open(ImageDialogComponentComponent, {
      width: '800px',
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("result-->"+result)
    //   this.imageService.upload(result).subscribe(
    //     data => console.log(data)
    //   )
    // });
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  register() {
    localStorage.clear();
    this.router.navigateByUrl("/register");
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
  /**
   * changeView Can be display notes by rows or columns
   */
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
  searching() {
console.log(this.myInput.value);
this.noteservice.getSearchRequest("search?title="+this.myInput.value).subscribe
((response:any)=>{
  this.obtainNotes.next(response)
  console.log(response)
  this.router.navigate(['dashboard/searchnotes'])
})
  }
}

// console.log(this.myInput.value)
//       this.appName = "Search";
//       this.noteservice.getRequest("searchTitle?title="+this.myInput.value).subscribe(
//         (response:any)=>{this.obtainNotes.next(response)
//           console.log(response)
        // this.router.navigate(['dashboard/search'])
  