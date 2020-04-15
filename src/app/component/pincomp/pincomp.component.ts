import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { DataService } from 'src/app/Service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewService } from 'src/app/Service/view.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pincomp',
  templateUrl: './pincomp.component.html',
  styleUrls: ['./pincomp.component.css']
})
export class PincompComponent implements OnInit {
  /**
 * @Input is used to receive data in whereas @Output is used to send data out. 
 * A tool to exchange data from one component to another.
 */
  notes: [];
  wrap: string = "wrap";
  direction: string = "row";
  view: any;
  message: string;
  @Input() noteIfo: any;
  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param data 
   * @param route 
   * @param router 
   * @param viewservice 
   * @param formBuilder 
   * @param dialog 
   */
  constructor(private snackbar: MatSnackBar,
    private noteService: Noteservice,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private viewservice: ViewService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {

  }
  /**
   * getting all notes and refreshinh the view of all notes 
   */
  ngOnInit(): void {
    this.data.currentMessage.subscribe(
      message => { this.message = message, this.getalllNotes() })
    this.viewservice.getView().subscribe(
      (res) => {
      this.view = res;
        this.direction = this.view.data;
      }
    );
  }
  /**
   * getting all notes based upon userid
   * passing url to noteService
   */
  getalllNotes() {
    this.noteService.getRequest("users/" + localStorage.getItem("token")).subscribe(
      (response: any) => {
        // response.forEach(shaik => {
        //   console.log("------------------shaik="+shaik);
        //   this.notes=shaik;

        // });
        console.log("Checking response after getting all notes")
        console.log(response)
        console.log("Assing response to notes array ")
        this.notes = response;
        console.log("" + "Getting notes by userid" + "")
        console.log(this.notes)
      }


    )
  }

  unpin(note:any){
    console.log("pin")
   
    this.noteService.deletepinRequest("isunPin?noteId="+note.noteId,"").subscribe(
      (Response:any)=>{
        if(Response.statusCode===200){
          this.data.changeMessage("unpin")
          console.log(Response)
          this.snackbar.open(
            "Note unPin","undo",
            {duration:2500}
          )
        }
        else{
          this.snackbar.open(
            "Note Pin Unsuccessfull","undo",
            {duration:2500}
          )
        }
      }
    )
 }
  
}
  

