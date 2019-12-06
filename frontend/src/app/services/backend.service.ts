import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';

@Injectable()
export class BackendService {
  constructor (private http: HttpClient, @Inject('API') protected apiRoot: string) {}

  public get<Type>(url: string, params?: HttpParams): Promise<Type> {
    return this.http.get<Type>(`${this.apiRoot}/${url}`, {params: params}).toPromise();
  }

  public post<Type>(url: string, body: any, params?: HttpParams): Promise<Type> {
    return this.http.post<Type>(`${this.apiRoot}/${url}`, body, {params: params}).toPromise();
  }

  public put<Type>(url: string, body: any, params?: HttpParams): Promise<Type> {
    return this.http.put<Type>(`${this.apiRoot}/${url}`, body, {params: params}).toPromise();
  }

  public getBlob(
    url: string,
    params?: HttpParams | { [param: string]: string | string[] },
  ): Promise<HttpEvent<Blob>> {
    return this.http.get( `${this.apiRoot}/${url}`, {
      params: params,
      observe: 'events',
      responseType: 'blob',
      reportProgress: true,
    }).toPromise();
  }
}
