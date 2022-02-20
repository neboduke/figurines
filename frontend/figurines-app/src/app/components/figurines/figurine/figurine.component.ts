import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { Carrier } from 'src/app/entity/carrier';
import { Chronology } from 'src/app/entity/chronology';
import { Country } from 'src/app/entity/country';
import { Figurine } from 'src/app/entity/figurine';
import { Literature } from 'src/app/entity/literature';
import { Location } from 'src/app/entity/location';
import { Material } from 'src/app/entity/material';
import { Motif } from 'src/app/entity/motif';
import { FigurineFormResult } from 'src/app/interfaces/figurine-form-result';
import { LocationFormResult } from 'src/app/interfaces/location-form-result';
import { CarrierService } from 'src/app/services/carrier.service';
import { ChronologyService } from 'src/app/services/chronology.service';
import { CountryService } from 'src/app/services/country.service';
import { FigurineService } from 'src/app/services/figurine.service';
import { LiteratureService } from 'src/app/services/literature.service';
import { LocationService } from 'src/app/services/location.service';
import { MaterialService } from 'src/app/services/material.service';
import { MotifService } from 'src/app/services/motif.service';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FigurineEditComponent } from './figurine-edit/figurine-edit.component';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-figurine',
  templateUrl: './figurine.component.html',
  styleUrls: ['./figurine.component.css']
})
export class FigurineComponent implements OnInit {
  
  figurine!: Figurine  ;
  figurineForm!: FormGroup;
  id: any;
  result!: FigurineFormResult;
  imageBaseUrl: string = environment.imageBaseUrl;

  /*---SERVICES---*/
  literature: Literature[] = [];
  country!: Country;
  location?: Location;
  museum?: Location ;
  motif?: Motif;
  carrier?: Carrier;
  materials: Material[] = [];
  chronology?: Chronology;
  modalOptions?:NgbModalOptions;


  figImages:  any[] | undefined  ;
  figImage: any | undefined ;

  _album: any[] = [];

  constructor(public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private figurineService: FigurineService,
    private literatureService: LiteratureService,
    private chronologyService: ChronologyService,
    private locationService: LocationService,
    private countryService: CountryService,
    private materialService: MaterialService,
    private motifService: MotifService,
    private carrierService: CarrierService, 
    public modalService: NgbModal,
    private route: ActivatedRoute, 
    private _lightbox: Lightbox) { 
      this.modalOptions = {
          backdrop:'static',
          backdropClass:'customBackdrop'
        }   
  }

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =  Number(params.get('id'));
    });

    this.getFigurine(this.id);

    this.createForm();
  }

  private createForm() {
    this.figurineForm = this.formBuilder.group({
      figurineId: [''],
      title: ['', Validators.required],
      descriptionIconography: [''],
      descriptionIconology: [''],
      dateAbs: [''],
      materialDescription: [''],
      exibitNr: [''],
      keyword: [''],
      chronology: ['', Validators.required],
      materials: ['', Validators.required],
      literature: [''],
      carrier: [''],
      location: [''],
      exibitLocation: [''],
      images: [''],
      imageUrl: [''],
      motif: [''],

    });
  }

  
  /*--- SERVICES---*/

  private getFigurine(figurineId: number):void{
    this.figurineService.getFigurine(figurineId).subscribe(
        responseData => {
            this.figurine = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
 


lightbox_open(index: number): void {
  
  for(let img of this.figurine?.images){
      const src = this.imageBaseUrl + img.imagePath + img.imageTitle;
      const caption = '';
      const thumb = '';
      const album = {
          src: src,
          caption: caption,
          thumb: thumb
      };

      this._album.push(album);
  }


  // open lightbox
  this._lightbox.open(this._album, index);
}

lightbox_close(): void {
  // close lightbox programmatically
  this._lightbox.close();
}

refreshPage() {
  window.location.reload();
}



}
