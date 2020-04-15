import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Noteservice } from 'src/app/Service/note.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  /**
   *Note object consists of title and description
   */
  note: Note = new Note();
  notes: any[];
  title = new FormControl(this.note.title);
  description = new FormControl(this.note.description)
  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dailogopen 
   */
  constructor(
    private snackbar: MatSnackBar,
    private noteService: Noteservice,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dailogopen: MatDialog,
    public data:DataService
    ) {

  }
  ngOnInit(): void 
  {

  }
  open: boolean;
  onOpen() {
    this.open = true;
  }
  onSubmit() {
    this.open = false;
    console.log("Entered into note class ##")
    this.noteService.postRequest("create?" + localStorage.getItem("token"), this.note).subscribe(
        (Response: any) => {
          if (Response !== null) {
            this.data.changeMessage("notecreated")
            console.log("## Response gettingfrom note class class ##")
            this.snackbar.open("Note Created Successfully", "undo",{ duration: 3200 }
            )
          }
          else {
            this.snackbar.open("note Creation unSuccessfull", "undo",
              { duration: 3200 }
            )
          }
        }
      )
  }
}
