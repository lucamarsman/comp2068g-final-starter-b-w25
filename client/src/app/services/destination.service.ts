import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  serverUrl: string = environment.serverUrl;

  getDestinations(){
    return this.http.get(`${this.serverUrl}/fetchAll`, {
      
    });
  }



}
