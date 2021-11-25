

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { Carrier } from 'src/app/entity/carrier';
import { Chronology } from 'src/app/entity/chronology';
import { Country } from 'src/app/entity/country';
import { Figurine } from 'src/app/entity/figurine';
import { Image } from 'src/app/entity/image';
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
import { LocationModalComponent } from '../../../location/location-modal/location-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-figurine',
  templateUrl: './figurine-edit.component.html',
  styleUrls: ['./figurine-edit.component.css']
})
export class FigurineEditComponent implements OnInit {
  //@Input() public figurine!: Figurine  ;
  @Input() public isAddNew!: boolean ;
  @Input() public formMode!: string ;
  
  figurine: Figurine  | undefined;
  figurineForm!: FormGroup;
  id: number | undefined;
  result!: FigurineFormResult;
  imageBaseUrl: string = environment.imageBaseUrl;

  /*---SERVICES---*/
  literature: Literature[] = [];
  countries: Country[] = [];
  allLocations: Location[] =[];
  locations: Location[] = [];
  museums: Location[] = [];
  motifs: Motif[] = [];
  carriers: Carrier[] = [];
  materials: Material[] = [];
  chronologies: Chronology[] = [];
  modalOptions:NgbModalOptions | undefined;

  /*---SELECT BOX---*/
  chronology!: Chronology;
  carrier?: Carrier;
  motif?: Motif;
  location!: Location;
  museum?: Location;


  figImages:  Image[] = []  ;
  figImage: any | undefined ;

  constructor(public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private figurineService: FigurineService,
    private literatureService: LiteratureService,
    private chronologyService: ChronologyService,
    private locationService: LocationService,
    private countryService: CountryService,
    private materialService: MaterialService,
    private motifService: MotifService,
    private carrierService: CarrierService, public modalService: NgbModal,private route: ActivatedRoute) { 
      this.modalOptions = {
          backdrop:'static',
          backdropClass:'customBackdrop'
        }   
  }

  ngOnInit(): void {
    this.createForm();
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =  Number(params.get('id'));
    });
    if (this.id != undefined){
      this.getFigurine(this.id);
    }

    this.getLiterature();
    this.getMaterial();
    this.getCountries();
    this.getMotifs();
    this.getChronologies();
    this.getCarriers();
    this.getLocations();
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
      image: [''],
      image2: [''],
      image3: [''],
      imageUrl: [''],
      motif: [''],

    });
  }

  private setFigurineData(responseData:Figurine) {
    this.figurineForm.setValue({
            figurineId: responseData?.figurineId,
            title: responseData?.title,
            descriptionIconography: responseData?.descriptionIconography,
            descriptionIconology: responseData?.descriptionIconology,
            dateAbs: responseData?.dateAbs,
            materialDescription: responseData?.materialDescription,
            exibitNr: responseData?.exibitNr,
            keyword: responseData?.keyword,
            chronology:  [''],
            materials: [''],
            literature:[''],
            carrier:  [''],
            location:  [''],
            exibitLocation:  [''],
            image: responseData?.images[0] ,
            image2: responseData?.images[1] || [''],
            image3: responseData?.images[2] || [''],
            imageUrl: responseData?.imageUrl,
            motif:  ['']

    });
  }

  private getFigurine(figurineId: number):void{
    this.figurineService.getFigurine(figurineId).subscribe(
        responseData => {
          this.setFigurineData(responseData);
          this.figurine = responseData;
          this.figImages = this.figurine.images;
           
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
 

  private filterLocations():void{
    for(let l of this.allLocations){
      (l.locationType===1) ? this.locations.push(l):this.museums.push(l);
    }
  }
  /*--- SERVICES---*/
  private getLiterature():void{
    this.literatureService.getLiterature().subscribe(
        responseData => {
            this.literature = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getMaterial():void{
    this.materialService.getMaterials().subscribe(
        responseData => {
            this.materials = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getCountries():void{
    this.countryService.getCountries().subscribe(
        responseData => {
            this.countries = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getMotifs():void{
    this.motifService.getMotifs().subscribe(
        responseData => {
            this.motifs = responseData;
            if (this.figurine != undefined) {
              this.updateSelectedMotif(this.figurine?.motif?.motifId!);
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getChronologies():void{
    this.chronologyService.getChronologies().subscribe(
        responseData => {
            this.chronologies = responseData;
            if (this.figurine != undefined) {
              this.updateSelectedChronology(this.figurine?.chronology?.chronologyId!);
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getCarriers():void{
    this.carrierService.getCarriers().subscribe(
        responseData => {
            this.carriers = responseData;
            if (this.figurine != undefined) {
              this.updateSelectedCarrier(this.figurine?.carrier?.carrierId!);
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getLocations():void{
    this.locations = [];
    this.museums = [];

    this.locationService.getLocations().subscribe(
        responseData => {
            
            for(let l of responseData){
              (l.locationType===1) ? this.locations.push(l):this.museums.push(l);
            }

            if (this.figurine != undefined) {
              this.updateSelectedLocation(this.figurine?.location?.locationId!);
              this.updateSelectedMuseum(this.figurine?.exibitLocation?.locationId!);
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );


  }

  /*--- END---*/



  openLocation():void{
    let l : any = this.figurineForm.get('location')?.value;
    if(l === -1){
      this.openModalLocation();
    }
    //this.location = this.locations.find(l => l.locationId === lid)!;
  }

  openMuseum():void{
    let l : any = this.figurineForm.get('exibitLocation')?.value;
    if(l ===-1){
      this.openModalLocation();
    }
    //this.museum = this.museums.find(m => m.locationId === lid)!;
  }

  updateSelectedLocation(lid:number): void {
    this.figurineForm!.get('location')!.setValue(
      this.locations.find(l => l.locationId === lid)!  
    )
  }

  updateSelectedMuseum(lid:number): void {
    this.figurineForm!.get('exibitLocation')!.setValue(
      this.museums.find(m => m.locationId === lid)!  
    )
  }
  
  updateSelectedChronology(cid:number): void {
    /*let cid : number = this.figurineForm.get('chronologyId')?.value;
    this.chronology = this.chronologies.find(c => c.chronologyId === cid)!;*/
    this.figurineForm!.get('chronology')!.setValue(
      this.chronologies.find(c => c.chronologyId === cid)!  
    )
  }

  updateSelectedCarrier(cid:number): void {
   /* let cid : number = this.figurineForm.get('carrierId')?.value;
    this.carrier = this.carriers.find(c => c.carrierId === cid)!;*/
    this.carrier = this.carriers.find(c => c.carrierId === cid)!;
    this.figurineForm!.get('carrier')!.setValue(
      this.carriers.find(c => c.carrierId === cid)!    
    )
  }

  updateSelectedMotif(mid:number): void {
    /*let mid : number = this.figurineForm.get('motifId')?.value;
    this.motif = this.motifs.find(m => m.motifId === mid)!;*/
    this.figurineForm!.get('motif')!.setValue(
      this.motifs.find(m => m.motifId === mid)!     
    )
    

  }

  
  onAlert():void{
    alert('SS');
  }

  

  public openModalLocation():void {
      
    const modalRef = this.modalService.open(LocationModalComponent);
    // @Input chronology
    modalRef.componentInstance.isAddNew = true;
    modalRef.componentInstance.formMode = 'Edit';
    modalRef.result.then(
        (result: LocationFormResult) => {
            if (result) {
                if (result.crudType == 'c') {
                  if (result.status) {
                    this.getLocations();
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




  onUploadImages(files: any){
      this.figImages =  [];
      let uploadedFiles = files.target.files;

      for(let file of uploadedFiles){
        this.convertToBase64(file);
        
      }
      console.log(this.figImages?.length);

  }

  convertToBase64(file: File)  {
     /* let me = this;
      
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function () {
        me.figImages!.push( filereader.result);
      };*/
      

  }



}

