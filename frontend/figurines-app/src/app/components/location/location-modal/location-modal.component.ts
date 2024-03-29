import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { Country } from 'src/app/entity/country';
import { Location } from "src/app/entity/location";
import { LocationFormResult } from "src/app/interfaces/location-form-result";
import { CountryService } from 'src/app/services/country.service';
import { LocationService } from "src/app/services/location.service";
import { ToastService } from 'src/app/common/toast.service';


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
  countries!: Country[] ;
  country: Country | undefined;

  
  constructor(public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private locationService: LocationService,
    private countryService: CountryService,
    public toastService: ToastService) {
    
   }

  ngOnInit(): void {
    
    this.createForm();
    this.getCountries();
    if (this.location != undefined) {
      this.setDefaultValues();
    }
  }

  setDefaultValues():void{
  this.locationForm.setValue({
    locationId: this.location.locationId,
        name: this.location.name,
        coordinateLat: this.location.coordinateLat,
        coordinateLng: this.location.coordinateLng,
        address: this.location.address,
        place: this.location.place,
        coordinate: this.location.coordinate,
        country: [''],
        //countryId: this.location.country?.countryId ,
        locationType: this.location.locationType
      })
      this.country = this.location.country;
     
 }
 setCountryValue():void{
  this.locationForm!.get('country')!.setValue(
         this.filterCountry(this.location!.country!)       
      )
     
 }

  public getCountries():void{
    this.countryService.getCountries().subscribe(
         responseData => {
            this.countries = responseData;
            if (this.location != undefined) {
              this.setCountryValue();
            }
         },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

  filterCountry(c: Country): Country {
    for(let cn of this.countries){
      if(cn.countryId === c.countryId) return cn;
    }
    return c;
  }
    
    
    /*for (var c of this.countries) {
      this.cMap?.set(c.countryId!,c);
    }*/


  private createForm() {
    this.locationForm = this.formBuilder.group({
      locationId: [''],
      name: ['', Validators.required],
      place: ['', Validators.required],
      coordinateLat: [''],
      coordinateLng: [''],
      coordinate: [''],
      address:[''],
      country:[null, [Validators.required]],
      //countryId:['', Validators.required],
      locationType:1,
    });
  }

  updateSelectedCountry(): void{
    let cid : number = this.locationForm.get('countryId')?.value;
    this.country = this.countries.find(c => c.countryId === cid)!;
  }

  createLocation(l?:Location):Location{ 
    let newLocation: Location = new Location();
    newLocation.locationId = this.locationForm?.get('locationId')?.value;
    newLocation.name = this.locationForm?.get('name')?.value;
    newLocation.place = this.locationForm?.get('place')?.value;
    newLocation.coordinateLat = this.locationForm?.get('coordinateLat')?.value;
    newLocation.coordinateLng = this.locationForm?.get('coordinateLng')?.value;
    newLocation.coordinate = this.locationForm?.get('coordinate')?.value;
    newLocation.address = this.locationForm?.get('address')?.value;
    newLocation.country = this.locationForm.get('country')?.value;//this.country;
    newLocation.locationType = this.locationForm?.get('locationType')?.value;
    return newLocation;
  }

  public onAddLocation(): void {
    
    //this.locationService.addLocation(this.locationForm?.value).subscribe
    this.locationService.addLocation(this.createLocation()).subscribe(
        (response: Location) => {
            console.log(response);
            
            this.result = { location: this.location, crudType: 'c', status: true };
            this.activeModal.close(this.result);
            this.toastService.show('Neue Location wurde hinzugefügt', { classname: 'bg-success text-light', delay: 4000 });
            this.locationForm?.reset();
        },
        (error: HttpErrorResponse) => {
            this.toastService.show(error.message, { classname: 'bg-danger text-light ', delay: 4000 });
            //this.locationForm?.reset();
        }
    )
}

public onEditLocation( location: Location): void {
    
    this.locationService.updateLocation(this.createLocation(location)).subscribe(
        (response: Location) => {
            //console.log(response);

            //this.id = response.data; //guid return in data

            if (this.locationForm.dirty) {
              this.location.locationId = response.locationId;
              this.location.name = response.name;
              this.location.coordinateLat = response.coordinateLat;
              this.location.coordinateLng= response.coordinateLng;
              //this.location.country = this.updateSelectedValue(response.country?.countryId!);
              this.location.country= response.country;
              this.location.address = response.address;
              this.location.place = response.place;
              this.location.locationType = response.locationType;

              this.result = { location: this.location, crudType: 'u', status: true };
              this.toastService.show('Daten wurden gespeichert', { classname: 'bg-success text-light', delay: 4000 });
              this.activeModal.close(this.result);
            }
            
            
        },
        (error: HttpErrorResponse) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
        }
    )
}

public onRemoveLocation(): void {
      let locationId: number = this.locationForm.get('locationId')?.value;
      this.locationService.deleteLocation(locationId).subscribe(
        (response: void) => {
            console.log(response);
            this.result = { location: this.location, crudType: 'd', status: true };
            this.toastService.show('Location wurde gelöscht', { classname: 'bg-success text-light', delay: 4000 });
            this.activeModal.close(this.result);
            this.locationForm?.reset();
        },
        (error: HttpErrorResponse) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
        }
    )
}

setNewCoordinate(newCoordinate: any):void{
    var newVal: string = newCoordinate.newCoordinate;

    var latlng: string[] = newVal.split(',');

    this.locationForm!.get('coordinateLat')!.setValue(latlng[0]);
    this.locationForm!.get('coordinateLng')!.setValue(latlng[1]);
}

}



