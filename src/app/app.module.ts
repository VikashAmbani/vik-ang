import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable } from '@angular/core';
import { Router,RouterModule,Routes,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ExtraOptions } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpModule,} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { ColorPickerModule } from 'ngx-color-picker';
import { VkhtService } from './service/vkht.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VhttpService, AuthInterceptor } from './service/vhttp.service';
import { GalleryComponent } from './gallery/gallery.component';
import { VlangPipe } from './vlang.pipe';
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
const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home/:tab', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'gallery', component: GalleryComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login'}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    HomeComponent,
    DashboardComponent,
    GalleryComponent,
    VlangPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,routerOptions),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxSpinnerModule,
    ColorPickerModule
  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: VhttpService,
    multi: true
},{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
