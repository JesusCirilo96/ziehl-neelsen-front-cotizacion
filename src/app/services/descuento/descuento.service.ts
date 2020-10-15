import { Injectable } from '@angular/core';
import {Url} from 'src/assets/Url';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  API_URI = Url.API_ENDPOINT;

  constructor(private http:HttpClient) { 
 
  }

  /**
   * Consultar si el examen tiene descuento
   * @param id Id del examen
   */
  descuentoExamen(id: number){
    return this.http.get(`${this.API_URI}/examen/descuento/${id}`);
  }

  descuentoPaquete(){
    return this.http.get(`${this.API_URI}/paquete/descuento/all`);
  }


}
