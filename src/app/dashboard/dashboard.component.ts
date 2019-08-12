import { Component, OnInit } from '@angular/core';
import { VkhtService } from '../service/vkht.service';
import { DomSanitizer } from '@angular/platform-browser';
import { read } from 'fs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public title="Create Your Own Page"
  public color="rgba(25,135,120,0.27)"
  public t={box:true,color:'#e42f2f',value:'This is Demo Title.'}
  public bgimages:any='';
  constructor(private callApi:VkhtService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.callApi.post('public/dashboard',{'or':"vik"}).subscribe((r:any)=>{
      if(r.status== "success"){
        this.title=this.title+' data.'
      }
    },(error)=>{})
  }
  /** on color select */
  onChangeColor(r){
    console.log(r)
  }
  openTitle(){
    this.t.box=true
  }

  getFile(e){
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = (e) => {
        this.bgimages=e.target['result'];
    }
    reader.readAsDataURL(file);
  }

}
