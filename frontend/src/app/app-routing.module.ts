import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { CountryComponent } from './components/country/country.component';
import { FigurineEditComponent } from './components/figurines/figurine/figurine-edit/figurine-edit.component';
import { FigurineComponent } from './components/figurines/figurine/figurine.component';
import { FigurinesComponent } from './components/figurines/figurines.component';
import { LiteratureComponent } from './components/literature/literature.component';
import { LocationComponent } from './components/location/location.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'figurines', pathMatch: 'full' },

  { path: 'chronology', component: ChronologyComponent},
  { path: 'location', component: LocationComponent },
  { path: 'country', component: CountryComponent },
  { path: 'literature', component: LiteratureComponent },
  { path: 'figurine', component: FigurineComponent },
  { path: 'figurine/:id', component: FigurineComponent },
  { path: 'figurine/cnr/:cnr', component: FigurineComponent },
  { path: 'figurines', component: FigurinesComponent },
  { path: 'figurine/edit/:id', component: FigurineEditComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
