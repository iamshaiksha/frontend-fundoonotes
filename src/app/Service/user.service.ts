import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {    }

  public doRegistration(user:any)
  {
    console.log("checking in service"+user)
    return this.http.post("https://localhost:8080/user/Registration",user,{responseType:'text' as 'json'});
    
  }

}
