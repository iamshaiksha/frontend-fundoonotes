import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label } from 'src/app/model/label';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { HttpService } from 'src/app/Service/http.service';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor( public dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Label,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private httpservice: HttpService,
    private labelservice: LabelService) { }

  ngOnInit(): void {
  }

}
