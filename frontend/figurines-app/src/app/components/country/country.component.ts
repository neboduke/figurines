import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/entity/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public countries: Country[] = [];
    

    constructor(private countryService: CountryService) { }

    ngOnInit(){
        this.getCountries();
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
