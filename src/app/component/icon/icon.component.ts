import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Note } from 'src/app/model/note';
import { Noteservice } from 'src/app/Service/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Color } from 'src/app/model/setcolor';
import { DataService } from 'src/app/Service/data.service';
import { Trash } from 'src/app/model/trash';
import { HttpService } from 'src/app/Service/http.service';
import { LabelService } from 'src/app/Service/label.service';
import { LabelNote } from 'src/app/model/labelnote';
import { LabelsComponent } from '../labels/labels.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { Reminder } from 'src/app/model/reminder';
import { BrowserModule } from '@angular/platform-browser';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
// import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
// import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'LL LT',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush,
 
  providers:[

    // {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},

        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
  ]


})
export class IconComponent implements OnInit {
  /**
   * 
   * @Input is used to receive data in whereas @Output is used to send data out. 
   * A tool to exchange data from one component to another.
   * 
   */
  enable: boolean = true;
  label = [];
  note: Note = new Note();
  labelnote: LabelNote = new LabelNote;
  toggle: boolean = true;
  message: string;
  token: String;
  @Input() noteInfo: any;
  trash: Trash = new Trash();
  public dateTime = new moment();
  /**
   * 
   * @param snackbar 
   * @param noteService 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dialog 
   */
  constructor(
    private noteService: Noteservice,
    private labelservice: LabelService,
    private dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private httpservice: HttpService,
    private data:DataService
  ) {

  }
  /**
   * while loading icon component getting token
   * and getting allnotes
   * autorefreshing
   */
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.dataservice.currentMessage.subscribe(
      message => {
        ; this.message = message, this.getalllabels()
      }
    )
  }
  /**
   * fetching all labels based upon userid
   */
  getalllabels() {
    console.log("###########")
    this.labelservice.getRequest("/getLabelsByUserId/" + localStorage.getItem("token")).subscribe(
      (Response: any) => {
        this.label = Response;
        console.log(this.label)
      }

    )
  }
  colorlens() {
    console.log("########")
    console.log("Note Color")

  }
  /**
   * javascript hexcodes  with colors for adding to note 
   */
  arrayColor = [
    [
      { name: "green", hexcode: " #008000 " }, { name: "orange", hexcode: " #FFA500 " }, { name: "yellow", hexcode: "#ffff00" }
    ],
    [
      { name: "blanchedalmond", hexacode: "#ffebcd" }, { name: "lightgreen", hexcode: "#90ee90" }, { name: "lightsalmon", hexcode: "#ffa07" },
    ],
    [
      { name: "white", hexcode: " #ffffff " }, { name: "cyan", hexcode: " #00FFFF " }, { name: "red", hexcode: "#ff0000" }
    ]
  ]
  onCollaboraotr()
  {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '800px',
      data:{
        'noteId': this.noteInfo.noteId
      }
    });
  }



  /**
   * 
   * @param color
   * color object consist of name,noteId 
   */
  color: Color = new Color;
  /**
   * 
   * @param color 
   * adding color to note
   */
  setColor(color: Color) {
    console.log("checking color")
    console.log("Color=" + color)
    console.log("--------------")
    this.noteService.putRequest("Color?noteId=" + this.noteInfo.noteId, color).subscribe(
      (Response: any) => {
        if (Response != null) {
          this.dataservice.changeMessage('note-color')
          this.dataservice.changeMessage("note-name")
          console.log("####################");
          console.log(Response)
          this.snackbar.open(
            "Note Color changed", "undo",
            { duration: 7500 }
          )
        }
        else {
          this.snackbar.open(
            "Note Color Unsuccessfull", "",
            { duration: 2500 }
          )
        }
      }
    )

  }
  /**
   * 
   * @Input is used to receive data in whereas @Output is used to send data out. 
   * A tool to exchange data from one component to another.
   * Note archived functionality
   */

  archive() {
    console.log(this.noteInfo.noteId);
    this.trash.nid = this.noteInfo.noteId;
    this.httpservice.deleteRequest("isArchieve/" + localStorage.getItem("token"), this.trash).subscribe(
      (response: any) => {
        console.log("checking noteId");
        console.log(this.noteInfo.noteId)
        if (response != null) {
          console.log("####################");
          console.log(this.noteInfo)
          this.dataservice.changeMessage('note-archieved')
          console.log("checking response from archieve");
          console.log(Response);
          this.snackbar.open(
            " Note archived ", "undo",
            { duration: 4300 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "Note Archive unSuccessfull", "undo",
            { duration: 3500 }
          )
        }
      }
    )
  }
  /**
   * when ever click on delete the note automatically goes to trash 
   */
  onDelete() {
    console.log(this.noteInfo.noteId);
    this.token = localStorage.getItem("token");
    this.noteService.deleteRequest("delete?noteId=" + this.noteInfo.noteId, "").subscribe(
      (Response: any) => {

        if (Response != null) {
          console.log("checking response after deleting the note");
          this.dataservice.changeMessage('note-trashed')
          console.log(Response);
          this.snackbar.open(
            "Note Deleted", "undo",
            { duration: 3700 }
          )
        }

        else {
          console.log(Response);
          this.snackbar.open(
            "note unSuccessfull", "undo",
            { duration: 3700 }
          )
        }
      }
    )
  }
  // addlabel(labels: any) {
  //   console.log(labels)
  //   this.noteService.putRequest("AddLabelToNote?labelId="+labels.labelId+"&noteId="+this.noteInfo.noteId,this.noteInfo).subscribe(
  //     (Response: any) => {
  //       if (Response.statusCode === 200) {
  //         this.dataservice.changeMessage('wrewera')
  //         console.log(Response);
  //         this.snackbar.open(
  //           "Note Added ", "undo",
  //           { duration: 2500 }
  //         )
  //       }

  //       else {
  //         console.log(Response);
  //         this.snackbar.open(
  //           "Note Not", "undo",
  //           { duration: 2500 }
  //         )
  //       }
  //     }
  //   )
  // }

  /**
   * 
   * @param labels 
   * adding labels to notes based upon noteid and labelid to note
   * 
   */
  addlabel(labels: any) {
    console.log("labels!!!");
    console.log(labels);
    console.log("checking labeId");
    console.log(labels.lableId);
    console.log(" Injecting value into object note and labelid");
    this.labelnote.labelId = labels.labelId;
    this.labelnote.noteId = this.noteInfo.noteId;
    console.log("###############");
    this.noteInfo.labelList.forEach(ele => {
      if (ele.labelId == labels.labelId) {
        this.enable = false;
      }
    });
    // this.noteInfo.forEach(element => {element.labelId==this.labelnote.labelId});
    if (this.enable) {
      this.labelservice.postRequest("addLabel/" + localStorage.getItem("token"), this.labelnote).subscribe(
        (Response: any) => {
          if (Response != null) {
            this.dataservice.changeMessage("lableadded")
            console.log("##############")
            console.log("checking response adding chip label into note")
            console.log(Response);
            this.snackbar.open(
              "Lable Addded ", "undo",
              { duration: 2500 }
            )
          }
          else {
            console.log(Response);
            console.log(this.label)
            this.snackbar.open(
              "label Creation unSuccessfull", "undo",
              { duration: 2500 }
            )
          }
        }
      )
    }
    else {
      console.log("checking label is already present");
      console.log(this.label)
      this.enable = true;
      this.snackbar.open("Lable already exist", "undo",
        { duration: 2500 })
    }
  }
  // reminderOn(): void
  // {
  //   const dialogRef = this.dialog.open( ReminderComponent , {
  //     width: '250px',
  // });}
  // openDialogLabel(): void {
  //   const dialogRef = this.dialog.open(LabelsComponent, {
  //     width: '250px',
  //   });
  // }
  // }

  dateReminder: Reminder = new Reminder();
  dateControl = new FormControl(this.dateReminder.remainder);



  datePicker() {
    console.log(this.dateTime._d)
    this.dateReminder.remainder = this.dateTime._d;
    this.dateReminder.noteId = this.noteInfo.noteId;
    console.log("noteid--->"+this.noteInfo.noteId);
    console.log(this.dateReminder)
    this.noteService.postRequest("addremainder/"+ localStorage.getItem("token"), this.dateReminder).subscribe(
      (Response: any) => {
        if (Response!=null) {
          console.log(Response)
          this.data.changeMessage("addRemainder")
          this.snackbar.open(
            "Reminder Successfull", "",
            { duration: 2500 }
          )
        }
        else {
          console.log(Response)
          this.snackbar.open(
            "Reminder UnSuccessfull", "",
            { duration: 2500 }
          )
        }
      }
    )
  }



}
