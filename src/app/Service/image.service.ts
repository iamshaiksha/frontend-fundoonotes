import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseurl = environment.baseUrl;

  constructor(private http:HttpClient) { }

 public  upload(file:File) {
    
      let formData = new FormData(); 
      formData.append('file', file); 
      console.log("formData-->"+formData)
     return this.http.post(this.baseurl+"uploadProfile", formData,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
    }   
    public  post(body:any){
    
      // let formData = new FormData(); 
      // formData.append('file', file); 
      // console.log("formData-->"+formData)
     return this.http.post(this.baseurl+"uploadProfile", body,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
    }   
  
}
