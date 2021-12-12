import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Figurine } from 'src/app/entity/figurine';
import { FigurineService } from 'src/app/services/figurine.service';
import { environment } from 'src/environments/environment';
import * as geojson from 'geojson';
import { FigurinePoint } from 'src/app/entity/figurine-point';
import { MapLegend } from 'src/app/entity/map-legend';
import { Context } from 'src/app/entity/context';
import { ContextService } from 'src/app/services/context.service';
import { point } from 'leaflet';

@Component({
  selector: 'app-figurines',
  templateUrl: './figurines.component.html',
  styleUrls: ['./figurines.component.css']
})
export class FigurinesComponent implements OnInit {
  figurines: Figurine[] = [];
  imageBaseUrl: string = environment.imageBaseUrl;
  points: FigurinePoint[] = [];
  mapLegend: MapLegend[] = [];
  contextes: Context[] = [];


  constructor(private figurineService: FigurineService, 
    private contextService: ContextService) { }

  ngOnInit(): void {
    this.getFigurines();
    this.createMapLegend();
  }


  private getFigurines():void{
    this.figurineService.getFigurines().subscribe(
        responseData => {
            this.figurines = responseData;
            this.filterPoints(this.figurines);
            
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

  private filterPoints(pfigurines:  Figurine[]){
    for(let f of pfigurines){
      var point: FigurinePoint = new FigurinePoint();
      point!.title = f.title!;
      point!.location = f.location?.name! ;
      point!.lat = Number.parseFloat(f.location?.coordinateLat!);
      point!.lng = Number.parseFloat(f.location?.coordinateLng!);
      var chrono: string = f.chronology!.name.substring(0,2).toLowerCase();
      var contx: string = f.context!.title!.toLowerCase();
      point!.icon = contx+"-"+chrono+".svg";
      point.url = "http://localhost:4200/figurine/"+f.figurineId;
      this.points.push(point);
    }
  }

  private filterFigurines():void{

  }

  private createMapLegend(): void {
    this.contextService.getContext().subscribe(
      responseData => {
          this.contextes = responseData;
          for(let c of this.contextes){
            var ml: MapLegend = new MapLegend();
            ml.text = c!.title!.toLowerCase();
            ml.icon = ml.text+".svg";
            this.mapLegend.push(ml);
            
          }
      },
      (error: HttpErrorResponse) => {
          alert(error.message)
      }
  );
    
  }

}
