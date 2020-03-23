
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    
    
        baseurl = environment.baseUrl;
      
        constructor(private http: HttpClient) { }
        
        public postRequest(url :any, login:Login):any{
          let name=  this.http.post(this.baseurl+"Login",login);
          console.log("###")
          console.log("name-->"+name.forEach(x=>console.log(x)))
          return name;
        }
       
}