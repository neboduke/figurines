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
  figurinesSetFiltered = new Set<Figurine>();

  @ViewChild(MapComponent) 
  figurinesMap!: MapComponent;


  constructor(private figurineService: FigurineService, 
    private formBuilder: FormBuilder, 
    private contextService: ContextService) { }

  ngOnInit(): void {
    this.createForm();
    this.getFigurines();
    this.createMapLegend();
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }


  private getFigurines():void{
    this.figurineService.getFigurines().subscribe(
        responseData => {
            this.figurines = responseData;
            //this.filterPoints(this.figurines);
            this.searchFigurineForString("");
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

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


  private filterFigurines():void{

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
    this.searchFigurineForString(searchString);
  }



 
  private searchFigurineForString(searchString: string): void {  //Figurine[][]
   
    let searchItems:string[] = searchString.split(' ');
    this.figurinesSetFiltered.clear();
    let arr:Figurine[][] = searchItems.map(s =>{
      return this.figurines
      .filter(f => (
        f.materialDescription?.includes(s) || 
        f.descriptionIconography?.includes(s) || 
        f.descriptionIconology?.includes(s) ||
        f.keyword?.includes(s))
      )
    })
    
    for(let i=0; i< arr.length;i++){
      for(let a of arr[i]){
        this.figurinesSetFiltered.add(a);
      }

    }
    this.filterPoints (Array.from(this.figurinesSetFiltered));
    this.figurinesMap.addFigurinePlaceMarkers(this.points);
    
  }

}
