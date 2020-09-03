import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { from } from 'rxjs';

import {WelcomeComponent} from './components/welcome/welcome.component';
import {CotizacionComponent} from './components/cotizacion/cotizacion.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'cotizar', component: CotizacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
