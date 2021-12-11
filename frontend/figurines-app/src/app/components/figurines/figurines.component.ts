import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Figurine } from 'src/app/entity/figurine';
import { FigurineService } from 'src/app/services/figurine.service';
import { environment } from 'src/environments/environment';
import * as geojson from 'geojson';
import { FigurinePoint } from 'src/app/entity/figurine-point';
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

  constructor(private figurineService: FigurineService) { }

  ngOnInit(): void {
    this.getFigurines();
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
      var chrono: string = f.chronology!.name.substr(0,2).toLowerCase();
      var contx: string = f.context!.title!.toLowerCase();
      point!.icon = contx+"-"+chrono+".svg";
      point.url = "http://localhost:4200/figurine/"+f.figurineId;
      this.points.push(point);
    }
  }

  private filterFigurines():void{

  }

}
