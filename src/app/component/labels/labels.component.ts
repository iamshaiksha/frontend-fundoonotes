import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FormControl, FormBuilder } from '@angular/forms';
import { Label } from 'src/app/model/label';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';
import { HttpService } from 'src/app/Service/http.service';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  /**
   * Label object consists of name
   */
  label: Label = new Label();
  labels: any[];
  messsage: string;
  name = new FormControl(this.label.name);
/**
 * 
 * @param dialogRef 
 * @param data 
 * @param snackbar 
 * @param route 
 * @param router 
 * @param formBuilder 
 * @param dataService 
 * @param httpservice 
 * @param labelservice 
 */
  constructor(
    public dialogRef: MatDialogRef<LabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Label,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private httpservice: HttpService,
    private labelservice: LabelService
  ) { }
  ngOnInit(): void {

  }
  /**
   * Here in label object label name injected and label object is passing to service class
   */
  onSubmit(): void {
    console.log("######" + this.name);
    console.log(this.label.name);
    this.labelservice.postRequest("create", this.label).subscribe(
      (Response: any) => {
        if (Response != null) {
          this.dataService.changeMessage("lable")
          console.log(Response);
          this.snackbar.open(
            "Lable Created Successfully", "undo",
            { duration: 2500 }
          )
          this.dialogRef.close();
        }
      }
    )
  }
}
