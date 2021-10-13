import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Chronology } from "src/app/entity/chronology";
import { ChronologyFormResult } from "src/app/interfaces/chronology-form-result";
import { ChronologyService } from "src/app/services/chronology.service";

@Component({
  selector: 'app-chronology-modal',
  templateUrl: './chronology-modal.component.html',
  styleUrls: ['./chronology-modal.component.css']
})
export class ChronologyModalComponent implements OnInit {
  @Input() public chronology!: Chronology  ;
  @Input() public isAddNew!: boolean ;
  @Input() public formMode!: string ;
  
  chronologyForm!: FormGroup;
  id: any;
  result!: ChronologyFormResult;


  
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private chronologyService: ChronologyService) { }

  ngOnInit(): void {

    this.createForm();
 
    if (this.chronology != undefined) {
      this.chronologyForm.setValue({
        chronologyId: this.chronology.chronologyId,
        name: this.chronology.name,
        yearFrom: this.chronology.yearFrom,
        yearTo: this.chronology.yearTo,
      });
    }
  }

  private createForm() {
    this.chronologyForm = this.formBuilder.group({
      chronologyId: [''],
      name: ['', Validators.required],
      yearFrom: ['',RxwebValidators.numeric({ allowDecimal: false, isFormat: false })],
      yearTo: ['',RxwebValidators.numeric({ allowDecimal: false, isFormat: false })],
    });
  }

  public onAddChronology(): void {
    this.chronologyService.addChronologies(this.chronologyForm?.value).subscribe(
        (response: Chronology) => {
            console.log(response);
            
            this.result = { chronology: this.chronology, crudType: 'c', status: true };
            this.activeModal.close(this.result);

            this.chronologyForm?.reset();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
            this.chronologyForm?.reset();
        }
    )
}

public onEditChronology( value: Chronology): void {
    alert('---EDIT---')
    
  /*  this.chronologyService.updateChronologies(chronology).subscribe(
        (response: Chronology) => {
            console.log(response);
            this.getChronologies();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )*/
}

public onRemoveChronology(): void {
    alert('---REMOVE---')
    /*  this.chronologyService.deleteChronologies(chronologyId).subscribe(
        (response: void) => {
            console.log(response);
            this.getChronologies();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )*/
}

}
