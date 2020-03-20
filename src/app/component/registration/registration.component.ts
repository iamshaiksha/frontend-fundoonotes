import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


user:User=new User("","",0,"","");
public message:any;
  constructor(public service:UserService) { }

  ngOnInit(): void {
  }

  public registerNow()
  {
    console.log(this.user)
    let resp= this.service.doRegistration(this.user);
    resp.subscribe((data)=>this.message=data);
  }
}
