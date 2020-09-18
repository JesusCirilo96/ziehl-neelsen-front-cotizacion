import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'

//Services
import { ExamenGeneralService } from '../../services/examenGeneral/examen-general.service';
import { DescuentoService } from '../../services/descuento/descuento.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //autocomplete examen general
  examenGeneral: any = [];
  controExamenGeneral = new FormControl();
  optionsGeneral: string[] = this.examenGeneral;
  filteredOptionsGeneral: Observable<string[]>;

  //accordion
  step = 0;



  //examenes generales selecionados
  ExamenGeneralSeleccionado: any = [];
  //Se almacenan los examenes generales
  ExamenGeneral: any = [];
  //examenes generales selecionados
  ExamenSencilloSeleccionado: any = [];

  //Descuento examen

  DescuentoExamen: any = [];

  total: number = 0.0;
  subtotal: number = 0.0;
  descuento: number = 0.0;

  constructor(
    private _formBuilder: FormBuilder,
    private examenGeneralService: ExamenGeneralService,
    private descuentoService: DescuentoService
  ) { }

  ngOnInit() {

    this.getAllExamenGeneral();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.filteredOptionsGeneral = this.controExamenGeneral.valueChanges.pipe(
      startWith(''),
      map(value => this._filterExamenGeneral(value))
    );
  }

  //obtener todos los examenes generales
  private getAllExamenGeneral() {
    this.examenGeneralService.obtenerExamenesGenerales().subscribe(
      response => {
        console.log(response);
        this.examenGeneralToAutocomplete(response);
        this.ExamenGeneral = response;
      },
      error => {
        console.log(error);

      }
    )
  }

  //obtenemos el examen general buscando por el nombre
  obtenerExamenGeneral(name) {
    for (var index in this.ExamenGeneral) {
      if (this.ExamenGeneral[index].nombre == name) {
        var existe = false;
        for (var indice in this.ExamenGeneralSeleccionado) {
          if (this.ExamenGeneralSeleccionado[indice].NOMBRE === name) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ya has seleccionado este examen',
              footer: '<a href>¿Tienes alguna duda?</a>'
            })
            existe = true;
            break;
          } 
        }
        if(!existe) {
          var descuento = [];

          this.descuentoService.descuentoExamen(this.ExamenGeneral[index].examenGeneralId).subscribe(
            respuesta => {

              var totalDescuento = 0.0;

              if (respuesta['descuento'] !== null) {
                if (respuesta['descuento'][0] !== undefined) {
                  descuento.push({
                    NOMBRE: respuesta['descuento'][0].nombre,
                    PORCENTAJE: respuesta['descuento'][0].porcentajeDescuento,
                    DESCUENTO: respuesta['descuento'][0].descuento
                  })

                  totalDescuento = descuento[0].DESCUENTO;
                }
              }

              var seleccion = {
                ID: this.ExamenGeneral[index].examenGeneralId,
                NOMBRE: this.ExamenGeneral[index].nombre,
                PRECIO: this.ExamenGeneral[index].precio,
                DESCUENTO: descuento
              }

              this.descuento += totalDescuento;
              this.subtotal += this.ExamenGeneral[index].precio;
              var totalLocal = this.subtotal - this.descuento;
              this.total = totalLocal;

              this.ExamenGeneralSeleccionado.push(seleccion);
            },
            error => {
              console.log(error)
            }
          )
        }

        break;
      }
    }
  }

  //Complementos

  removerExamenGeneral(examenId) {
    console.log(examenId);
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var index = this.ExamenGeneralSeleccionado.map(function (est) { return est.ID; }).indexOf(examenId);

        var precio = this.ExamenGeneralSeleccionado[index].PRECIO;
        var descuento = 0.0;
        if(this.ExamenGeneralSeleccionado[index].DESCUENTO[0] !== undefined){
          descuento = this.ExamenGeneralSeleccionado[index].DESCUENTO[0].DESCUENTO;
        }
        
        console.log("EL PRECIO A REMOVER==> " + precio);
        console.log("EL DESCUENTO A REMOVER==> " + descuento )

        this.subtotal -= precio;
        this.descuento -= descuento;

        this.total = this.subtotal - this.descuento;

        this.ExamenGeneralSeleccionado.splice(index, 1);
        Swal.fire(
          'Eliminado',
          'El examen fue eliminado',
          'success'
        )
      }
    })
  }

  //convertimos los datos obtenidos a autocomplete
  private examenGeneralToAutocomplete(examenGeneral) {
    for (var index in examenGeneral) {
      this.examenGeneral.push(examenGeneral[index].nombre);
    }
  }

  //filter autocomplete
  private _filterExamenGeneral(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsGeneral.filter(optionGen => optionGen.toLowerCase().includes(filterValue));
  }

  //steps of accordion
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
