import { Component, OnInit, EventEmitter, OnDestroy, Input, ViewChild, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Ciudades } from 'src/app/models/catalogos/ciudad';
import { Estados } from 'src/app/models/catalogos/estados';
import { Generos } from 'src/app/models/catalogos/generos';
import { Paises } from 'src/app/models/catalogos/paises';
import { DireccionActual, DireccionFiscal } from 'src/app/models/onboarding/candidato';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-forma-direccion-actual',
  templateUrl: './forma-direccion-actual.component.html',
  styleUrls: ['./forma-direccion-actual.component.scss'],
})
export class FormaDireccionActualComponent implements OnInit, OnDestroy {
  @Output() formaDA = new EventEmitter<FormGroup>();
  @ViewChild(FormaDireccionActualComponent)

  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();


  formaDireccionFiscal: FormGroup;
  get fDF() {
    return this.formaDireccionFiscal.controls;
  }

  formaDireccionActual: FormGroup;
  get fDA() {
    return this.formaDireccionActual.controls;
  }


  @Input() listaPaises: Paises[] = [];
  textoBuscarPaisesActual: string = "";
  textoBuscarPaisesFiscal: string = "";


  @Input() listaEstados: Estados[] = [];
  textoBuscarEstadosActual: string = "";
  textoBuscarEstadosFiscal: string = "";


  @Input() listaCiudad: Ciudades[] = [];
  textoBuscarCiudadActual: string = "";
  textoBuscarCiudadFiscal: string = "";


  direccionFiscal: DireccionFiscal;
  direccionActual: DireccionActual;

  constructor(
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private activatedRouter: ActivatedRoute,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private router: Router,
    private refrescaMenu: ActualizaMenuUsuarioService
  ) {


  }

  ngOnInit(): void {

    this.formaDireccionActual = this.formBuilder.group({
      seguimientoCandidatoId: [0, Validators.nullValidator],
      calle: ['', Validators.required],
      noExterior: ['', Validators.required],
      noInterior: [null, Validators.nullValidator],
      codigoPostal: [null, Validators.required],
      direccionPaisId: [null, Validators.required],
      direccionPaisDescripcion: ['', Validators.required],
      direccionEstadoId: [null, Validators.required],
      direccionEstadoDescripcion: ['', Validators.required],
      direccionCiudadId: [null, Validators.required],
      direccionCiudadDescripcion: ['', Validators.required],
      colonia: ['', Validators.required],
      formularioCompletado: [null],
    });
    this.formaDireccionFiscal = this.formBuilder.group({
      seguimientoCandidatoId: [0, Validators.nullValidator],
      fiscalCalle: ['', [Validators.required]],
      fiscalNoExterior: ['', Validators.required],
      fiscalNoInterior: [null, Validators.nullValidator],
      fiscalCodigoPostal: [null, Validators.required],
      fiscalDireccionPaisId: [null, Validators.required],
      fiscalDireccionPaisDescripcion: ['', Validators.required],
      fiscalDireccionEstadoId: [null, Validators.required],
      fiscalDireccionEstadoDescripcion: ['', Validators.required],
      fiscalDireccionCiudadId: [null, Validators.required],
      fiscalDireccionCiudadDescripcion: ['', Validators.required],
      fiscalColonia: ['', Validators.required],
      formularioCompletado: [null],

    });
    // this.formaDireccionFiscal.disable();

  }

  ngAfterViewInit(): void {

  }




  ngOnDestroy(): void {



  }


  //#region PAISES, ENTIDADES, CIUDADES DE DATOS ACTUALES

  //#region Paises
  buscarPaisActual(texto: any) {
    this.textoBuscarPaisesActual = texto.target.value;
  }
  async limpiarSeleccionPaisActual(): Promise<void> {
    this.formaDireccionActual.get("direccionPaisId").setValue(null);
    this.formaDireccionActual.get("direccionPaisDescripcion").setValue(null);
  }

  paisSeleccionadoActual(model: Generos) {
    this.fDA["direccionPaisId"].setValue(model.id);
    this.fDA["direccionPaisDescripcion"].setValue(model.descripcion);
  }

  //#endregion

  //#region  Estados
  buscarEstadoActual(texto: any) {
    this.textoBuscarEstadosActual = texto.target.value;
  }

  async limpiarSeleccionEstadoActual(): Promise<void> {
    this.formaDireccionActual.get("direccionEstadoId").setValue(null);
    this.formaDireccionActual.get("direccionEstadoDescripcion").setValue(null);
  }

  estadoSeleccionadoActual(model: Generos) {
    this.fDA["direccionEstadoId"].setValue(model.id);
    this.fDA["direccionEstadoDescripcion"].setValue(model.descripcion);
  }
  //#endregion

  //#region Ciudad
  buscarCiudadActual(texto: any) {
    this.textoBuscarCiudadActual = texto.target.value;
  }

  async limpiarSeleccionCiudadActual(): Promise<void> {
    this.formaDireccionActual.get("direccionCiudadId").setValue(null);
    this.formaDireccionActual.get("direccionCiudadDescripcion").setValue(null);
  }

  ciudadSeleccionadoActual(model: Generos) {
    this.fDA["direccionCiudadId"].setValue(model.id);
    this.fDA["direccionCiudadDescripcion"].setValue(model.descripcion);
  }
  //#endregion

  //#endregion

  //#region PAISES, ENTIDADES, CIUDADES DE DATOS FISCALES

  //#region Paises
  buscarPaisFiscal(texto: any) {
    this.textoBuscarPaisesFiscal = texto.target.value;
  }
  async limpiarSeleccionPaisFiscal(): Promise<void> {
    this.formaDireccionFiscal.get("fiscalDireccionPaisId").setValue(null);
    this.formaDireccionFiscal.get("fiscalDireccionPaisDescripcion").setValue(null);
  }

  paisSeleccionadoFiscal(model: Generos) {
    this.fDF["fiscalDireccionPaisId"].setValue(model.id);
    this.fDF["fiscalDireccionPaisDescripcion"].setValue(model.descripcion);
  }

  //#endregion

  //#region  Estados
  buscarEstadoFiscal(texto: any) {
    this.textoBuscarEstadosFiscal = texto.target.value;
  }

  async limpiarSeleccionEstadoFiscal(): Promise<void> {
    this.formaDireccionFiscal.get("fiscalDireccionEstadoId").setValue(null);
    this.formaDireccionFiscal.get("fiscalDireccionEstadoDescripcion").setValue(null);
  }

  estadoSeleccionadoFiscal(model: Generos) {
    this.fDF["fiscalDireccionEstadoId"].setValue(model.id);
    this.fDF["fiscalDireccionEstadoDescripcion"].setValue(model.descripcion);
  }
  //#endregion

  //#region Ciudad
  buscarCiudadFiscal(texto: any) {
    this.textoBuscarCiudadFiscal = texto.target.value;
  }

  async limpiarSeleccionCiudadFiscal(): Promise<void> {
    this.formaDireccionFiscal.get("fiscalDireccionCiudadId").setValue(null);
    this.formaDireccionFiscal.get("fiscalDireccionCiudadDescripcion").setValue(null);
  }

  ciudadSeleccionadoFiscal(model: Generos) {
    this.fDF["fiscalDireccionCiudadId"].setValue(model.id);
    this.fDF["fiscalDireccionCiudadDescripcion"].setValue(model.descripcion);
  }
  //#endregion

  //#endregion



  habilitarFormDireccionFiscal(event: any) {

    if (event.checked) {

      this.copiarValores();
    } else {
      this.formaDireccionFiscal.reset();
      this.formaDireccionFiscal.updateValueAndValidity();
    }

  }

  copiarValores() {
    const valores = this.formaDireccionActual.value;
    this.formaDireccionFiscal.patchValue({
      fiscalCalle: valores.calle,
      fiscalNoExterior: valores.noExterior,
      fiscalNoInterior: valores.noInterior,
      fiscalCodigoPostal: valores.codigoPostal,
      fiscalDireccionPaisId: valores.direccionPaisId,
      fiscalDireccionPaisDescripcion: valores.direccionPaisDescripcion,
      fiscalDireccionEstadoId: valores.direccionEstadoId,
      fiscalDireccionEstadoDescripcion: valores.direccionEstadoDescripcion,
      fiscalDireccionCiudadId: valores.direccionCiudadId,
      fiscalDireccionCiudadDescripcion: valores.direccionCiudadDescripcion,
      fiscalColonia: valores.colonia,
    });
  }



}
