import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Chronology } from "src/app/entity/chronology";
import { ChronologyService } from "src/app/services/chronology.service";

@Component({
    selector: 'app-chronology',
    templateUrl: './chronology.component.html',
    styleUrls: ['./chronology.component.css']
})
export class ChronologyComponent implements OnInit{
  

    public chronologies: Chronology[] = [];

    constructor(private chronologyService: ChronologyService) { }

    ngOnInit(){
        this.getChronologies();
    }

    public getChronologies():void{
        this.chronologyService.getChronologies().subscribe(
             responseData => {
                this.chronologies = responseData;
             },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        );
    }

    //getting modal window
    public onOpenModal( target: string , chronology?: Chronology):void {
        const container = document.getElementById('chronology_container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-bs-toggle','modal');
        button.setAttribute('data-bs-target', target);

        container?.appendChild(button);
        button.click();
    }
    
}