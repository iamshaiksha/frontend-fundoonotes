import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  notes: [];
  message: string;
  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param dataservice 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dialog 
   */
  constructor(private snackbar: MatSnackBar,
    private noteService: Noteservice,
    private dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }
 
  /**
   * getting notes by userid and autorefreshing
   */
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message => {
         this.message = message, this.getallNotes();
      }
    )
  }
  /**
   * getting all notes based upon userid and passing url to service class
   */
  getallNotes() {
    this.noteService.getRequest("users/" + localStorage.getItem("token")).subscribe(
      (Response: any) => {
        console.log("#########");
        this.notes = Response;
        console.log("checking response notes in archieve")
        console.log(this.notes)
      }
    )
  }
}