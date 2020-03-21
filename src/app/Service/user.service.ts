import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) {    }

  public doRegistration(user:any)
  {
    console.log("checking in service"+user)
    return this.http.post("http://localhost:8080/user/Registration",user,{responseType:'text' as 'json'});
    
  }
  // public doLogin(user:any)
  // {
  //   console.log("Login in user"+user)
  //   return this.http.post("http://localhost:8080/user/Login",user,{responseType:'text' as 'json'});
    
  // }
  // public postRequest(url:any,data:any):any{
  //   return this.http.post(this.baseUrl+url,"",{headers:new HttpHeaders().set("jwtToken", localStorage.getItem('token'))});
  //   }
    
  //   public putRequest(url:any):any{
  //   return this.http.put(this.baseUrl+url,"",{headers:new HttpHeaders().set("jwtToken", localStorage.getItem('token'))});
  //   }
    
    
  //   public getRequest(url:any):any{
  //   return this.http.get(this.baseUrl+url);
  //   }
    
  //   public deleteRequest(url:any):any{
  //   return this.http.delete(this.baseUrl+url);
  //   }
  //   public putRequestForget(url,data){
  //       return this.http.put(this.baseUrl + url,data);
  //     }
    }


