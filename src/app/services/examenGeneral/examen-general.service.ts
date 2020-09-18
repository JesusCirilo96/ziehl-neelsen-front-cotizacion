import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Url} from 'src/assets/Url';

@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralService {

  API_URI = Url.API_ENDPOINT;

  constructor(private http:HttpClient) { 
 
  }

  /**
   * Se obtienen la lista de examenes generales
   */
  obtenerExamenesGenerales(){
    return this.http.get(`${this.API_URI}/examen/get/all`);
  }

  /**
   * Se obtiene el examen general por el nombre
   * @param name nombre del examen general a buscar
   */
  obtenerExamenGeneralNombre(name: string){
    return this.http.get(`${this.API_URI}/examen/get/name/${name}`);
  }
}
