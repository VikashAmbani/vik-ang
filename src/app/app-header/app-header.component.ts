import { Component, OnInit } from '@angular/core';
import { VkhtService } from '../service/vkht.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  public title = 'V Blog';
  private _isLogin = false
  constructor(private api: VkhtService) {
    this._isLogin = this.api.isLogin()
  }

  ngOnInit() {

  }

  public get isLogin(): boolean {
    return this.api.isLogin()
  }
  logout(){
    this.api.logout()
  }

}
