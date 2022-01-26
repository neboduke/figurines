import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QueryService } from 'src/app/services/query.service';
import { Query } from 'src/app/entity/query';
import { ToastService } from 'src/app/common/toast.service';


@Component({
  selector: 'app-query-modal',
  templateUrl: './query-modal.component.html',
  styleUrls: ['./query-modal.component.css']
})
export class QueryModalComponent implements OnInit {
  @Input() public search!: string  ;
  @Input() public operator!: string  ;
  @Input() public chronology!: string  ;
  @Input() public motif!: string  ;
  @Input() public context!: string  ;
  //@Input() public isAddNew!: boolean ;
  //@Input() public formMode!: string ;
  
  queryForm!: FormGroup;
  id: any;
  //result!: QueryFormResult;

  constructor(public activeModal: NgbActiveModal, 
      private formBuilder: FormBuilder, 
      private queryService: QueryService, 
      public toastService: ToastService) { }

  ngOnInit(): void {

    this.createForm();
 
    
  }

  private createForm() {
    this.queryForm = this.formBuilder.group({
      queryId: [''],
      queryName: ['', Validators.required],
    });
  }

  public onAddQuery(): void {
    this.queryService.addQuery(this.createQuery()).subscribe(
        (response: Query) => {
            
            this.activeModal.close();

            this.toastService.show('Neue Query wurde hinzugefügt', { classname: 'bg-success text-light', delay: 4000 });
        },
        (error: HttpErrorResponse) => {
            this.toastService.show(error.message, { classname: 'bg-danger text-light ', delay: 4000 });

        }
    )
  }

  private createQuery(): Query {
    let newQuery: Query = new Query();
    newQuery.chronology = this.chronology;
    newQuery.search = this.search;
    newQuery.context = this.context;
    newQuery.motif = this.motif;
    newQuery.operator = (this.operator=="1")? "OR" : "AND";
    newQuery.queryName = this.queryForm.get("queryName")?.value;

    return newQuery;
  } 

}
