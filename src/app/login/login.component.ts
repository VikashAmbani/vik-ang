import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VkhtService } from '../service/vkht.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  login: FormGroup;
  submitted = false;
 
  constructor(public router: Router,private formBuilder: FormBuilder,private callApi:VkhtService) {
    
   }

  ngOnInit() {
      this.login = this.formBuilder.group({
        login_mail: ['', [Validators.required, Validators.email]],
        login_pass: ['', [Validators.required]]
      });
  }
  get l() { return this.login.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.login.invalid) {
          return;
      }
      this.callApi.post('login',this.login.value).subscribe((r:any)=>{
        if(r.status== "success"){
          this.callApi.storage.setItem('api_token',r.api_token)
          this.router.navigate(["/dashboard"])
        }
      },(error)=>{})
  }

}
