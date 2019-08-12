import { Component } from '@angular/core';
import { VkhtService } from './service/vkht.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Blog';
  public isLogin=false
  constructor(public router: Router,private callApi:VkhtService){
    this.isLogin=this.callApi.isLogin()
    if(this.isLogin){
      this.router.navigate(["/dashboard"])
    }
  }

}
