import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class BackendService {
  constructor (private http: HttpClient) {}

  public get<Type>(url: string, params?: HttpParams): Promise<Type> {
    return this.http.get<Type>(url, {params: params}).toPromise();
  }

  public post<Type>(url: string, body: any, params?: HttpParams): Promise<Type> {
    return this.http.post<Type>(url, body, {params: params}).toPromise();
  }

  public put<Type>(url: string, body: any, params?: HttpParams): Promise<Type> {
    return this.http.put<Type>(url, body, {params: params}).toPromise();
  }
}
