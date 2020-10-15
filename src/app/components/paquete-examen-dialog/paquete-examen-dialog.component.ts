import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DescuentoService } from '../../services/descuento/descuento.service';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-paquete-examen-dialog',
  templateUrl: './paquete-examen-dialog.component.html',
  styleUrls: ['./paquete-examen-dialog.component.css']
})
export class PaqueteExamenDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private descuentoService: DescuentoService,) { }

  ngOnInit() {

    this.getAllPaqueteDescuento();

  }

  Paquete: any = [];

  //obtener todos los examenes generales
  private getAllPaqueteDescuento() {
    this.descuentoService.descuentoPaquete().subscribe(
      response => {
        console.log(response);
        this.Paquete = response;
      },
      error => {
        console.log(error);

      }
    )
  }

  
}
