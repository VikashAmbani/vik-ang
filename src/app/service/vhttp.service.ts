import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { VkhtService } from './vkht.service';

@Injectable({
  providedIn: 'root'
})
export class VhttpService implements HttpInterceptor {

  constructor(private injector: Injector,private spinner: NgxSpinnerService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();

    return next.handle(req).pipe(
      delay(300),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: VkhtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authToken = this.auth.getToken();
    let authReq: any = null
   
   // Clone the request and set the new header in one step.
    if (authToken) {
      authReq = req.clone({ setHeaders: { "api-token": authToken } });
    } else {
      authReq = req;
    }
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

