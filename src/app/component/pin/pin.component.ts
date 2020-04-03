import { Component, OnInit, Input } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noteservice } from 'src/app/Service/note.service';
import { Note } from 'src/app/model/note';


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  @Input()noteInfo:any;
  note:Note=new Note();
  toggle:boolean=true;
  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dataService 
   */
    constructor(private snackbar:MatSnackBar,private noteService:Noteservice,
      private route:ActivatedRoute,private router:Router,
      private formBuilder:FormBuilder,private dataService:DataService) {}
  
    ngOnInit() {
      console.log(this.noteInfo)
    }
  
    pin(){
            console.log("pin")
      this.toggle=true;
      this.noteService.deletepinRequest("isPin?noteId="+this.noteInfo.noteId,"").subscribe(
        (Response:any)=>{
          if(Response.statusCode===200){
            this.dataService.changeMessage('pin')
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

    unpin(){
      console.log("pin")
      this.toggle=true;
      this.noteService.deletepinRequest("isPin?noteId="+this.noteInfo.noteId,"").subscribe(
        (Response:any)=>{
          if(Response.statusCode===200){
            
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