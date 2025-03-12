import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/entity/location';
import { LocationFormResult } from 'src/app/interfaces/location-form-result';
import { CountryService } from 'src/app/services/country.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationSortService } from 'src/app/services/location-sort.service';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/directives/sortable.directive';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [LocationSortService, DecimalPipe]
})
export class LocationComponent implements OnInit {

    public locations: Observable<Location[]> = of([]);
    modalOptions:NgbModalOptions | undefined;
    public editableLocation: Location | undefined;
    public total: Observable<number> | undefined;
    

    constructor(private locationService: LocationService, public locationSortService: LocationSortService,  public modalService: NgbModal) { 
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
          this.locations = this.locationSortService.locations;
          this.total = this.locationSortService.total;
    }

    @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> | undefined;

    onSort({column, direction}: SortEvent) {
      // resetting other headers
      this.headers?.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      this.locationSortService.sortColumn = column;
      this.locationSortService.sortDirection = direction;
    }

    ngOnInit(){
      console.log('---- LOAD ALL ON INIT ---');
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
