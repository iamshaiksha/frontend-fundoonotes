import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelService } from 'src/app/Service/label.service';


@Component({
  selector: 'app-get-label',
  templateUrl: './get-label.component.html',
  styleUrls: ['./get-label.component.css']
})
export class GetLabelComponent implements OnInit {

  label = [];
  message: string;
  /**
   * 
   * @param snackbar 
   * @param labelservice 
   * @param route 
   * @param router 
   * @param formBuilder 
   * @param dataservice 
   */
  constructor(
    private snackbar: MatSnackBar,
    private labelservice: LabelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataservice: DataService) {

  }
  /**
   * getting all labels and autorefreshing
   */
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(
      message => {
        ; this.message = message, this.getalllabels()
      }
    )
  }
  /**
   * getting all labels based upon userid 
   */
  getalllabels() {
    console.log("###################")
    console.log("before send to labelservice")
    this.labelservice.getRequest("/getLabelsByUserId/" + localStorage.getItem("token")).subscribe(
      (Response: any) => 
      {
        this.label = Response;
        console.log("checking response after fetching labels")
        console.log(this.label)
      }

    )
  }
  /**
   * 
   * @param label
   * deleting label basedupon labelid 
   */
  delete(label) {
    this.labelservice.deleteRequest("delete?labelId=" + label.labelId).subscribe(
      (Response: any) => {
        if (Response!=null) {
          this.dataservice.changeMessage("Delete labels")
          console.log(Response)
          this.snackbar.open(
            "Label Deleted", "undo",
            { duration: 5500 }
          )
        }
        else {
          this.snackbar.open(
            "Label Delete Unsuccessfull", "undo",
            { duration: 2500 }
          )
        }
      }
    )
  }
}
