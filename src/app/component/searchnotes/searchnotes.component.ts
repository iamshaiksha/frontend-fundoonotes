import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewService } from 'src/app/Service/view.service';
import { DataService } from 'src/app/Service/data.service';
import { FormBuilder } from '@angular/forms';
import { Noteservice } from 'src/app/Service/note.service';

@Component({
  selector: 'app-searchnotes',
  templateUrl: './searchnotes.component.html',
  styleUrls: ['./searchnotes.component.css']
})
export class SearchnotesComponent implements OnInit {
  [x: string]: any;

  notes: [];
  data1: any[];
  token: string;
  wrap: string = "wrap";
  direction: string = "row";
  view: any;
  message: string;

  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param route 
   * @param router 
   * @param viewservice 
   * @param data 
   * @param formBuilder 
   * @param dialog 
   */
  constructor(private snackbar: MatSnackBar, private noteService: Noteservice,
    private route: ActivatedRoute,
    private router: Router,
    private viewservice: ViewService,
    private data: DataService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dashboard:DashboardComponent
    ) {

      
  }
  /**
   * getting token and refreshing every time while loading the notecomcomponent 
   * and proper displaying notes
   */
  searchnotes:any;
  ngOnInit(): void {
    // this.dashboard.currentMessage.subscribe(
    //   response=>{this.data=response,
    //   console.log(this.data);
    this.dashboard.currentMessage.subscribe((result):any=>{
      this.searchnotes=result
      console.log("checking search notes"+this.searchnotes);

    })
  }
  /**
   * for getting all notes passing url and token to service class
   */
  
  getallNotes() {
    this.noteService.getRequest("users/" + localStorage.getItem("token")).subscribe(
      (response: any) => {
        // response.forEach(shaik => {
        //   console.log("------------------shaik="+shaik);
        //   this.notes=shaik;

        // });
        console.log("shaiksha#####" + response)
        this.notes = response;
        console.log("" +"Getting notes by userid"+ "")
        console.log(this.notes)
      }
    )
  }
  /**
   * 
   * @param note 
   * updating notes and while tap on note it will open dailogbox as mentioned propeties in dailogref
   */
  onUpdate(note: any): void {
    console.log("note", note);
    console.log(note)
    const dialogRef = this.dialog.open(NoteupdateComponent, {
      height: '220px',
      width: '300px',
      data: {
        'title': note.title,
        'description': note.description,
        'noteId': note.noteId
      }
    }
    );
  }
  pin(note:any){
    console.log("pin")
//  this.toggle=true;
 this.noteService.deletepinRequest("isPin?noteId="+note.noteId,"").subscribe(
   (Response:any)=>{
     if(Response.statusCode===200){
       this.data.changeMessage("pinned")
       console.log(Response)
       this.snackbar.open(
         "Note Pin","undo",
         {duration:2500}
       )
       
     }
     else{
       this.snackbar.open(
         "Note Pin Unsuccessfull","undo",
         // {duration:2500}
       )
     }
   }
 )
}


}
