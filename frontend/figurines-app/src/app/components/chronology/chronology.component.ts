import { DecimalPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SortableDirective } from "src/app/directives/sortable.directive";
import { Chronology } from "src/app/entity/chronology";
import { ChronologyFormResult } from "src/app/interfaces/chronology-form-result";
import { SortEvent } from "src/app/directives/sortable.directive";
import { ChronologySortService } from "src/app/services/chronology-sort.service";
import { ChronologyService } from "src/app/services/chronology.service";
import { ChronologyModalComponent } from "./chronology-modal/chronology-modal.component";


@Component({
    selector: 'app-chronology',
    templateUrl: './chronology.component.html',
    styleUrls: ['./chronology.component.css'],
    providers: [ChronologySortService, DecimalPipe]
})
export class ChronologyComponent implements OnInit{
  

    private allChronologies: Chronology[] = [];
    public chronologies: Observable<Chronology[]> = of([]);
    public editableChronology: Chronology | undefined;
    modalOptions:NgbModalOptions | undefined;
    public total: Observable<number> | undefined;
    

    constructor(private chronologyService: ChronologyService, public chronologySortService: ChronologySortService, public modalService: NgbModal)  {
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
        console.log('---- CONSTRUCTOR TABLE---')
        this.chronologies = this.chronologySortService.chronologies;
        this.total = this.chronologySortService.total;
         
     }

   
     @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> | undefined;
   

     onChronologySort({column, direction}: SortEvent) {
       // resetting other headers
       this.headers?.forEach(header => {
         if (header.sortable !== column) {
           header.direction = '';
         }
       });
   
       this.chronologySortService.sortColumn = column;
       this.chronologySortService.sortDirection = direction;
     }


    ngOnInit(){
      console.log('---- LOAD ALL ON INIT ---')
       
        
    }



    //getting modal window
    public onOpenModal( isAddNew: boolean, chronology?: Chronology):void {
        
        const modalRef = this.modalService.open(ChronologyModalComponent);
        // @Input chronology
        modalRef.componentInstance.chronology = chronology;
        modalRef.componentInstance.isAddNew = isAddNew;
        modalRef.componentInstance.formMode = 'Edit';
        modalRef.result.then(
            (result: ChronologyFormResult) => {
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
    
    // toaster service
    displayToaster(headerText: string, bodyText: string) {
        //this.toastService.show(bodyText, {
        //    classname: 'bg-success text-light',
        //    delay: 2000,
        //    autohide: true,
        //    headertext: headerText,
        //});
    }

    
    
}



