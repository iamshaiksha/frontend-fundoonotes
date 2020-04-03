
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = environment.baseUrl;
  baseNoteurl = environment.baseUrlNote;
  /**
   * 
   * @param http 
   * 
   */
  constructor(private http: HttpClient) {

  }
  /**
   * 
   * @param url 
   * @param data 
   * token passing through Httpheader snippet
   */
  public postRequestlabel(url: any, data: any): any {
    return this.http.post(this.baseurl + url, data, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  /**
   * 
   * @param url 
   * @param login 
   */
  public postRequest(url: any, login: Login): any {
    let name = this.http.post(this.baseurl + "Login", login);
    console.log("###")
    console.log("name-->" + name.forEach(x => console.log(x)))
    return name;
  }
  /**
   * 
   * @param url 
   * @param data
   *  
   */
  public putRequest(url: any, data: any): any {
    return this.http.put(this.baseurl + url, data);
  }

  /**
   * 
   * @param url 
   * @param data 
   */
  public deleteRequest(url: any, data: any): any {
    return this.http.put(this.baseNoteurl + url, data);
  }
}