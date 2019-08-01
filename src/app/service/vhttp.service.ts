import { Injectable } from '@angular/core';
import {BaseRequestOptions,RequestOptions,RequestOptionsArgs} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VhttpService  extends BaseRequestOptions {
  constructor( ) {
    super();
  }
  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    let params: URLSearchParams = new URLSearchParams();
    params.set('v','vikas');
    console.log(newOptions)
    // newOptions.params=params;
    return newOptions;
  }
}

