import { Component, OnInit, Input } from '@angular/core';
import { LabelService } from 'src/app/Service/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Service/data.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Noteservice } from 'src/app/Service/note.service';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.css']
})
export class AddlabelComponent implements OnInit {
/**
 * @Input is used to receive data in whereas @Output is used to send data out. 
 * A tool to exchange data from one component to another.
 */
  @Input() labelInfo: any;
  label = [];
  message: string
  /**
   * 
   * @param snackbar 
   * @param labelservice 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dataservice 
   * @param noteService 
   */
  constructor(private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataservice: DataService,
    private noteService: Noteservice) {
  }
  /**
   * getting all labels and autorefreshing to addlabel component
   */
  ngOnInit(): void {
    this.dataservice.currentMessage.subscribe(
      message => {
        console.log("#########")
        console.log(this.labelInfo);
        this.message = message, this.getalllabels()
        // this.message=message,this.getNotes()
      }
    )
  }
  // getNotes()
  // {
  //   this.noteService.getRequest("users/" + localStorage.getItem("token")).subscribe(
  //     (response: any) => {
  //       // response.forEach(shaik => {
  //       //   console.log("------------------shaik="+shaik);
  //       //   this.notes=shaik;

  //       // });
  //       console.log("notes in remainder checking " + response)
  //       // this.notes = response;
  //       console.log("remainder--->")
  //       console.log(response)
  //       response.forEach(element => {
  //         console.log(element);
  //         console.log(element.reminder);
  //         this.reminder=element.reminder;
  //       });
  //       // console.log(response.Object.reminder);
  //       console.log("" +"Getting notes by userid"+ "")
  //       // console.log(this.notes)
  //     }
  //   )
  // }


  getalllabels() {
    console.log("get all labels--->labelnote/noteId"+this.labelInfo.noteId)
    this.noteService.getRequest("labelnote/" + this.labelInfo.noteId).subscribe(
      (Response: any) => {
        console.log("****************")
        console.log(Response.obj.reminder);
        this.reminder=Response.obj.reminder;
        console.log("Remainder checking--->"+Response.obj.reminder);
       
        // this.reminder=Response.Object.reminder;
        console.log(Response.obj.labelList)
        this.label = Response.obj.labelList;
        // this.label=Response;
        // console.log(this.label)
      }
    )
  }

  onDelete(label1: any) {

    this.noteService.deleteLabelRequest("RemoveLabelToNote?noteId=" + this.labelInfo.noteId + "&labelId=" + label1.labelId, "").subscribe(

      (Response: any) => {
        if (Response != null) {
          this.dataservice.changeMessage("label Delete")
          console.log(Response);
          this.snackbar.open(
            "Label Removed", "",
            { duration: 5500 }
          )
        }
        else {
          console.log(Response);
          this.snackbar.open(
            "Label Removed unSuccessfull", "",
            { duration: 5500 }
          )
        }
      }
    )
  }
  noteId:any
  reminder: String;
  onDeleteRem() {
    
    this.noteId= this.labelInfo.noteTd;
  
    console.log(this.labelInfo.noteId)
    this.noteService.deleteRemRequest("removeRemainder?noteId=" + this.labelInfo.noteId,"")
    // this.noteService.deleteRemRequest("removeRemainder/"+localStorage.getItem("token"),this.noteId) 
    .subscribe(
        (Response: any) => {
    
          if (Response!= null) {
            this.dataservice.changeMessage("remainder delted")
            
            console.log(Response);
            this.snackbar.open("reminder delted succesfuly", "undo", { duration: 2500 })
          }
         
        })
      
  }



}
