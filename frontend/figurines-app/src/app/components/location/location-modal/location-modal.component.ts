import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { Country } from 'src/app/entity/country';
import { Location } from "src/app/entity/location";
import { LocationFormResult } from "src/app/interfaces/location-form-result";
import { LocationService } from "src/app/services/location.service";

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  @Input() public location!: Location  ;
  @Input() public isAddNew!: boolean ;
  @Input() public formMode!: string ;
  
  locationForm!: FormGroup;
  id: any;
  result!: LocationFormResult;


  
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {

    this.createForm();
 
    if (this.location != undefined) {
      this.locationForm.setValue({
        locationId: this.location.locationId,
        name: this.location.name,
        coordinateLat: this.location.coordinateLat,
        coordinateLng: this.location.coordinateLng,
        address: this.location.address,
        place: this.location.place,
        country: this.location.country,
        
      });
    }
  }

  private createForm() {
    this.locationForm = this.formBuilder.group({
      locationId: [''],
      name: ['', Validators.required],
      place: ['', Validators.required],
      coordinateLat: [''],
      coordinateLng: [''],
      address:[''],
      country:[''],
    });
  }

  public onAddLocation(): void {
    this.locationService.addLocation(this.locationForm?.value).subscribe(
        (response: Location) => {
            console.log(response);
            
            this.result = { location: this.location, crudType: 'c', status: true };
            this.activeModal.close(this.result);

            this.locationForm?.reset();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
            this.locationForm?.reset();
        }
    )
}

public onEditLocation( location: Location): void {
   
    this.locationService.updateLocation(location).subscribe(
        (response: Location) => {
            console.log(response);

            //this.id = response.data; //guid return in data
            if (this.locationForm.dirty) {
              this.location.locationId = response.locationId;
              this.location.name = response.name;
              this.location.coordinateLat = response.coordinateLat;
              this.location.coordinateLng= response.coordinateLng;
              this.location.country= response.country;
              this.location.address = response.address;
              this.location.place = response.place;

              this.result = { location: this.location, crudType: 'u', status: true };
              this.activeModal.close(this.result);
            }
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )
}

public onRemoveLocation(): void {
      let locationId: number = this.locationForm.get('locationId')?.value;
      this.locationService.deleteLocation(locationId).subscribe(
        (response: void) => {
            console.log(response);
            this.result = { location: this.location, crudType: 'd', status: true };
            this.activeModal.close(this.result);
            this.locationForm?.reset();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )
}

}

