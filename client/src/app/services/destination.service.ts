import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  getDestinations(){
    return this.http.get(`localhost:3000/v1/api/destinations/fetchAll`, {
      
    });
  }



}
