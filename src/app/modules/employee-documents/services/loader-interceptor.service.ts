import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../util/loader.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(public loader : LoaderService) { }
  private cache = new Map<string, any>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.showLoader(request.url);
    console.log('interceptor',request.url);

    return next.handle(request).pipe(
        finalize(() => this.loader.hideLoader())
    );
  }
}
