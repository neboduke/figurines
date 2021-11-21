import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Figurine } from 'src/app/entity/figurine';
import { FigurineService } from 'src/app/services/figurine.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-figurines',
  templateUrl: './figurines.component.html',
  styleUrls: ['./figurines.component.css']
})
export class FigurinesComponent implements OnInit {
  figurines: Figurine[] = [];
  imageBaseUrl: string = environment.imageBaseUrl;

  constructor(private figurineService: FigurineService) { }

  ngOnInit(): void {
    this.getFigurines();
  }

  private getFigurines():void{
    this.figurineService.getFigurines().subscribe(
        responseData => {
            this.figurines = responseData;
        },
        (error: HttpErrorResponse) => {
            alert(error.message)
        }
    );
  }

}
