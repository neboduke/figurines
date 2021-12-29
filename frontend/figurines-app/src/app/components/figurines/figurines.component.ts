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
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { ChronologyService } from 'src/app/services/chronology.service';
import { CountryService } from 'src/app/services/country.service';
import { MotifService } from 'src/app/services/motif.service';
import { Country } from 'src/app/entity/country';
import { Motif } from 'src/app/entity/motif';
import { Chronology } from 'src/app/entity/chronology';

@Component({
  selector: 'app-figurines',
  templateUrl: './figurines.component.html',
  styleUrls: ['./figurines.component.css']
})
export class FigurinesComponent implements OnInit {
  figurines: Figurine[] = [];
  figurinesToShow : Figurine[] = [];
  searchForm!: FormGroup;
  imageBaseUrl: string = environment.imageBaseUrl;
  points: FigurinePoint[] = [];
  mapLegend: MapLegend[] = [];
  contextes: Context[] = [];
  contextMap= new Map<number, number>() ;
  figurinesSetSearched = new Set<Figurine>();
  figurinesSetFiltered = new Set<Figurine>();

  countries: Country[] = [];
  motifs: Motif[] = [];
  motifMap= new Map<number, number>() ;
  chronologies: Chronology[] = [];
  chronologyMap= new Map<number, number>() ;

  countChronology: number = 0;
  countMotif: number = 0;
  countContext: number = 0;


  @ViewChild(MapComponent) 
  figurinesMap!: MapComponent;


  constructor(private figurineService: FigurineService, 
    private formBuilder: FormBuilder, 
    private contextService: ContextService,
    private chronologyService: ChronologyService,
    private countryService: CountryService,
    private motifService: MotifService) { }

  ngOnInit(): void {
    this.createForm();
    this.getFigurines();
    this.createMapLegend();
    this.getCountries();
    this.getMotifs();
    this.getChronologies();
    this.getContextes();
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      searchType: 1,
    });
  }

  /*--- SERVICES---*/
  private getFigurines():void{
    this.figurineService.getFigurines().subscribe(
        responseData => {
            this.figurines = responseData;
            //this.filterPoints(this.figurines);
            //this.setVisible(true);
            this.searchFigurineForString("",1);
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

  setVisible(show:boolean): void {
    for(let l of this.figurines){
      l.show = show;
    }
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
              this.mapMotifs();
              
          },
          (error: HttpErrorResponse) => {
              alert(error.message)
          }
      );
    }
    private mapMotifs():void{
      for(let i=0; i<  this.motifs.length; i++){
        this.motifMap?.set(this.motifs[i].motifId!,i)
      }
    }
    private getChronologies():void{
      this.chronologyService.getChronologies().subscribe(
          responseData => {
              this.chronologies = responseData;
              this.mapChronologies();
          },
          (error: HttpErrorResponse) => {
              alert(error.message)
          }
      );
    }
    private mapChronologies():void{
       for(let i=0; i<  this.chronologies.length; i++){
         this.chronologyMap?.set(this.chronologies[i].chronologyId,i)
       }
    }
    
    private getContextes():void{
      this.contextService.getContext().subscribe(
          responseData => {
              this.contextes = responseData;
              this.mapContext();
          },
          (error: HttpErrorResponse) => {
              alert(error.message)
          }
      );
    }
    private mapContext():void{
      for(let i=0; i<  this.contextes.length; i++){
        this.contextMap?.set(this.contextes[i].contextId!,i)
      }
    }
  
    /*--- END---*/


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
        point.url = "http://localhost:4200/figurine/"+f.figurineId;
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


  public search():void{
    let searchString:string = this.searchForm.get('search')?.value;
    let searchType:number = this.searchForm?.get('searchType')?.value;
    this.searchFigurineForString(searchString,searchType);
  }



  /* 
    * search all figurines for a search strings
    * searchString are one or more words, separated by ' '
    * 
  */
  private searchFigurineForString(searchString: string, searchType: number): void {  //Figurine[][]
   
    let searchItems:string[] = searchString.toLowerCase().split(' ');
    this.figurinesSetSearched.clear();
   
    let arr:Figurine[][] = this.filterSearchItems(searchItems); 
    
    for(let i=0; i< arr.length;i++){
        for(let a of arr[i]){
          //if(searchType==1){
            this.figurinesSetSearched.add(a)
            this.figurinesSetFiltered.add(a);
          /*}*/
        }
    }
    this.useFilter()

  }

  private filterSearchItems(searchItems: string[]): Figurine[][]{
      return searchItems.map(s =>{
        return this.figurines
        .filter(f => (
          f.title?.toLowerCase().includes(s) ||
          f.materialDescription?.toLowerCase().includes(s) || 
          f.descriptionIconography?.toLowerCase().includes(s) || 
          f.descriptionIconology?.toLowerCase().includes(s) ||
          f.keyword?.toLowerCase().includes(s))
        )
      })
  }

  private doFinishViewObjects(arr?:Figurine[]):void {
    
    //this.filterFigurines();

    this.filterPoints (Array.from(this.figurinesSetFiltered));
    if(this.figurinesMap != null) {
      this.figurinesMap.addFigurinePlaceMarkers(this.points);
    }
  }


  private filterFigurines(arr?:Figurine[]): void{
    this.setVisible(false);

    for(let f of this.figurines){
        for(let s of this.figurinesSetFiltered){
          if(f.figurineId == s.figurineId){
            f.show = true;
          }
        }
    }

  }


  doPotenz(p:number):number{
    return Math.pow(2,p);
  }

  /*
    * 

  */
  onChronology(e:any): void{
    let cid:number = e.target.value;
    let checked: boolean = e.target.checked;

    if(checked){
      this.countChronology = +this.countChronology + +cid ;
    }else{
      this.countChronology = this.countChronology - cid;
    }

    this.useFilter();
  }

  /*
    * 

  */
  onContext(e:any): void{
    let cid:number = e.target.value;
    let checked: boolean = e.target.checked;

    if(checked){
      this.countContext = +this.countContext + +cid ;
    }else{
      this.countContext = this.countContext - cid;
    }
    this.useFilter();
  }

  /*
    * 

  */
  onMotif(e:any): void{
    let cid:number = e.target.value;
    let checked: boolean = e.target.checked;

    if(checked){
      this.countMotif = +this.countMotif + +cid ;
    }else{
      this.countMotif = this.countMotif - cid;
    }
    this.useFilter();
  }

  private useFilter():void{
    let filteredFigurines: Figurine[] = Array.from(this.figurinesSetSearched)
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
    });
    this.figurinesSetFiltered.clear();
    for(let f of filteredFigurines){
      this.figurinesSetFiltered.add(f);
    }

    this.doFinishViewObjects();

  }

}
