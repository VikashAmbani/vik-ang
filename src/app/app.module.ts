import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable } from '@angular/core';
import { Router,RouterModule,Routes,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule,} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { VkhtService } from './service/vkht.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: VkhtService,
    private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLogin()){
      return true;
    }else{
      this.myRoute.navigate(["login"]);
      return false;
    }
  }
}
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login'}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
