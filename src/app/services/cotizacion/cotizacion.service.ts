import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Cotizacion} from '../../models/Cotizacion';
import { Observable } from 'rxjs';
import {Url} from 'src/assets/Url';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  API_URI = Url.API_ENDPOINT;

  constructor(private http:HttpClient) { 
 
  }

  guardarCotizacion(cotizacion: Cotizacion){
    return this.http.post(`${this.API_URI}/cotizacion/save`, cotizacion);
  }
  
}
