import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Figurine } from 'src/app/entity/figurine';
import { FigurineService } from 'src/app/services/figurine.service';
import { environment } from 'src/environments/environment';
import * as geojson from 'geojson';
import { FigurinePoint } from 'src/app/entity/figurine-point';
import { MapLegend } from 'src/app/entity/map-legend';
import { Context } from 'src/app/entity/context';
import { ContextService } from 'src/app/services/context.service';
import { point } from 'leaflet';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { ChronologyService } from 'src/app/services/chronology.service';
import { CountryService } from 'src/app/services/country.service';
import { MotifService } from 'src/app/services/motif.service';
import { Country } from 'src/app/entity/country';
import { Motif } from 'src/app/entity/motif';
import { Chronology } from 'src/app/entity/chronology';
import { Query } from 'src/app/entity/query';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { QueryModalComponent } from '../query-modal/query-modal.component';

@Component({
  selector: 'app-figurines',
  templateUrl: './figurines.component.html',
  styleUrls: ['./figurines.component.css']
})
export class FigurinesComponent implements OnInit {
  figurines: Figurine[] = [];
  figurinesToShow : Figurine[] = [];
  searchForm!: FormGroup;
  filterForm!: FormGroup;
  imageBaseUrl: string = environment.imageBaseUrl;
  points: FigurinePoint[] = [];
  mapLegend: MapLegend[] = [];
  contextes: Context[] = [];
  query?: Query;
  modalOptions:NgbModalOptions | undefined;

  figurinesSetSearched = new Set<Figurine>();
  figurinesSetFiltered = new Set<Figurine>();

  countries: Country[] = [];
  motifs: Motif[] = [];
  chronologies: Chronology[] = [];

  countChronology: number = 0;
  countMotif: number = 0;
  countContext: number = 0;

  //ngModel
  searchString: string = "";
  searchType: number = 1;


  @ViewChild(MapComponent) 
  figurinesMap!: MapComponent;


  constructor(private figurineService: FigurineService, 
    private formBuilder: FormBuilder, 
    private contextService: ContextService,
    private chronologyService: ChronologyService,
    private countryService: CountryService,
    private motifService: MotifService, 
    public modalService: NgbModal)  {
      this.modalOptions = {
          backdrop:'static',
          backdropClass:'customBackdrop'
        }  
  }

  ngOnInit(): void {
    this.createForm();
    this.getFigurines();
    this.createMapLegend();
    this.getCountries();
    this.getMotifs();
    this.getChronologies();
    this.getContextes();
  }

  //try to crete checkbox list as form/control array

    //https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular
    get chronologyFormArray() {
      return this.filterForm.controls.filterChronology as FormArray;
    }
    get motifFormArray() {
      return this.filterForm.controls.filterMotif as FormArray;
    }
    get contextFormArray() {
      return this.filterForm.controls.filterContext as FormArray;
    }

    private createForm() {
      this.searchForm = this.formBuilder.group({
        search: [''],
        searchType: 1,
      });

      //https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular
      this.filterForm = this.formBuilder.group({
        filterChronology: new FormArray([])
      });
      
    }
    //https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular
    private addCheckboxesToForm() {
      this.chronologies.forEach(() => this.chronologyFormArray.push(new FormControl(false)));
    }

  //end

  /*--- SERVICES---*/
  private getFigurines():void{
    this.figurineService.getFigurines().subscribe(
        responseData => {
            this.figurines = responseData;
            this.search();
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

    /*--- SERVICES---*/
    
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
              this.addCheckboxesToForm();
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
          },
          (error: HttpErrorResponse) => {
              alert(error.message)
          }
      );
    }
  
    /*--- END---*/

 /*----- START MAP ------*/
  private filterPoints(pfigurines:  Figurine[]){
    this.points = pfigurines.map( f =>{
        let point: FigurinePoint = new FigurinePoint();
        point!.title = f.title!;
        point!.location = f.location?.name! ;
        point!.lat = Number.parseFloat(f.location?.coordinateLat!);
        point!.lng = Number.parseFloat(f.location?.coordinateLng!);
        let chrono: string = f.chronology!.name.substring(0,2).toLowerCase();
        let contx: string = f.context!.title!.toLowerCase();
        point!.icon = contx+"-"+chrono+".svg";
        point.url = environment.imageBaseUrl + environment.imageBasePort + "/figurine/"+ f.figurineId;
        return point;
      }
    )
    
  }


  private createMapLegend(): void {
    this.contextService.getContext().subscribe(
      responseData => {
          this.contextes = responseData;
          this.setMapLegend();
      },
      (error: HttpErrorResponse) => {
          alert(error.message)
      }
   );
    
  }

  private setMapLegend():void{
    this.mapLegend =this.contextes.map(c =>{
      let ml: MapLegend = new MapLegend();
      ml.text = c!.title!.toLowerCase();
      ml.icon = ml.text+".svg";
      return ml;
    })
  }
  /* ---- END MAP ------ */


  /* 
    * search all figurines for a search strings
    * searchString are one or more words, separated by ' '
    * 
  */
  public search(): void {  //Figurine[][]
   
    let searchItems:string[] = this.searchString.toLowerCase().split(' ');
    this.figurinesSetSearched.clear();
   
    let arr:Figurine[][] = (this.searchType==1)?
                            this.filterSearchItemsOr(searchItems):
                            this.filterSearchItemsAnd(searchItems); 
    
    for(let i=0; i< arr.length;i++){
        for(let a of arr[i]){
            this.figurinesSetSearched.add(a)
            this.figurinesSetFiltered.add(a);
        }
    }
    this.useFilter()

  }

  private filterSearchItemsOr(searchItems: string[]): Figurine[][]{
      return searchItems.map(s =>{
        return this.figurines
        .filter(f => (
          this.filterOr(f,s))
        )
      })
  }

  private filterOr(f:Figurine, s:string): boolean {
    return  (f.title?.toLowerCase().includes(s) ||
    f.materialDescription?.toLowerCase().includes(s) || 
    f.descriptionIconography?.toLowerCase().includes(s) || 
    f.descriptionIconology?.toLowerCase().includes(s) ||
    f.keyword?.toLowerCase().includes(s))!;
  }

  private filterSearchItemsAnd(searchItems: string[]): Figurine[][]{
    let tmpFigArr:Figurine[] = this.figurines;
    for(let s of searchItems){
      let tmpFilterFigArr:Figurine[] = tmpFigArr.filter(f => (
        this.filterOr(f,s)
      ))
      tmpFigArr =  tmpFilterFigArr;//this.compareArrays(tmpFigArr,tmpFilterFigArr)
    }
    let returnArray:Figurine[][] = [[...tmpFigArr]];
    return returnArray;
  }

  private compareArrays(arr1:Figurine[], arr2:Figurine[]): Figurine[] {
    return arr1.filter(figurine => arr2.includes(figurine)).filter((figurine, index, self) => self.indexOf(figurine) === index);
  }


  private doFinishViewObjects(arr?:Figurine[]):void {
    
    //this.filterFigurines();

    this.filterPoints (Array.from(this.figurinesSetFiltered));
    if(this.figurinesMap != null) {
      this.figurinesMap.addFigurinePlaceMarkers(this.points);
    }
  }


  doPotenz(p:number):number{
    return Math.pow(2,p);
  }

 
  onChronology(e:any): void{
    let checked: boolean = e.target.checked;
    let cid:number = e.target.value;
    //new methods
    (checked)? this.countChronology++ :this.countChronology-- ; 

    if(this.countChronology == 0){ 
        document.getElementById("fa_chronology")?.classList.remove("fa");
        document.getElementById("fa_chronology")?.classList.add("far");
    }else{
        document.getElementById("fa_chronology")?.classList.remove("fa");
        document.getElementById("fa_chronology")?.classList.remove("far");
        document.getElementById("fa_chronology")?.classList.add("fa");
    }
        
  
    for(let c of this.chronologies){
        if(c.chronologyId==cid){c.checked = checked;}
    }

    this.useFilter();
  }

  onContext(e:any): void{
    let cid:number = e.target.value;
    let checked: boolean = e.target.checked;

    (checked)?  this.countContext++ : this.countContext-- ; 

    if(this.countContext == 0){ 
      document.getElementById("fa_context")?.classList.remove("fa");
      document.getElementById("fa_context")?.classList.add("far");
    }else{
        document.getElementById("fa_context")?.classList.remove("fa");
        document.getElementById("fa_context")?.classList.remove("far");
        document.getElementById("fa_context")?.classList.add("fa");
    }
    
    for(let c of this.contextes){
        if(c.contextId==cid){c.checked = checked;}
    }

    this.useFilter();
  }


  onMotif(e:any): void{
    let cid:number = e.target.value;
    let checked: boolean = e.target.checked;

    (checked)? this.countMotif++ : this.countMotif-- ; 

    if(this.countMotif == 0){ 
      document.getElementById("fa_motif")?.classList.remove("fa");
      document.getElementById("fa_motif")?.classList.add("far");
    }else{
        document.getElementById("fa_motif")?.classList.remove("fa");
        document.getElementById("fa_motif")?.classList.remove("far");
        document.getElementById("fa_motif")?.classList.add("fa");
    }
    
    for(let m of this.motifs){
        if(m.motifId==cid){m.checked = checked;}
    }

    this.useFilter();
  }

  private useFilter():void{
    let tmpChonologies: number[] = this.chronologies.map(c => {if(c.checked){return c.chronologyId}else{return 0} })
    let tmpContextes: number[] = this.contextes.map(c => {if(c.checked){return c.contextId}else{return 0} })
    let tmpMotifs: number[] = this.motifs.map(c => {if(c.checked){return c.motifId}else{return 0} })


    /*let filteredFigurines: Figurine[] = Array.from(this.figurinesSetSearched)
    .filter( f =>{
      
      const indexChronology = this.chronologyMap!.get(f.chronology!.chronologyId);
      const indexContext = this.contextMap!.get(f.context!.contextId!);
      const indexMotif = this.motifMap!.get(f.motif!.motifId!);
      let potChronology: number = Math.pow(2,indexChronology!);
      let potContext: number = Math.pow(2,indexContext!);
      let potMotif: number = Math.pow(2,indexMotif!);
      return ((this.countChronology==0?true:(potChronology &= this.countChronology)) ) 
      && ((this.countContext==0?true:(potContext &= this.countContext))
      && ((this.countMotif==0)?true:(potMotif &= this.countMotif)))
    });*/
    let filteredFigurines: Figurine[] = Array.from(this.figurinesSetSearched)
    .filter( f =>{
      return  (this.countChronology>0) ?  tmpChonologies.includes(f.chronology!.chronologyId) :  true;
    }).filter( f =>{
      return  (this.countMotif>0) ?  this.checkMotifArray(tmpMotifs,f.motif):  true;
    }).filter ( f =>{
      return (this.countContext>0) ?  tmpContextes.includes(f.context!.contextId) :  true;
    });

    this.figurinesSetFiltered.clear();
    for(let f of filteredFigurines){
      this.figurinesSetFiltered.add(f);
    }

    this.doFinishViewObjects();

  }

  checkMotifArray (obj1:number[] ,obj2:Motif[]|undefined ): boolean{
    let found:boolean = false;
    obj2!.find(o => {
      if (obj1.includes(o.motifId))  found= true ;
    })
    
    return found;
  }

  onSaveQuery():void{
    const modalRef = this.modalService.open(QueryModalComponent);
    let tmpChonologies: number[] = this.chronologies.filter(c => {return c.checked ? true:false}).map(c => {return c.chronologyId} )
    let tmpContextes: number[] = this.contextes.filter(c => {return c.checked ? true:false}).map(c => {return c.contextId} )
    let tmpMotifs: number[] = this.motifs.filter(c => {return c.checked ? true:false}).map(c => {return c.motifId} )
        // @Input query
        modalRef.componentInstance.search = this.searchForm.get("search")?.value;
        modalRef.componentInstance.operator = this.searchForm.get("searchType")?.value;
        modalRef.componentInstance.chronology = tmpChonologies.join();
        modalRef.componentInstance.motif = tmpMotifs.join();
        modalRef.componentInstance.context = tmpContextes.join();
        
  }

}
