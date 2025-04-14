import { Component, OnInit } from '@angular/core';
import { DestinationService } from "../../services/destination.service"
import { NgFor } from '@angular/common';

export class Destination {
  _id: string | undefined;
  name: string | undefined;
  city: string | undefined;
  country: string | undefined;
  activities: string | undefined;
}

@Component({
  selector: 'app-destinations',
  imports: [NgFor],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit {
  constructor(private service: DestinationService){}
  
  ngOnInit(): void {
    this.getDestinations();
  }
;

  DESTINATIONS:any;
  _id: string | undefined;
  name: string | undefined;
  city: string | undefined;
  country: string | undefined;
  activities: string | undefined;

  getDestinations(): void {
    this.service.getDestinations().subscribe(response => {
      this.DESTINATIONS = response;
    })
  }

}
