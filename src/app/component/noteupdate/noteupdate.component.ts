import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateNotes } from 'src/app/model/updatenote';

@Component({
  selector: 'app-noteupdate',
  templateUrl: './noteupdate.component.html',
  styleUrls: ['./noteupdate.component.css']
})
export class NoteupdateComponent implements OnInit {

note:[];
updateNoteDto:UpdateNotes=new UpdateNotes;
title=new FormControl(this.data.title);
description=new FormControl(this.data.description);
message:string;
  constructor( private snackbar:MatSnackBar,private noteService:Noteservice,
    private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.note=data;
    }

  ngOnInit(): void 
  {
    this.updateNoteDto.title=this.data.title
    this.updateNoteDto.description=this.data.description
    this.updateNoteDto.noteId=this.data.noteId
    console.log( this.updateNoteDto.title)
    console.log(this.updateNoteDto.description)
    console.log(this.updateNoteDto.noteId)
  }
  onClose(){
    console.log(this.data);
    console.log("######update entered");
    console.log(this.updateNoteDto);
    // this.noteService.putRequest("update",this.updatenoted).subscribe(
      
      this.noteService.putupdateRequest( "update/"+localStorage.getItem("token"),this.updateNoteDto).subscribe(

      (Response:any)=>{
        
        if(Response!=null){
          // this.dataService.changeMessage("notecom")
          console.log(Response);
          this.snackbar.open(
            "Note Updation Successfull","undo",
            {duration:2500}
          )
        }

        else{
          console.log(Response);
          this.snackbar.open(
            "note Updation unSuccessfull","undo",
            {duration:2500}
          )
        }
      }
    )
  }

}

