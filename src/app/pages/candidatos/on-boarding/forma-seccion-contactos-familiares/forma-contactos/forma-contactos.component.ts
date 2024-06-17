import { Component, OnInit, EventEmitter, OnDestroy, ViewChild, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { line } from 'd3-shape';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Parentescos } from 'src/app/models/catalogos/parentescos';
import { RelacionParental } from 'src/app/models/catalogos/relacion-parental';
import { Contactos } from 'src/app/models/onboarding/contactos';
import { Familiar } from 'src/app/models/onboarding/familiares';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-forma-contactos',
  templateUrl: './forma-contactos.component.html',
  styleUrls: ['./forma-contactos.component.scss'],
})
export class FormaContactosComponent implements OnInit, OnDestroy {
  @Output() formaContacto = new EventEmitter<FormGroup>();
  @ViewChild(FormaContactosComponent)

  subsGuardar: Subscription;

  @Input() listaRelacionParental: RelacionParental[] = [];
  textoBuscarRelacionParental: string = "";
  contactos: Contactos[] = [];


  @Input() listaParentescos: Parentescos[] = [];
  textoBuscarParentesco: string = "";
  listaFamilias: Familiar[] = [];


  columnasMostradasContactos = [
    "noLinea",
    "relacion",
    "nombre",
    "celular",
    "telefonoTrabajo",
    "contactoEmergencia",
    "acciones",
  ];


  columnasMostradasFamiliares = [
    "noLinea",
    "parentesco",
    "nombre",
    "fechaNacimiento",
    "celular",
    "vive",
    "esBeneficiario",
    "acciones",
  ];



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fuenteDatosFamiliares: MatTableDataSource<Familiar> =
    new MatTableDataSource<Familiar>([]);


  fuenteDatosContactos: MatTableDataSource<Contactos> =
    new MatTableDataSource<Contactos>([]);

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
    this.cargarContactos();
    this.cargarFamiliares();
  }

  ngAfterViewInit(): void {
    this.fuenteDatosFamiliares = new MatTableDataSource<Familiar>(this.listaFamilias);
    this.fuenteDatosFamiliares.paginator = this.paginator;
    this.fuenteDatosFamiliares.sort = this.sort;

    this.fuenteDatosContactos = new MatTableDataSource<Contactos>(this.contactos);
    this.fuenteDatosContactos.paginator = this.paginator;
    this.fuenteDatosContactos.sort = this.sort;
  }
  ngOnDestroy(): void { }


  //#region   REGION CONTACTOS

  cargarContactos() {
    if (this.contactos.length === 0) {
      this.contactos = [{
        id: 0,
        linea: 1,
        nombre: "",
        relacionId: 0,
        relacionDescripcion: "",
        celular: "",
        telefonoTrabajo: "",
        esContactoEmergencia: false,
        agregarNuevo: false,
        seguimientoCandidatoId: 0,
        datosModificado: false
      }];

      this.fuenteDatosContactos = new MatTableDataSource<Contactos>(this.contactos);
      this.fuenteDatosContactos.paginator = this.paginator;
      this.fuenteDatosContactos.sort = this.sort;
    }  
  }

  actualizaLinea(
    linea: number,
    nombre?: string,
    relacionId?: number,
    relacionDescripcion?: string,
    celular?: string,
    telefonoTrabajo?: string,
    esContactoEmergencia?: boolean
  ) {
    const modelo = this.fuenteDatosContactos.data.find((e) => e.linea == linea);
    modelo.id = modelo.id;
    modelo.nombre = nombre;
    modelo.relacionId = relacionId;
    modelo.relacionDescripcion = relacionDescripcion;
    modelo.celular = celular;
    modelo.telefonoTrabajo = telefonoTrabajo;
    modelo.esContactoEmergencia = esContactoEmergencia;
  
    if (
      modelo.nombre != "" &&
      modelo.relacionId > 0 &&
      modelo.relacionDescripcion != "" &&
      modelo.celular != "" &&
      modelo.telefonoTrabajo != "") {
      modelo.agregarNuevo = true;
   
    } else {
      modelo.agregarNuevo = false;
    }
    let data = this.fuenteDatosContactos.data;
    data.forEach(cont => { cont.datosModificado = true });
    this.fuenteDatosContactos.data = [...data];
  }


  agregarLinea() {
    const contacto: Contactos = {
      id: 0,
      linea: this.fuenteDatosContactos.data.length + 1,
      nombre: "",
      relacionId: 0,
      relacionDescripcion: "",
      celular: "",
      telefonoTrabajo: "",
      esContactoEmergencia: false,
      agregarNuevo: false,
      seguimientoCandidatoId: 0,
      datosModificado: false,
    };

    let contactos = this.fuenteDatosContactos.data;
    if (contactos.length > 0) {
      contactos.forEach(cont => { cont.datosModificado = true });
    }
    contactos.push(contacto);
    this.fuenteDatosContactos.data = [...contactos];
  }

  removerLinea(linea: number) {
    if (linea) {
      let contactos = this.fuenteDatosContactos.data;
      if (contactos.length > 1) {
        contactos.splice(linea - 1, 1);
        contactos.forEach((element, index) => {
          element.linea = index + 1;
          element.datosModificado = true;
        });
        this.fuenteDatosContactos.data = [...contactos];
      }
    }
  
  }


  buscarRelacionParental(texto: any) {
    this.textoBuscarRelacionParental = texto.target.value;
  }

  limpiarSeleccionRelacionParental(linea: number) {
    const contacto = this.fuenteDatosContactos.data.find((e) => e.linea === linea);
    if (contacto) {
      contacto.relacionId = 0;
      contacto.relacionDescripcion = "";
      this.fuenteDatosContactos.data = [...this.fuenteDatosContactos.data];
    }
  }

  relacionParentalSeleccionado(linea: number, modelo: RelacionParental) {
    const contacto = this.fuenteDatosContactos.data.find((e) => e.linea === linea);
    if (contacto) {
      contacto.relacionId = modelo.id;
      contacto.relacionDescripcion = modelo.descripcion;
      this.fuenteDatosContactos.data = [...this.fuenteDatosContactos.data];
    }
  }
  //#endregion

  //#region  REGION FAMILIARES 
  cargarFamiliares() {
    
    if (this.listaFamilias.length === 0) {
      this.listaFamilias = [{
        id: 0,
        linea: 1,
        parentescoId: 0,
        parentescoDescripcion: "",
        nombre: "",
        fechaNacimiento: null,
        vive: false,
        celular: "",
        esBeneficiario: false,
        agregarNuevo: false,
        seguimientoCandidatoId: 0,
        datosModificado: false
      }];
      this.fuenteDatosFamiliares = new MatTableDataSource<Familiar>(this.listaFamilias);
      this.fuenteDatosFamiliares.paginator = this.paginator;
      this.fuenteDatosFamiliares.sort = this.sort;
    }
  }

  actualizaLineaFamiliares(
    linea: number,
    parentescoId?: number,
    parentescoDescripcion?: string,
    nombre?: string,
    fechaNacimiento?: string,
    vive?: boolean,
    celular?: string,
    esBeneficiario?: boolean
  ) {
    const modelo = this.fuenteDatosFamiliares.data.find((e) => e.linea == linea);
    modelo.id = modelo.id;
    modelo.parentescoId = parentescoId;
    modelo.parentescoDescripcion = parentescoDescripcion;
    modelo.nombre = nombre;
    modelo.fechaNacimiento = fechaNacimiento ? new Date(fechaNacimiento) : null;
    modelo.vive = vive;
    modelo.celular = celular;
    modelo.esBeneficiario = esBeneficiario;


    if (
      modelo.nombre != "" &&
      modelo.parentescoId > 0 &&
      modelo.parentescoDescripcion != "" &&
      modelo.celular != "" &&
      modelo.nombre != "" &&
      modelo.fechaNacimiento != null) {
      modelo.agregarNuevo = true;
    } else {
      modelo.agregarNuevo = false;
    }

    let data = this.fuenteDatosFamiliares.data;
    data.forEach(fams => { fams.datosModificado = true });
    this.fuenteDatosFamiliares.data = [...data];
  }

  agregarLineaFamiliares() {

    const familiar: Familiar = {
      id: 0,
      linea: this.fuenteDatosFamiliares.data.length + 1,
      parentescoId: 0,
      parentescoDescripcion: "",
      nombre: "",
      fechaNacimiento: null,
      vive: false,
      celular: "",
      esBeneficiario: false,
      agregarNuevo: false,
      seguimientoCandidatoId: 0,
      datosModificado: false


    };
   

    let familiares = this.fuenteDatosFamiliares.data;
    if (familiares.length > 0) {
      familiares.forEach(fam => { fam.datosModificado = true });
    }
    familiares.push(familiar);
    this.fuenteDatosFamiliares.data = [...familiares];
  }

  removerLineaFamiliares(linea: number) {
    if (linea) {
      let familiares = this.fuenteDatosFamiliares.data;
      if (familiares.length > 1) {
        familiares.splice(linea - 1, 1);
        familiares.forEach((element, index) => {
          element.linea = index + 1;
          element.datosModificado = true;
        });
        this.fuenteDatosFamiliares.data = [...familiares];
      }
    }
  }

  buscarParentesco(texto: any) {
    this.textoBuscarParentesco = texto.target.value;
  }

  limpiarSeleccionParentesco(linea: number) {
    const familiar = this.fuenteDatosFamiliares.data.find((e) => e.linea === linea);
    if (familiar) {
      familiar.parentescoId = 0;
      familiar.parentescoDescripcion = "";
      this.fuenteDatosFamiliares.data = [...this.fuenteDatosFamiliares.data];
    }
  }

  parentescoSeleccionado(linea: number, modelo: Parentescos) {

    const familiar = this.fuenteDatosFamiliares.data.find((e) => e.linea === linea);
    if (familiar) {
      familiar.parentescoId = modelo.id;
      familiar.parentescoDescripcion = modelo.descripcion;
      this.fuenteDatosFamiliares.data = [...this.fuenteDatosFamiliares.data];
    }
  }
  //#endregion
}
