import { Component, OnInit, Inject, Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { Login } from 'src/app/model/login';
import { UserInfo } from 'src/app/model/userInfo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from 'src/app/Service/collaborator.service';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { UserService } from 'src/app/Service/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

public userone:UserInfo=new UserInfo();
public  userInfos:UserInfo[];
// public email:string;
@Input() noteInfo:any;

private userInfoList= new Array<UserInfo>();
 owner: string;
// private collab=new AllNotes();

  constructor( public dialogRef: MatDialogRef<CollaboratorComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA)private  data:any,
    private userservice:UserService,
    private collabService:CollaboratorService
    )
     { 
      this.getAllUsers();
      this.getOwnerDetails();
     }

  ngOnInit(): void {

    
  }
  email=this.userone.email;
  getAllUsers()
  {
    this.userservice.getAllUsers("allUsers").subscribe(
      (response:any)=> {
       this. userInfos=response;
       console.log(response);
       console.log("list of users")
       console.log(this.userInfos)
    })
    
  }

  getOwnerDetails()
  {
    this.owner=localStorage.getItem("userName");
    console.log("getowneremail"+this.owner);
  }
  addCollab()
  {
      console.log("noteId checking")
      console.log("noteId---->"+this.data.noteId);
      console.log(this.email)
      this.collabService.addCollaborator("addcollaborator?noteId="
        + this.data.noteId + "&email=" + this.email, "").subscribe(
        (response:any)=> {
        if(response!=null){
          console.log("collb---->")
          console.log(response)
        this.snackBar.open("collaborator added succesfully","",{duration:3000});
      }
      else{
        this.snackBar.open("Enter valid email","",{duration:3000})

      }
    }
      ) 
  }
  removeCollab(emailId:string)
  {
    this.userInfoList.push(this.userInfos.filter(userInfo=> userInfo.email==emailId).pop());
    this.userInfos=this.userInfos.filter(userInfo=> userInfo.email!==emailId);
    console.log("removing in list")
    console.log(this.userInfos)
  }
}
