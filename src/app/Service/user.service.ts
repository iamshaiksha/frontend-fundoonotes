



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  postRequest(arg0: string, login: any) {
    throw new Error("Method not implemented.");
  }
  
  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) {    }

  public doRegistration(user:any)
  {
    console.log("checking in service"+user)
    return this.http.post("http://localhost:8080/user/Registration",user,{responseType:'text' as 'json'});
    
  }
  

  public putRequestForget(url,data:any){
    const newLocal = this.baseUrl;
    return this.http.post("http://localhost:8080/user/forgetPassword/"+url,data);
  }

  }