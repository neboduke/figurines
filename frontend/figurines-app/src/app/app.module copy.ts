import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FigurinesComponent } from './components/figurines/figurines.component';
import { ChronologyComponent } from './components/chronology/chronology.component';
import { ChronologyService } from './services/chronology.service';
import { FigurineService } from './services/figurine.service';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './common/toast/toast.component';
import { LoaderComponent } from './common/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    FigurinesComponent,
    ChronologyComponent,
    ToastComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChronologyService,FigurineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
