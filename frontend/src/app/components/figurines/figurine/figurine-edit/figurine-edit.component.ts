

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
import { Context } from 'src/app/entity/context';
import { ContextService } from 'src/app/services/context.service';
import { ToastService } from 'src/app/common/toast.service';




@Component({
  selector: 'app-figurine',
  templateUrl: './figurine-edit.component.html',
  styleUrls: ['./figurine-edit.component.css']
})
export class FigurineEditComponent implements OnInit {
  //@Input() public figurine!: Figurine  ;
  //@Input() public isAddNew!: boolean ;
  //@Input() public formMode!: string ;
  
  figurine: Figurine  | undefined;
  figurineForm!: FormGroup;
  id: number | undefined;
  result!: FigurineFormResult;
  imageBaseUrl: string = environment.imageBaseUrl;
  isAddNew!: boolean ;

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
  contextes: Context[] = [];

  /*---SELECT BOX---*/
  chronology!: Chronology;
  carrier?: Carrier;
  motif?: Motif;
  location!: Location;
  museum?: Location;
  context?: Context;


  figImages:  Image[] = []  ;
  figImage: Image | undefined ;

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
    private contextService: ContextService, 
    public modalService: NgbModal,
    public toastService: ToastService,
    private route: ActivatedRoute) { 
      this.modalOptions = {
          backdrop:'static',
          backdropClass:'customBackdrop'
        }   
  }

  ngOnInit(): void {
    this.createForm();
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =  Number(params.get('id'));
      this.isAddNew= (this.id === -1)?true:false;
    });
    if (this.id !== undefined && this.id !== -1){
      this.getFigurine(this.id!);
    }

    this.getLiterature();
    this.getMaterial();
    this.getCountries();
    this.getMotifs();
    this.getChronologies();
    this.getCarriers();
    this.getContextes();
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
      context: [''],
      location: [''],
      exibitLocation: [''],
      image: [''],
      image2: [''],
      image3: [''],
      imageSource: [''],
      imageSource2: [''],
      imageSource3: [''],
      imageUrl: [''],
      motif: [''],
      dimensionX: [''],
      dimensionY: [''],
      dimensionZ: [''],
      catalogNumber: [''],

    });
  }
  ngAfterViewInit(): void {
    console.log ('onAfterInit');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =  Number(params.get('id'));
      this.isAddNew= (this.id === -1)?true:false;
    });
    if (this.id !== undefined && this.id !== -1){
      this.getFigurine(this.id!);
    }

    this.getLiterature();
    this.getMaterial();
    this.getCountries();
    this.getMotifs();
    this.getChronologies();
    this.getCarriers();
    this.getContextes();
    this.getLocations();
    console.log ('onAfterInit end');
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
            context:  [''],
            location:  [''],
            exibitLocation:  [''],
            image: responseData?.images[0] ,
            image2: responseData?.images[1] || [''],
            image3: responseData?.images[2] || [''],
            imageSource: responseData?.images[0].imageSource ,
            imageSource2: responseData?.images[1]?.imageSource || [''],
            imageSource3: responseData?.images[2]?.imageSource || [''],
            imageUrl: responseData?.imageUrl,
            motif:  [''],
            dimensionX: responseData?.dimensionX,
            dimensionY: responseData?.dimensionY,
            dimensionZ: responseData?.dimensionZ,
            catalogNumber: responseData?.catalogNumber

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
            if (this.figurine != undefined) { this.updateSelectedLiterature(this.figurine?.literature!)};
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
            if (this.figurine != undefined) { this.updateSelectedMaterial(this.figurine?.materials!)};
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
  /*private getMotifs():void{
    this.motifService.getMotifs().subscribe(
        responseData => {
            this.motifs = responseData;
            if (this.figurine != undefined) {
              this.updateSelectedMotif(this.figurine?.motif?);
            }
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }*/
  private getMotifs():void{
    this.motifService.getMotifs().subscribe(
        responseData => {
            this.motifs = responseData;
            if (this.figurine != undefined) { this.updateSelectedMotif(this.figurine?.motif!)};
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

  private getContextes():void{
    this.contextService.getContext().subscribe(
        responseData => {
            this.contextes = responseData;
            if (this.figurine != undefined) {
              this.updateSelectedContext(this.figurine?.context?.contextId!);
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

  updateSelectedMaterial(figMaterials:Material[]): void {
    let mt: Material []=[];
    for(let figMaterial of figMaterials){
        mt.push( this.materials.find(m => m.materialId === figMaterial.materialId)!);
      
    }
    this.figurineForm!.get('materials')!.setValue(mt);
  }

  updateSelectedLiterature(figLiteratures:Literature[]): void {
    let lt: Literature []=[];
    for(let figLiterature of figLiteratures){
        lt.push( this.literature.find(l => l.literatureId === figLiterature.literatureId)!);
      
    }
    this.figurineForm!.get('literature')!.setValue(lt);
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

  updateSelectedMotif(figMotifs:Motif[]): void {
    /*this.figurineForm!.get('motif')!.setValue(
      this.motifs.find(m => m.motifId === mid)!     
    )*/
    let mid: Motif []=[];
    for(let figMotif of figMotifs){
        mid.push( this.motifs.find(l => l.motifId === figMotif.motifId)!);
      
    }
    this.figurineForm!.get('motif')!.setValue(mid);
  }
  updateSelectedContext(cid:number): void {
    /*let mid : number = this.figurineForm.get('motifId')?.value;
    this.motif = this.motifs.find(m => m.motifId === mid)!;*/
    this.figurineForm!.get('context')!.setValue(
      this.contextes.find(c => c.contextId === cid)!     
    )
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
                    this.toastService.show('Neue Location wurde hinzugefügt', { classname: 'bg-success text-light', delay: 4000 });
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

onAddLiterature():void{}

public onAddFigurine(): void {
    
  this.figurineService.addFigurine(this.createFigurine()).subscribe(
      (response: Figurine) => {
          console.log(response);
          this.toastService.show('Daten wurden erfolgreich gespeichert', { classname: 'bg-success text-light', delay: 4000 });
          //this.figurineForm?.reset();
          window.location.href= environment.imageBaseUrl + environment.imageBasePort  + "/figurine/" + response.figurineId! ; //guid return in data

      },
      (error: HttpErrorResponse) => {
        this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
          //alert(error.message);
          //this.figurineForm?.reset();
      }
  )
}

createFigurine(f?:Figurine):Figurine{ 
  let newFigurine: Figurine = new Figurine();
  newFigurine.figurineId = this.figurineForm?.get('figurineId')?.value;
  newFigurine.exibitLocation = this.figurineForm?.get('exibitLocation')?.value;
  newFigurine.exibitNr = this.figurineForm?.get('exibitNr')?.value;
  newFigurine.imageUrl = this.figurineForm?.get('imageUrl')?.value;
  
  
  newFigurine.images = this.figImages;
  if(this.figImages.length >= 1){
    newFigurine.images[0].imageSource = this.figurineForm?.get('imageSource')?.value;
  }
  if(this.figImages.length >= 2){
    newFigurine.images[1].imageSource = this.figurineForm?.get('imageSource2')?.value;
  }
  if(this.figImages.length >= 3){
    newFigurine.images[2].imageSource = this.figurineForm?.get('imageSource3')?.value;
  }
  newFigurine.keyword = this.figurineForm?.get('keyword')?.value;
  newFigurine.literature = this.figurineForm?.get('literature')?.value;
  newFigurine.location = this.figurineForm?.get('location')?.value;
  newFigurine.materialDescription = this.figurineForm?.get('materialDescription')?.value;
  newFigurine.materials = this.figurineForm?.get('materials')?.value;
  newFigurine.motif = this.figurineForm?.get('motif')?.value;
  newFigurine.title = this.figurineForm?.get('title')?.value;
  newFigurine.carrier = this.figurineForm?.get('carrier')?.value;
  newFigurine.context = this.figurineForm?.get('context')?.value;
  newFigurine.chronology = this.figurineForm?.get('chronology')?.value;
  newFigurine.dateAbs = this.figurineForm?.get('dateAbs')?.value;
  newFigurine.descriptionIconography = this.figurineForm?.get('descriptionIconography')?.value;
  newFigurine.descriptionIconology = this.figurineForm?.get('descriptionIconology')?.value;
  newFigurine.dimensionX = Number(this._replace(this.figurineForm?.get('dimensionX')?.value,',','.'));
  newFigurine.dimensionY = Number(this._replace(this.figurineForm?.get('dimensionY')?.value ,',','.'));
  newFigurine.dimensionZ = Number(this._replace(this.figurineForm?.get('dimensionZ')?.value, ',','.'));
  newFigurine.catalogNumber = Number(this.figurineForm?.get('catalogNumber')?.value);

  return newFigurine;
}

_replace(str:string,from:string, to:string):string{
  let changed:string = str.toString().replace(from,to);
  return changed;
}

public onEditFigurine( figurine: Figurine): void {
  
  this.figurineService.updateFigurine(this.createFigurine(figurine)).subscribe(
      (response: Figurine) => {
          console.log(response);

          //this.id = response.data; //guid return in data

          this.toastService.show('Daten wurden erfolgreich gespeichert', { classname: 'bg-success text-light', delay: 4000 });
          window.location.reload();
          
      },
      (error: HttpErrorResponse) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
         // alert(error.message);
      }
  )
}

public onRemoveFigurine(): void {
    let figurineId: number = this.figurineForm.get('figurineId')?.value;
    this.figurineService.deleteFigurine(figurineId).subscribe(
      (response: void) => {
          console.log(response);
          this.toastService.show('Das Objekt wurde gelöscht', { classname: 'bg-success text-light', delay: 4000 });
          this.figurineForm?.reset();
      },
      (error: HttpErrorResponse) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
          alert(error.message);
      }
  )
}




  onUploadImages(event: any, id: string){
      //this.figImages =  [];
      const file: File = event.target.files[0];
      this.figImage = new Image;
      this.figImage!.imageTitle = file.name;
      this.figImage!.imagePath = environment.imageBasePath;

      if(id == "image"){
        //this.figImage.imageId = this.figImages[0].imageId;
        this.figImages[0] = this.figImage!;
        console.log(this.figImages?.length);
      }
      if(id == "image2"){
        if(this.figImages.length > 1){
          //this.figImage.imageId = this.figImages[1].imageId;
          this.figImages[1] = this.figImage!;
        }else{
          this.figImages.push(this.figImage!);
        }
        
        console.log(this.figImages?.length);
      }
      if(id == "image3"){
        if(this.figImages.length > 2){
          this.figImages[2] = this.figImage!;
        }else{
          this.figImages.push(this.figImage!);
        }
        //this.figImages.splice(2,1);
        console.log(this.figImages?.length);

      }

     /* let uploadedFiles = files.target.files;

      for(let file of uploadedFiles){
        this.convertToBase64(file);
        
      }*/
      console.log(this.figImages?.length);

  }

  fileUploaded(file:any) {
    console.log(file.uploadedFile);
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

