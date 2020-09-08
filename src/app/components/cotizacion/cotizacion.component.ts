import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExamenGeneralService } from '../../services/examenGeneral/examen-general.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

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

  total: number = 0.0;
  subtotal: number = 0.0;
  descuento: number = 0.0;

  constructor(private _formBuilder: FormBuilder, private examenGeneralService: ExamenGeneralService) { }

  ngOnInit() {

    this.getAllExamenGeneral();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdFormGroup: ['', Validators.required]
    })

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
  obtenerExamenGeneral(name){
    for(var index in this.ExamenGeneral){
      if(this.ExamenGeneral[index].nombre == name){
        var seleccion = {
          ID: this.ExamenGeneral[index].examenGeneralId,
          NOMBRE: this.ExamenGeneral[index].nombre,
          PRECIO: this.ExamenGeneral[index].precio
        }

        this.subtotal += this.ExamenGeneral[index].precio;
        this.ExamenGeneralSeleccionado.push(seleccion);
        console.log(this.ExamenGeneralSeleccionado);
        break;
      }
    }
  }

 //Complementos

 removerExamenGeneral(examenId) {
  console.log(examenId);
  Swal.fire({
    title: 'Estas seguro?',
    text: "Esto no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      var index = this.ExamenGeneralSeleccionado.map(function (est) { return est.ID; }).indexOf(examenId);
      this.subtotal -= this.ExamenGeneralSeleccionado[index].PRECIO;
      this.ExamenGeneralSeleccionado.splice(index, 1);
      Swal.fire(
        'Eliminado!',
        'El estudio fue eliminado',
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
