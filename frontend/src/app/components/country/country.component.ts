import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/entity/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @Input() countryFromOutside: Country | undefined;
  @Output() countryReturned: Country |undefined;

  public countries: Country[] = [];
    

    constructor(private countryService: CountryService) { }

    ngOnInit(){
        this.getCountries();
        if(this.countryFromOutside){
          
        }
    }

    public getCountries():void{
        this.countryService.getCountries().subscribe(
             responseData => {
                this.countries = responseData;
             },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        );
    }

}
