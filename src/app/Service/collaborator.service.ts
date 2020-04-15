import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient) { }

  

  public addCollaborator(url: any,data:any): any {
    console.log(localStorage.getItem('token'));
        return this.http.post("http://localhost:8080/" + url,data,{headers:new HttpHeaders().set('token',localStorage.getItem('token'))});
  }
}
