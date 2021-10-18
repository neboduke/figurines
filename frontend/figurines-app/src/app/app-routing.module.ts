import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { CountryComponent } from './components/country/country.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  { path: 'chronologyx', component: ChronologyComponent},
  { path: 'locationx', component: LocationComponent },
  { path: 'countryx', component: CountryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
