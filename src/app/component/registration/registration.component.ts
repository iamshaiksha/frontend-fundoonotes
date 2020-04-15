import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

/**
 * user object injecting the values
 */
user:User=new User("","",0,"");
/**
 * user feilds
 */
  name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl(this.user.email, [Validators.required, Validators.email]);
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(7), Validators.maxLength(15)])
  mobileNumber = new FormControl(this.user.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  public message:any;
 /**
  * 
  * @param service 
  */
  constructor(public service:UserService, private snackBar:MatSnackBar, private router:Router ) { }

  ngOnInit(): void 
  {

  }
  /**
   * Name validation
   */
  getErrorName() {
    return this.name.hasError('required')
      ? 'must required'
      : this.name.hasError('name')
      ? ''
      : 'Must be 8 letters';
  }
/**
   * Email validation
   */
  getErrorEmail() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'invalidmail'
      : '';
  }
  /**
  * Password validation
  */
  getErrorPassword() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('password')
      ? ''
      : 'Must be 8 letters';
  }
  /**
   * mobileNumber validation
   */
  getmobileNumber() {
    return this.mobileNumber.hasError('required') ? 'must required' : '';
  }
  /**
   * after inecting the values into user object passing to service class 
   */
  public registerNow()
  {
    console.log(this.user)
     this.service.doRegistration(this.user).subscribe((response:any)=>{ 
       if(response!=null)
      {
       
        console.log("response checking")
        console.log(response)
        console.log("response="+response)
        this.snackBar.open("Registration successfull", "", {duration:2000, verticalPosition:"top"});
        this.router.navigateByUrl("/login");
      }
      else
      {
        this.snackBar.open("registration failed", "", {duration:2000, verticalPosition:"top"});
      }})

    // resp.subscribe((data)=>
   
    // this.message=data);
    // console.log(this.email);
  }
}

