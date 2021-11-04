import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Literature } from 'src/app/entity/literature';
import { LiteratureFormResult } from 'src/app/interfaces/literature-form-result';
import { LiteratureService } from 'src/app/services/literature.service';

@Component({
  selector: 'app-literature-modal',
  templateUrl: './literature-modal.component.html',
  styleUrls: ['./literature-modal.component.css']
})
export class LiteratureModalComponent implements OnInit {
  @Input() public literature!: Literature  ;
  @Input() public isAddNew!: boolean ;
  @Input() public formMode!: string ;
  
  literatureForm!: FormGroup;
  id: any;
  result!: LiteratureFormResult;
  parentLiteratures!: Literature[] ;
  parentLiterature: number | undefined;

  
  constructor(public activeModal: NgbActiveModal, 
              private formBuilder: FormBuilder, 
              private literatureService: LiteratureService) {
    
   }

  ngOnInit(): void {

    this.getLiteratures();
    this.createForm();
 
    if (this.literature != undefined) {
      this.setDefaultValues();
    }
  }

  setDefaultValues():void{
  
    this.literatureForm.setValue({
      literatureId: this.literature.literatureId,
          title: this.literature.title,
          author: this.literature.author,
          isin: this.literature.isin,
          parentId: this.literature?.parentId != undefined ? this.literature?.parentId  : '' ,
          citation: this.literature.citation
        })
  }

  public getLiteratures():void{
    this.literatureService.getLiterature().subscribe(
         responseData => {
            this.parentLiteratures = responseData;
         },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
}

  private createForm() {
    this.literatureForm = this.formBuilder.group({
      literatureId: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      isin: [''],
      citation: [''],
      parentId:[''],
    });
  }

  /*updateSelectedLiterature(): void{
    let pid : number = this.literatureForm.get('parentLiteratureId')?.value;
    this.parentLiterature = this.parentLiteratures.find(p => p.literatureId === pid)!;
  }*/

  createLiterature(l?:Literature):Literature{ 
    let newLiterature: Literature = new Literature();
    newLiterature.literatureId = this.literatureForm?.get('literatureId')?.value;
    newLiterature.title = this.literatureForm?.get('title')?.value;
    newLiterature.author = this.literatureForm?.get('author')?.value;
    newLiterature.isin = this.literatureForm?.get('isin')?.value;
    newLiterature.citation = this.literatureForm?.get('citation')?.value;
    newLiterature.parentId = this.literatureForm?.get('parentId')?.value;
    return newLiterature;
  }

  public onAddLiterature(): void {
    
  
    this.literatureService.addLiterature(this.createLiterature()).subscribe(
        (response: Literature) => {
            console.log(response);
            
            this.result = { literature: this.literature, crudType: 'c', status: true };
            this.activeModal.close(this.result);

            this.literatureForm?.reset();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
            this.literatureForm?.reset();
        }
    )
}

public onEditLiterature( literature: Literature): void {
    
    this.literatureService.updateLiterature(this.createLiterature(literature)).subscribe(
        (response: Literature) => {
            console.log(response);

            //this.id = response.data; //guid return in data

            if (this.literatureForm.dirty) {
              this.literature.literatureId = response.literatureId;
              this.literature.title = response.title;
              this.literature.author = response.author;
              this.literature.isin= response.isin;
              this.literature.parentId= response.parentId;
              this.literature.citation = response.citation;

              this.result = { literature: this.literature, crudType: 'u', status: true };
              this.activeModal.close(this.result);
            }
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )
}

public onRemoveLiterature(): void {
      let literatureId: number = this.literatureForm.get('literatureId')?.value;
      this.literatureService.deleteLiterature(literatureId).subscribe(
        (response: void) => {
            console.log(response);
            this.result = { literature: this.literature, crudType: 'd', status: true };
            this.activeModal.close(this.result);
            this.literatureForm?.reset();
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    )
}

}
