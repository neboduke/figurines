import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-figurine',
  templateUrl: './figurine.component.html',
  styleUrls: ['./figurine.component.css']
})

export class FigurineComponent implements OnInit {
  //@ViewChild('figurine', { static: false }) exportContent!: ElementRef;
  
  figurine!: Figurine  ;
  figurineForm!: FormGroup;
  id: any;
  result!: FigurineFormResult;
  imageBaseUrl: string = environment.imageBaseUrl;
  isExporting = false;

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
  this._lightbox.open(this._album, index,{ wrapAround: true, showZoom: true });
}

lightbox_close(): void {
  // close lightbox programmatically
  this._lightbox.close();
}

refreshPage() {
  window.location.reload();
}

exportAsPDF() {
  const element = document.getElementById('figurine');
  if (!element) {
    console.error('Element #figurine nicht gefunden');
    return;
  }

  this.isExporting = true;

  //element.style.fontSize     = '16pt';
  // Schriftfamilie ändern
  //element.style.fontFamily   = '"Times New Roman", Times, serif';

  setTimeout(() => {
    html2canvas(element, {
      useCORS: true,
      scale: 1
    })
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png', 0.5);

      // PDF anlegen (Hochformat, mm, A4)
      const pdf = new jsPDF('p', 'mm', 'a4',true);
    
      const pageWidth  = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Ränder in mm
      const marginLeft = 15;
      const marginTop  = 20;

      // verfügbare Breite für das Bild
      const imgWidth  = pageWidth - marginLeft * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Schriftart und -größe setzen
      pdf.setFont('times', 'normal');
      pdf.setFontSize(20);

      // Optional: Titel oder sonstigen Text oberhalb des Bildes einfügen
      // const title = this.figurine.title || 'Export';
      // pdf.text(title, marginLeft, marginTop);

      // Bild ins PDF einfügen (unterhalb eventueller Texte)
      const imgY = marginTop; // oder marginTop + 10, wenn Text vorhanden
      pdf.addImage(imgData, 'PNG', marginLeft, imgY, imgWidth, imgHeight);

      // PDF speichern
      pdf.save(`${this.figurine.title || 'export'}.pdf`);
    })
    .catch(err => {
      console.error('PDF-Export fehlgeschlagen', err);
    })
    .finally(() => {
      this.isExporting = false;
      element.style.fontSize     = '';
      // Schriftfamilie ändern
      element.style.fontFamily   = '';
    });
  }, 100);
}
  
}


