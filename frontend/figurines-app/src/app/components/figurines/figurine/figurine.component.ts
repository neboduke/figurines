import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
import { CarrierService } from 'src/app/services/carrier.service';
import { ChronologyService } from 'src/app/services/chronology.service';
import { CountryService } from 'src/app/services/country.service';
import { FigurineService } from 'src/app/services/figurine.service';
import { LiteratureService } from 'src/app/services/literature.service';
import { LocationService } from 'src/app/services/location.service';
import { MaterialService } from 'src/app/services/material.service';
import { MotifService } from 'src/app/services/motif.service';

@Component({
  selector: 'app-figurine',
  templateUrl: './figurine.component.html',
  styleUrls: ['./figurine.component.css']
})
export class FigurineComponent implements OnInit {
  @Input() public figurine!: Figurine  ;
  @Input() public isAddNew!: boolean ;
  @Input() public formMode!: string ;
  
  literatureForm!: FormGroup;
  id: any;
  result!: FigurineFormResult;

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


  figImages:  any[] | undefined  ;
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
    private carrierService: CarrierService) {   }

  ngOnInit(): void {
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
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }
  private getLocations():void{
    this.locationService.getLocations().subscribe(
        responseData => {
            this.allLocations = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );

  }

  /*--- END---*/

  onUploadImages(files: any){
      this.figImages =  [];
      let uploadedFiles = files.target.files;

      for(let file of uploadedFiles){
        this.convertToBase64(file);
        
      }
      console.log(this.figImages?.length);

  }

  convertToBase64(file: File)  {
      let me = this;
      
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function () {
        me.figImages!.push( filereader.result);
      };
      

  }



}
