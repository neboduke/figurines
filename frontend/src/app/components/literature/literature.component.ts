import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Literature } from 'src/app/entity/literature';
import { LiteratureFormResult } from 'src/app/interfaces/literature-form-result';
import { CountryService } from 'src/app/services/country.service';
import { LiteratureService } from 'src/app/services/literature.service';
import { LiteratureSortService } from 'src/app/services/literature-sort.service';
import { LiteratureModalComponent } from './literature-modal/literature-modal.component';
import { DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/directives/sortable.directive';

@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css'],
  providers: [LiteratureSortService, DecimalPipe]
})
export class LiteratureComponent implements OnInit {

  public literature: Observable<Literature[]> = of([]);
  modalOptions:NgbModalOptions | undefined;
  public literatures: Literature[] | undefined;
  public total: Observable<number> | undefined;

  constructor(private literatureService: LiteratureService, public literatureSortService: LiteratureSortService,  public modalService: NgbModal) { 
        this.modalOptions = {
            backdrop:'static',
            backdropClass:'customBackdrop'
          }
          this.literature= this.literatureSortService.literature;
          this.total = this.literatureSortService.total;
    }

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> | undefined;

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.literatureSortService.sortColumn = column;
    this.literatureSortService.sortDirection = direction;
  }

  ngOnInit(){
    console.log('---- LOAD ALL ON INIT ---');
    //this.remapValue();
  }

  private remapValue(): Observable<Literature[]>{
     this.literature.subscribe(l => this.literatures = l);

     for( let lit of this.literatures!){
          if(lit.parentId!== undefined){
            //lit.parentTitle = this.getParentTitle(lit.parentLiterature!.literatureId!);
          }
     }

     return of(this.literatures!);
  }
  
  getParentTitle(lid:number): any{
    return this.literatures!.find(l => l.literatureId === lid)!.title ;
  }

  //getting modal window
  public onOpenModal( isAddNew: boolean, literature?: Literature):void {
      
      const modalRef = this.modalService.open(LiteratureModalComponent);
      // @Input chronology
      modalRef.componentInstance.literature = literature;
      modalRef.componentInstance.isAddNew = isAddNew;
      modalRef.componentInstance.formMode = 'Edit';
      modalRef.result.then(
          (result: LiteratureFormResult) => {
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
