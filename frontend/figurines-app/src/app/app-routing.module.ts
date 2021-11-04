import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { CountryComponent } from './components/country/country.component';
import { LiteratureComponent } from './components/literature/literature.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  { path: 'chronology', component: ChronologyComponent},
  { path: 'location', component: LocationComponent },
  { path: 'country', component: CountryComponent },
  { path: 'literature', component: LiteratureComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
