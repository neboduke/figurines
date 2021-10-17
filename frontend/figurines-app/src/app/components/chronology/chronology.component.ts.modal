import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { Chronology } from "src/app/entity/chronology";
import { ChronologyFormResult } from "src/app/interfaces/chronology-form-result";
import { ChronologyService } from "src/app/services/chronology.service";
import { ChronologyModalComponent } from "./chronology-modal/chronology-modal.component";


@Component({
    selector: 'app-chronology',
    templateUrl: './chronology.component.html',
    styleUrls: ['./chronology.component.css']
})
export class ChronologyComponent implements OnInit{
  

    public chronologies: Chronology[] = [];
    public editableChronology: Chronology | undefined;
    modalOptions:NgbModalOptions | undefined;
    

    constructor(private chronologyService: ChronologyService, public modalService: NgbModal)  {
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
     }

    ngOnInit(){
        this.getChronologies();
    }

    public getChronologies():void{
        this.chronologyService.getChronologies().subscribe(
             responseData => {
                this.chronologies = responseData;
             },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        );
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



