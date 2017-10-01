import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// @Injectable()
// export class HttpService {

//   constructor(private http: HttpClient) { }

//   public get<T> (url : string) : Observable<T>{
//     let options : HttpOptions = new HttpOptions();
//     return  this.http.get<T>(url, {}); 

//   }

//   public getSimple (url : string, options? : HttpOptions) : Observable<any>{
//     return  this.http.get(url, {});
//   }

//   public post(url : string, data:any, options? : HttpOptions) : Observable<ArrayBuffer>{

//     //return  this.http.post(`${environment.API}/${url}`, data, options);
//     return  this.http.post(url, data, options);
//   }
// }

// interface IHttpOptions {
//   headers?: HttpHeaders;
//   observe?: 'body';
//   params?: HttpParams;
//   reportProgress?: boolean;
//   responseType: 'arraybuffer';
//   withCredentials?: boolean;
// }

// export class HttpOptions implements IHttpOptions {

//   headers?: HttpHeaders;
//   observe?: 'body';
//   params?: HttpParams;
//   reportProgress?: boolean;
//   responseType: 'arraybuffer';
//   withCredentials?: boolean;

//   constrcutor() {
//     this.headers = new HttpHeaders();
//     this.params = new HttpParams();

//   }

//   public addHeader(key: string, value: string) {
//     this.headers = this.headers.set(key, value);
//   }

//   public removeHeader(key: string, value: string) {
//     this.headers = this.headers.delete(key, value);
//   }

//   public addParam(name: string, value: string) {
//     this.params = this.params.set(name, value);
//   }

//   public removeParam(name: string) {
//     this.params = this.params.delete(name);
//   }
// }

// if we want a constant response structure, otherwise we could use any
export interface IHttpResponse {
  login: string;
  avatar_url: string;
  url: string;
}

// export interface IDashboardResponse {
//   data: any;
// }

@Injectable()
export class MegadashInterceptor implements HttpInterceptor {

  private getUserToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (currentUser) ? currentUser.token : null;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {

      if (event instanceof HttpRequest) {
        console.log('request');
        let authReq = request.clone({
          // will be replaced with getUserToken()
          headers: request.headers.set('Authorization', 'token 430adea6b1c19a776103982663b0fa2d6b82a49f'),
        });
        return next.handle(authReq);
      } else if (event instanceof HttpResponse) {
        console.log('response');
        // what to do?
      }
    }).catch(response => {
      if (response instanceof HttpErrorResponse) {
        switch (response.status) {
          case 401:
            // redirect to login page?
            break;
          case 404:
            // message to user?
            break;
          default:
            return Observable.throw(response.error);
        }
      }
    });
  }
}


