import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Noteservice {
  baseurl = environment.baseUrlNote;
  baseurlLabel = environment.baseUrlLabel;
/**
 * 
 * @param http 
 * 
 */
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param url 
   * @param data
   * token passing through Httpheader snippet 
   */
  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseurl + url, data, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }

 public deleteRemRequest(url: any, data: any)
 {
  return this.http.delete(this.baseurl + url,{headers:new HttpHeaders().set('token',localStorage.getItem('token')) });
  // return this.http.delete(this.baseurl + url, data) ;
 }


  /**
   * 
   * @param url 
   * @param data
   * @Requestheader passing through Httpheader snippet 
   */
  public putRequest(url: any, data: any): any {
    console.log(this.baseurl + url+data);
    return this.http.put(this.baseurl + url, data,{ headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  } 
  /**
   * 
   * @param url 
   * @param data
   * @Requestheader passing through Httpheader snippet 
   */
  public deleteRequest(url: any,data:any): any {
    console.log(localStorage.getItem('token'));
    console.log(this.baseurl + url);
    return this.http.put(this.baseurl + url,data,{headers:new HttpHeaders().set('token',localStorage.getItem('token')) });
  }
  /**
   * 
   * @param url 
   * @Requestheader passing through Httpheader snippet
   */
  public getRequest(url: any): any {
    return this.http.get(this.baseurl + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  /**
   * 
   * @param url 
   * @param data
   *  
   */
  public deletenoteRequest(url:any,data:any):any
  {
    return this.http.put(this.baseurl +url,localStorage.getItem("token"));
  }
  /**
   * 
   * @param url 
   * @Requestheader passing through Httpheader snippet
   */
  public deletearchieveRequest(url: any): any {
    return this.http.post(this.baseurl + url, { headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  // public deleteRequest(url: any):Observable<any> 
  //  {
  //   // return this.http.put(this.baseurl + url,{headers:new HttpHeaders().set('token',localStorage.getItem('token')) });
  // const token={
  //   headers:new HttpHeaders({'X-Requested-with':localStorage.getItem('token')})
  // };
  // console.log(token.headers.get('X-Requested-with'));
  // return this.http.put(this.baseurl + url,token);
 
  // }
  // public deleteLabelRequest(url: any,data:any): any {
  //   return this.http.delete(this.baseurlLabel + url, data,{ headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  // }
  /**
   * 
   * @param url 
   * @param data
   * @Requestheader passing through Httpheader snippet 
   */
  public deleteLabelRequest(url: any,data:any): any {
    console.log(localStorage.getItem('token'));
    console.log(this.baseurl + url);
    return this.http.post(this.baseurlLabel + url,data,{headers:new HttpHeaders().set('token',localStorage.getItem('token'))});
  }
  /**
   * 
   * @param url 
   * @param data 
   * @Requestheader passing through Httpheader snippet
   */
  public deletepinRequest(url: any,data:any): any {
    return this.http.put(this.baseurl + url, data,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  /**
   * 
   * @param url 
   * @param data
   *  
   */
  public putupdateRequest(url: any,data:any): any {
    return this.http.put(this.baseurl + url,data);
  }
  public getSearchRequest(url: any)
  {
    return this.http.get(this.baseurl + url);
  }

}