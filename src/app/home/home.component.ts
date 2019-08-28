import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { timer, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public goto: any = null
  public slideData=["Web Developer","PHP Developer","Angular","React","Frontend Developer"]
  public slideText="";
  subscription: Subscription;
  txtscription: Subscription;
  statusText: string="";
  txtLength=0;
  txtIndex=0
  delStart=false
  fontEnd=false

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.getParams();
    this.scrollTo()
       this.slideText =this.slideData[this.txtIndex % this.slideData.length]
       this.txtLength=0;
       this.statusText =""
       this.txtIndex++
    this.txtscription = timer(0, 150).pipe().subscribe((r) =>{
      if(this.slideText.length > this.txtLength){
        this.statusText =this.statusText+this.slideText[this.txtLength];
        this.txtLength++;
      }else{
        this.delStart=true;
        this.fontEnd=!this.fontEnd
        this.delTxt()
      }
    });
  }

  getParams() {
    this.route.params.subscribe((params: Params) => {
      this.goto = params["tab"];
      this.scrollTo()
    });
  }
  scrollTo(eleID?:any) {
    let id=''
    if(eleID){
      id=eleID
    }else if(this.goto){
      id=this.goto
    }else{
      return false
    }
    var ele = document.getElementById(id);
    ele && ele.scrollIntoView();
  }
  
  delTxt() {

    this.txtscription = timer(0, 40).pipe().subscribe((r) => {
      let l = this.statusText.length
      if (this.delStart && l > 1) {
        this.statusText = this.statusText.substr(0, l - 1);
      }else if(this.delStart && !this.fontEnd){
        this.delStart=false
        this.txtscription.unsubscribe()
        this.slideText =this.slideData[this.txtIndex % this.slideData.length]
        this.txtLength=0;
        this.statusText =""
        this.txtIndex++
        this.fontEnd=!this.fontEnd
      }
    })
  }
}
