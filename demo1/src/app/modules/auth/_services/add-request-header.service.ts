import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AddRequestHeaderService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("access_token");
    if(token == null)
    {
        token ="Not exist";
    }
 
    const customHeaderRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next.handle(customHeaderRequest);
  }
}
