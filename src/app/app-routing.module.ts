import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';

import {WelcomeComponent} from './components/welcome/welcome.component';
import {CotizacionComponent} from './components/cotizacion/cotizacion.component';
import {CitaComponent} from './components/cita/cita.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'cotizar', component: CotizacionComponent },
  {path: 'cita', component: CitaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
