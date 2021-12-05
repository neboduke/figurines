import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbActiveModal,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FigurinesComponent } from './components/figurines/figurines.component';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { ChronologyModalComponent } from './components/chronology/chronology-modal/chronology-modal.component';
import { ChronologyService } from './services/chronology.service';
import { FigurineService } from './services/figurine.service';
import { LocationService } from './services/location.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './common/toast/toast.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SortableDirective } from './directives/sortable.directive';
import { LocationComponent } from './components/location/location.component';
import { LocationModalComponent } from './components/location/location-modal/location-modal.component';
import { CountryComponent } from './components/country/country.component';
import { LiteratureService } from './services/literature.service';{}
import { LiteratureComponent } from './components/literature/literature.component';
import { LiteratureModalComponent } from './components/literature/literature-modal/literature-modal.component';
import { FigurineEditComponent } from './components/figurines/figurine/figurine-edit/figurine-edit.component';
import { FigurineComponent } from './components/figurines/figurine/figurine.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    FigurinesComponent,
    ChronologyComponent,
    ToastComponent,
    LoaderComponent,
    ChronologyModalComponent,
    SortableDirective,
    LocationComponent,
    LocationModalComponent,
    CountryComponent,
    LiteratureComponent,
    LiteratureModalComponent,
    FigurineEditComponent,
    FigurineComponent,
    FileUploadComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RxReactiveFormsModule,
    CommonModule,
    NgSelectModule
  ],
  providers: [ChronologyService,FigurineService,LocationService, LiteratureService, FigurineService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
