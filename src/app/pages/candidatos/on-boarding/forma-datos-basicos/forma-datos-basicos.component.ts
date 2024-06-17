import { Component, OnInit, EventEmitter, OnDestroy, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Bancos } from 'src/app/models/catalogos/bancos';
import { Ciudades } from 'src/app/models/catalogos/ciudad';
import { EstadoCivil } from 'src/app/models/catalogos/estado-civil';
import { Estados } from 'src/app/models/catalogos/estados';
import { Generos } from 'src/app/models/catalogos/generos';
import { GradoEscolaridad } from 'src/app/models/catalogos/grado-escolaridad';
import { Paises } from 'src/app/models/catalogos/paises';
import { DatosBasicos } from 'src/app/models/onboarding/candidato';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { validarNumeroIMSS } from 'src/app/shared/utils/validate-numero-IMSS';
import { validarCURP } from 'src/app/shared/utils/validate-rfc';
@Component({
  selector: 'app-forma-datos-basicos',
  templateUrl: './forma-datos-basicos.component.html',
  styleUrls: ['./forma-datos-basicos.component.scss'],
})
export class FormaDatosBasicosComponent implements OnInit, OnDestroy {
  @Output() formaDatosBasicos = new EventEmitter<FormGroup>();
  @ViewChild(FormaDatosBasicosComponent)

  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();

  public forma: FormGroup;
  get f() {
    return this.forma.controls;
  }

  @Input() listaGeneros: Generos[] = [];
  textoBuscarGeneros: string = "";


  @Input() listaPaises: Paises[] = [];
  textoBuscarPaises: string = "";

  @Input() listaEstados: Estados[] = [];
  textoBuscarEstados: string = "";

  @Input() listaCiudad: Ciudades[] = [];
  textoBuscarCiudad: string = "";

  @Input() listaEstadosCiviles: EstadoCivil[] = [];
  estadoCivilChecked: boolean = false;

  @Input() listaBancos: Bancos[] = [];
  textoBuscarBancos: string = "";

  @Input() datosBasicosCandidato: DatosBasicos = new DatosBasicos();


  @Input() listaGradosEscolares: GradoEscolaridad[] = [];
  textoGradoEscolaridad: string = "";

  
  


  constructor(
    private formBuilder: FormBuilder,
    private ctx: ContextoService
  ) {



  }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      seguimientoCandidatoId: [0, Validators.nullValidator],
      codigo: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', Validators.nullValidator],
      apellidoMaterno: ['', Validators.nullValidator],
      generoDescripcion: ['', Validators.required],
      generoId: [null, Validators.required],
      fechaNacimiento: ['', Validators.required],
      paisId: [null, Validators.required],
      paisDescripcion: ['', Validators.required],
      estadoId: [null, Validators.required],
      estadoDescripcion: ['', Validators.required],
      ciudadId: [null, Validators.required],
      ciudadDescripcion: ['', Validators.required],
      estadoCivilId: [null, Validators.required],
      estadoCivilDescripcion: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      numeroTelefonico: ['', Validators.nullValidator],
      numeroIMSS: ['', [Validators.required]],
      curp:  ['', [Validators.required]],

      aplicaInfonavit: [null, Validators.required],
      numeroCreditoInfonavit: [{ value: '', disabled: true }, Validators.required],
      montoInfonavit: [{ value: '', disabled: true }, Validators.required],

      aplicaFonacot: [null, Validators.required],
      montoFonacot: [{ value: '', disabled: true }, Validators.required],



      rfc: ['', Validators.required],
      gradoEscolaridadId: [null, Validators.required],
      gradoEscolaridadDescripcion: [null, Validators.required],

      universidad: ['', Validators.nullValidator],
      bancoId: [null, Validators.required],
      bancoDescripcion: ['', Validators.required],
      clabe: [null, Validators.required],
      cuenta: [null, Validators.required],
      formularioCompletado: [null],
    });
  

  }

  async ngAfterViewInit(): Promise<void> {



  }

  ngOnDestroy(): void { }

  //#region generos
  buscarGenero(texto: any) {
    this.textoBuscarGeneros = texto.target.value;
  }

  async limpiarSeleccionGenero(): Promise<void> {
    this.forma.get("generoId").setValue(null);
    this.forma.get("generoDescripcion").setValue(null);
  }

  generoSeleccionado(model: Generos) {
    this.f["generoId"].setValue(model.id);
    this.f["generoDescripcion"].setValue(model.descripcion);
  }

  //#endregion

  //#region Paises
  buscarPais(texto: any) {
    this.textoBuscarPaises = texto.target.value;
  }


  async cargarPaises() {
    let resultado = await this.ctx.paises.getAll();
    if (resultado.isSuccess) {
      this.listaPaises = resultado.data;
    }
  }

  async cargarEstados() {
    let resultado = await this.ctx.estados.getAll();
    if (resultado.isSuccess) {
      this.listaEstados = resultado.data;
    }
  }

  async cargarMunicipios() {
    let resultado = await this.ctx.ciudades.getAll();
    if (resultado.isSuccess) {
      this.listaCiudad = resultado.data;
    }
  }

  async limpiarSeleccionPais(): Promise<void> {
    this.forma.get("paisId").setValue(null);
    this.forma.get("paisDescripcion").setValue(null);
    this.limpiarSeleccionEstado();
    this.limpiarSeleccionCiudad();
    await this.cargarPaises();
  }

  paisSeleccionado(model: Paises) {
    this.f["paisId"].setValue(model.id);
    this.f["paisDescripcion"].setValue(model.descripcion);
 
    debugger;
    this.listaEstados = this.listaEstados.filter(e => e.paisId == model.id);

  }

  //#endregion

  //#region  Estados
  buscarEstado(texto: any) {
    this.textoBuscarEstados = texto.target.value;
  }

  async limpiarSeleccionEstado(): Promise<void> {
    this.forma.get("estadoId").setValue(null);
    this.forma.get("estadoDescripcion").setValue(null);
    await this.cargarEstados();
  }

  estadoSeleccionado(model: Estados) {
    this.f["estadoId"].setValue(model.id);
    this.f["estadoDescripcion"].setValue(model.descripcion);
    this.listaCiudad = this.listaCiudad.filter(e => e.estadoId == model.id);
  }
  //#endregion

  //#region Ciudad
  buscarCiudad(texto: any) {
    this.textoBuscarCiudad = texto.target.value;
  }

  async limpiarSeleccionCiudad(): Promise<void> {
    this.forma.get("ciudadId").setValue(null);
    this.forma.get("ciudadDescripcion").setValue(null);
    await this.cargarMunicipios();
  }

  ciudadSeleccionado(model: Ciudades) {
    this.f["ciudadId"].setValue(model.id);
    this.f["ciudadDescripcion"].setValue(model.descripcion);

  }



  //#endregion



  estadoCivilSeleccionado(model: any) {
    let m = model.value as EstadoCivil;
    this.f["estadoCivilId"].setValue(m.id);
    this.f["estadoCivilDescripcion"].setValue(m.descripcion);
  }

  validarEmail() {
    const emailControl = this.forma.get('correoElectronico');
    if (emailControl.hasError('email') && emailControl.dirty) {
      return 'Correo electrónico no válido';
    }
    return null;
  }


  aplicaInfonavit(model: any) {
    let m = model.value as string;
    this.f["aplicaInfonavit"].setValue(m == "1" ? true : false);

    if (m == "1") {
      this.f["numeroCreditoInfonavit"].enable();
      this.f["montoInfonavit"].enable();
      this.f["numeroCreditoInfonavit"].setValue("");
      this.f["montoInfonavit"].setValue("");



      this.forma.get('numeroCreditoInfonavit').setValidators([Validators.required]);
      this.forma.get('montoInfonavit').setValidators([Validators.required]);
    } else {
      this.f["numeroCreditoInfonavit"].disable();
      this.f["montoInfonavit"].disable();
      this.f["numeroCreditoInfonavit"].setValue("");
      this.f["montoInfonavit"].setValue("");

      this.forma.get('numeroCreditoInfonavit').setValidators([Validators.nullValidator]);
      this.forma.get('montoInfonavit').setValidators([Validators.nullValidator]);

    }
    this.forma.get('montoInfonavit').updateValueAndValidity();
    this.forma.get('numeroCreditoInfonavit').updateValueAndValidity();



  }


  aplicaFonacot(model: any) {
    let m = model.value as string;
    this.f["aplicaFonacot"].setValue(m == "1" ? true : false);

    if (m == "1") {
      this.f["montoFonacot"].enable();
      this.f["montoFonacot"].setValue("");

      this.forma.get('montoFonacot').setValidators([Validators.required]);
    } else {
      this.f["montoFonacot"].disable();

      this.forma.get('montoFonacot').setValidators([Validators.nullValidator]);

    }
    this.forma.get('montoFonacot').updateValueAndValidity();

  }


  //#region Bancos
  buscarBancos(texto: any) {
    this.textoBuscarPaises = texto.target.value;
  }
  async limpiarSeleccionBanco(): Promise<void> {
    this.forma.get("bancoId").setValue(null);
    this.forma.get("bancoDescripcion").setValue(null);
  }

  bancoSeleccionado(model: Bancos) {
    this.f["bancoId"].setValue(model.id);
    this.f["bancoDescripcion"].setValue(model.descripcion);
  }
  //#endregion



  //#region Grados Escolaridad
  buscarGradoEscolaridad(texto: any) {
    this.textoGradoEscolaridad = texto.target.value;
  }
  async limpiarSeleccionGradoEscolaridad(): Promise<void> {
    this.forma.get("gradoEscolaridadId").setValue(null);
    this.forma.get("gradoEscolaridadDescripcion").setValue(null);
  }

  gradoEscolSeleccionado(model: GradoEscolaridad) {
    this.f["gradoEscolaridadId"].setValue(model.id);
    this.f["gradoEscolaridadDescripcion"].setValue(model.descripcion);
  }
  //#endregion


}
