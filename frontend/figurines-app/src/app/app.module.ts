import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FigurinesComponent } from './components/figurines/figurines.component';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { ChronologyService } from './services/chronology.service';
import { FigurineService } from './services/figurine.service';

@NgModule({
  declarations: [
    AppComponent,
    FigurinesComponent,
    ChronologyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChronologyService,FigurineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
