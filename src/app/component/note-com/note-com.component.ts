import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoteupdateComponent } from '../noteupdate/noteupdate.component';
import { DataService } from 'src/app/Service/data.service';
import { ViewService } from 'src/app/Service/view.service';


@Component({
  selector: 'app-note-com',
  templateUrl: './note-com.component.html',
  styleUrls: ['./note-com.component.css']
})
export class NoteComComponent implements OnInit {
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
    public dialog: MatDialog) {

      
  }
  /**
   * getting token and refreshing every time while loading the notecomcomponent 
   * and proper displaying notes
   */
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
    
    this.data.currentMessage.subscribe(message => { this.message = message, this.getallNotes() });
    this.viewservice.getView().subscribe(
      (res) => {
      this.view = res;
        this.direction = this.view.data;
        console.log(this.direction);
      });
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
 this.noteService.deletepinRequest("isPin?noteId="+note.noteId,"").subscribe(
   (Response:any)=>{
     if(Response!=null){
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