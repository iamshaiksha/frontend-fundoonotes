import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/login';
import { ForgetPassword } from 'src/app/model/forgetpassword';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
forget:ForgetPassword=new ForgetPassword();

email = new FormControl(this.forget.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
  constructor(
    private snackBar: MatSnackBar, private userservice: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  emailValidation() 
  {
    return this.email.hasError('required')? 'enter a value' :
    this.email.hasError('email')? 'invalid email':'';
  }
  forgetNow()
  {
      console.log(this.email);
      this.userservice.putRequestForget( this.forget.email, this.forget ).subscribe(
        (response: any) => {

          if (response !==null) {
            console.log(response);
            console.log("check your mail")
            this.snackBar.open(
              "Link sent successfully to mail", "undo",
              { duration: 2500 }
            )
          } else {
            console.log(response);
            this.snackBar.open(
              "Failed",
              "undo",
              { duration: 2500 }
            )
          }
        }
      )
    }
  
  }