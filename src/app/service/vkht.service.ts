import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VkhtService {

  baseUrl = environment.baseUrl;
  public storage = localStorage;
  constructor(public api: HttpClient,public router: Router) { }
  setCommonParam(){
    let data={
      'module':'vikas'
   }
    const params = new HttpParams({ fromObject: data });
    const headerMap = {'content-type': 'application/json',"X-Requested-With": 'XMLHttpRequest'}
    const headers = new HttpHeaders(headerMap) ;
    return { headers, params };
  }

  post(URL, data) {
    var headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.api.post(this.baseUrl + URL, data,this.setCommonParam());
  }
  isLogin(){
    let login=this.storage.getItem('api_token')
    if(login){
      return true
    }
    return false
  }
  logout(){
    this.storage.removeItem('api_token')
    this.router.navigate(["/"])
  }
  getToken(){
    return this.storage.getItem('api_token')
  }
}
