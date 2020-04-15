import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from 'src/app/model/login';
import { HttpService } from 'src/app/Service/http.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  /**
   * login object about consist of 
   * 1)email
   * 2)password feilds
   */
  login: Login = new Login("", "");
  loginForm: FormGroup;
  token: string;
  email = new FormControl(this.login.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
  password = new FormControl(this.login.password, [Validators.required, Validators.minLength(8)])
  /**
   * 
   * @param snackBar 
   * @param httpservice 
   * @param formBuilder 
   * @param route 
   * @param router 
   */
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }
  /**
   * Email validation
   */
  getErrorEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  /**
   * Password Validation
   */
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
     this.password.hasError('password') ? 'Min 6 Elements' : '';
  }
  /**
   * Login button 
   * setting token in local storage and time as well for the session expiration
   */
  onlogin() {
    console.log(this.login);
    this.token = localStorage.getItem("token");
    this.httpservice.postRequest("login", this.login).subscribe((response: any) => {
      let n=localStorage.getItem("userName")
      console.log("userName--------->"+n);
      if (response.data != null) {
        console.log(response);
        localStorage.setItem("token", response.data);
        localStorage.setItem("email", response.emailId);
        localStorage.setItem("name",response.name)
        console.log("----------->");
               this.snackBar.open(
          "Login Successfull", "undo",
          { duration: 2000 }
        );
        /**
         * After successfully login navigating router to dashboard component
         */
        this.router.navigate(['/dashboard/notes']);
      }
      else {
        console.log(response);
        console.log("Login:" + this.login.email);
        this.snackBar.open("Login Failed", "undo");
      }
    });
  }


}