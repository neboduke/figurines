import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  { path: 'chronology', component: ChronologyComponent},
  { path: 'location', component: LocationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
