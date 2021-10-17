import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/entity/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

    public locations: Location[] = [];
    

    constructor(private locationService: LocationService) { }

    ngOnInit(){
        this.getLocations();
    }

    public getLocations():void{
        this.locationService.getLocations().subscribe(
             responseData => {
                this.locations = responseData;
             },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        );
    }

    public onOpenModal(isNew: boolean , location?: Location):void {
      
      const container = document.getElementById('location_container');
      
     
  }

}
