import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chronology } from './entity/chronology';
import { ChronologyService } from './service/chronology.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public chronologies: Chronology[] = [];

  constructor(private chronologyService: ChronologyService) { }

  ngOnInit(){
  
    this.getChronologies();
  }

  public getChronologies():void{
    this.chronologyService.getChronologies().subscribe(
      (response: Chronology[]) => {
        this.chronologies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
