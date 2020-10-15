import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//<--------------Needs to delete error in routing
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//-------------->Para poder enlazar con los modelos 
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { NgxPrintModule } from 'ngx-print';//impresion


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PDF
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

//angular
import {MatStepperModule} from '@angular/material/stepper';
import {MaterialModule} from './MaterialModule';

//components
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CitaComponent } from './components/cita/cita.component';
import { PaqueteExamenDialogComponent } from './components/paquete-examen-dialog/paquete-examen-dialog.component';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
 

@NgModule({
  declarations: [
    AppComponent,
    CotizacionComponent,
    WelcomeComponent,
    CitaComponent,
    PaqueteExamenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,//añadir para los formGruoups
    MatStepperModule,
    NgxPrintModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
