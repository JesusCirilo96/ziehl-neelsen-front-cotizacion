import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';//<--------------Needs to delete error in routing
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//-------------->Para poder enlazar con los modelos 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular
import {MatStepperModule} from '@angular/material/stepper';
import {MaterialModule} from './MaterialModule';

//components
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CitaComponent } from './components/cita/cita.component';

@NgModule({
  declarations: [
    AppComponent,
    CotizacionComponent,
    WelcomeComponent,
    CitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,//añadir para los formGruoups
    MatStepperModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
