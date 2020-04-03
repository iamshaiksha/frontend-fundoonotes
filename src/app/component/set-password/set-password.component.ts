import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';

import { from } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/Service/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Setpassword } from 'src/app/model/setpassword';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  /**
   * SetPassword object consists of Password
   * 
   */
  setpassword: Setpassword = new Setpassword();
  password = new FormControl(this.setpassword.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  confirmpassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  token: string;
  /**
   * 
   * @param snackBar 
   * @param httpservice 
   * @param formBuilder 
   * @param route 
   * @param router 
   */
  constructor(private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('data');
  }


  onClick() {
    if (this.confirmpassword.value === this.password.value) {
      this.token = localStorage.getItem("data")
      this.httpservice.putRequest("resetPassword", this.setpassword).subscribe(
        (response: any) => {
          if (response !== null) {
            localStorage.setItem("token", response.token);
            this.snackBar.open(
              "Passwordchanged Successfully", "undo",
              { duration: 2500 }
            )
            this.router.navigate(['/login'])
          } else {
            console.log(response);
            this.snackBar.open(
              "Reset Failed", "undo",
              { duration: 2500 }
            )
          }
        }

      )

    }

    else {
      this.snackBar.open("password and confirm password not matched", "undo")
    }
  }
}