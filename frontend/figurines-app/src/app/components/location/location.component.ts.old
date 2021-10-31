import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/entity/location';
import { LocationFormResult } from 'src/app/interfaces/location-form-result';
import { CountryService } from 'src/app/services/country.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationModalComponent } from './location-modal/location-modal.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

    public locations: Location[] = [];
    modalOptions:NgbModalOptions | undefined;
    

    constructor(private locationService: LocationService,public modalService: NgbModal) { 
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
    }

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
    

    //getting modal window
    public onOpenModal( isAddNew: boolean, location?: Location):void {
        
        const modalRef = this.modalService.open(LocationModalComponent);
        // @Input chronology
        modalRef.componentInstance.location = location;
        modalRef.componentInstance.isAddNew = isAddNew;
        modalRef.componentInstance.formMode = 'Edit';
        modalRef.result.then(
            (result: LocationFormResult) => {
                if (result) {
                    
                    if (result.crudType == 'u') {
                      if (result.status) {
                        // toaster for CRUD\Update
                        //this.displayToaster('Confirmation', 'Data is updated');
                      }
                    }
                    if (result.crudType == 'd') {
                      if (result.status) {
                        this.refreshPage();
                        // toaster for CRUD\Delete
                        //this.displayToaster('Confirmation', 'Data is deleted');
                      }
                    }
                    if (result.crudType == 'c') {
                      if (result.status) {
                        this.refreshPage();
                        // toaster for CRUD\Create
                        //this.displayToaster('Confirmation', 'Data is saved');
                      }
                    }
                    if (result.crudType == '') {
                        // toaster for cancel
                        //this.displayToaster('Confirmation', 'Form is cancel');
                    }
                  }
            },(reason) => {
                
              }
        )

    }
   

    refreshPage() {
        window.location.reload();
      }
}
