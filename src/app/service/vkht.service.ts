import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VkhtService {

  baseUrl = environment.baseUrl;
  public storage = localStorage;
  constructor(public api: Http,public router: Router) { }

  post(URL, data) {
    var headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.api.post(this.baseUrl + URL, data, { headers: headers }).map((r) => {
      return r.json();
    })
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
}
