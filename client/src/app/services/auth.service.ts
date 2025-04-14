import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  register(subscriber: any) {
    return this.http.post(`${this.serverUrl}/destinations/subscribe`, subscriber);
  }

  login(subscriber: any){
    return this.http.post(`${this.serverUrl}/destinations/login`, subscriber, {withCredentials: true});
  }
}
