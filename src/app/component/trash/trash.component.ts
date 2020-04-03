import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  notes:any=[];
 
  constructor(private snackbar:MatSnackBar,private noteService: Noteservice,private dataservice: DataService,
    private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,
    public dialog: MatDialog) { }

  message:string;
  token: string;
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message=>{;this.message=message,this. getallNotes()   
      }
    )
  }
  getallNotes() {
    this.token = localStorage.getItem("token");
    console.log(this.token)
    this.noteService.getRequest("/trash/"+localStorage.getItem("token")).subscribe(
      (Response:any)=>{
       
        this.notes=Response;
        console.log(this.notes)
      }
    )
  }

}