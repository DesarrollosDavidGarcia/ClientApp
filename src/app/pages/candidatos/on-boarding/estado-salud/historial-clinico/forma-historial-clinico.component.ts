import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Parentescos } from 'src/app/models/catalogos/parentescos';
import { SintomasMedicos } from 'src/app/models/catalogos/sintomas-medicos';
import { HistorialClinicoFamiliar } from 'src/app/models/onboarding/enfermedades-familiares';
import { HistorialClinicoPersonal } from 'src/app/models/onboarding/enfermedades-personales';
import { SintomasCandidato } from 'src/app/models/onboarding/sintomas-candidatos';
import { ContextoService } from 'src/app/services/contexto.service';

@Component({
  selector: 'app-forma-historial-clinico',
  templateUrl: './forma-historial-clinico.component.html',
  styleUrls: ['./forma-historial-clinico.component.scss'],
})
export class FormaHistorialClinicoComponent implements OnInit, OnDestroy {
  @Output() formaHistorialClinicoComponent = new EventEmitter<FormGroup>();
  @ViewChild(FormaHistorialClinicoComponent)

  subsGuardar: Subscription;
  listaHistorialClinicoPersonal: HistorialClinicoPersonal[] = [];
  listaHistorialClinicoFamiliar: HistorialClinicoFamiliar[] = [];


  @Input() listaParentescos: Parentescos[] = [];
  @Input() listaSintomasMedicos: SintomasMedicos[] = [];


  sintomasSeleccionados: SintomasCandidato[] = [];
  @Output() sintomasCandidato = new EventEmitter<SintomasCandidato[]>();

  textoBuscarParentesco: string = "";
  columnasMostradasHistorialClinicoPersonal = [
    "noLinea",
    "enfermedad",
    "fechaSintomas",
    "tratamiento",
    "esSintomaActual",
    "acciones"
  ];


  columnasMostradasHistorialFamiliar = [
    "noLinea",
    "parentesco",
    "sintoma",
    "acciones"
  ];



  fuenteDatosHCP: MatTableDataSource<HistorialClinicoPersonal> =
    new MatTableDataSource<HistorialClinicoPersonal>([]);

  fuenteDatosHCF: MatTableDataSource<HistorialClinicoFamiliar> =
    new MatTableDataSource<HistorialClinicoFamiliar>([]);

  habilitaContenidoTablaHCP: boolean = false;
  habilitaContenidoTablaHCF: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ctx: ContextoService
  ) { }

  ngOnInit() {
    this.cargarHistorialClinicoPersonal();
    this.cargarHistorialClinicoFamiliar();



  }

  ngAfterViewInit(): void {
    this.fuenteDatosHCF = new MatTableDataSource<HistorialClinicoFamiliar>(this.listaHistorialClinicoFamiliar);
    this.fuenteDatosHCF.paginator = this.paginator;
    this.fuenteDatosHCF.sort = this.sort;

    this.fuenteDatosHCP = new MatTableDataSource<HistorialClinicoPersonal>(this.listaHistorialClinicoPersonal);
    this.fuenteDatosHCP.paginator = this.paginator;
    this.fuenteDatosHCP.sort = this.sort;



  }

  ngOnDestroy(): void {

  }




  //#region   REGION EVENTOS PARA TABLA DE HISTORIAL CLINICO PERSONAL

  cargarHistorialClinicoPersonal() {
    if (this.listaHistorialClinicoPersonal.length === 0) {
      this.listaHistorialClinicoPersonal = [{
        id: 0,
        linea: this.fuenteDatosHCP.data.length+1,
        enfermedad: '',
        esSintomaActual: false,
        fechaSintomas: null,
        tratamiento: '',
        seguimientoCandidatoId: 0,
        agregarNuevo: true,
        datosModificado: false
      }];

      this.fuenteDatosHCP = new MatTableDataSource<HistorialClinicoPersonal>(this.listaHistorialClinicoPersonal);
      this.fuenteDatosHCP.paginator = this.paginator;
      this.fuenteDatosHCP.sort = this.sort;
    }  
  }

  actualizaLineaHistorialClinicoPersonal(
    linea: number,
    enfermedad?: string,
    fechaSintomas?: string,
    esSintomaActual?: boolean,
    tratamiento?: string
  ) {
    const modelo = this.fuenteDatosHCP.data.find((e) => e.linea == linea);
    modelo.id = modelo.id;
    modelo.enfermedad = enfermedad;
    modelo.fechaSintomas = fechaSintomas ? new Date(fechaSintomas) : null;
    modelo.esSintomaActual = esSintomaActual;
    modelo.tratamiento = tratamiento;

    let data = this.fuenteDatosHCP.data;
    data.forEach(d => { d.datosModificado = true });
    this.fuenteDatosHCP.data = [...data];
  }


  agregarLineaHistorialClinicoPersonal() {


    const historialPersonal: HistorialClinicoPersonal = {
      id: 0,
      linea: this.fuenteDatosHCP.data.length + 1,
      enfermedad: '',
      esSintomaActual: false,
      fechaSintomas: null,
      tratamiento: '',
      seguimientoCandidatoId: 0,
      agregarNuevo: true,
      datosModificado: false,
    };


    let lista = this.fuenteDatosHCP.data;
    if (lista.length > 0) {
      lista.forEach(l => { l.datosModificado = true });
    }
    lista.push(historialPersonal);
    this.fuenteDatosHCP.data = [...lista];
  }

  removerLineaHistorialClinicoPersonal(linea: number) {
    

    if (linea) {
      let lista = this.fuenteDatosHCP.data;
      if (lista.length > 1) {
        lista.splice(linea - 1, 1);
        lista.forEach((element, index) => {
          element.linea = index + 1;
          element.datosModificado = true;
        });
        this.fuenteDatosHCP.data = [...lista];
      }
    }
  
  }


  habilitaTablaHCP(event: any) {
    this.habilitaContenidoTablaHCP = event.checked
  }



  //#endregion

  //#region   REGION EVENTOS PARA TABLA DE HISTORIAL CLINICO FAMILIAR

  cargarHistorialClinicoFamiliar() {
    if (this.listaHistorialClinicoFamiliar.length === 0) {
      this.listaHistorialClinicoFamiliar = [{
        id: 0,
        linea: 1,
        enfermedadSintoma: '',
        parentescoId: null,
        parentescoDescripcion: '',
        seguimientoCandidatoId: 0,
        agregarNuevo: true,
        datosModificado: false
      }];

      this.fuenteDatosHCF = new MatTableDataSource<HistorialClinicoFamiliar>(this.listaHistorialClinicoFamiliar);
      this.fuenteDatosHCF.paginator = this.paginator;
      this.fuenteDatosHCF.sort = this.sort;
    }  
  }

  actualizaLineaHistorialClinicoFamiliar(
    linea: number,
    parentescoId?: number,
    parentescoDescripcion?: string,
    enfermedadSintoma?: string
  ) {
    const modelo = this.fuenteDatosHCF.data.find((e) => e.linea == linea);
    modelo.id = modelo.id;
    modelo.parentescoId = parentescoId;
    modelo.parentescoDescripcion = parentescoDescripcion;
    modelo.enfermedadSintoma = enfermedadSintoma;
    let data = this.fuenteDatosHCF.data;
    data.forEach(l => { l.datosModificado = true });
    this.fuenteDatosHCF.data = [...data];
  }


  agregarLineaHistorialClinicoFamiliar() {
    const historialFamiliar: HistorialClinicoFamiliar = {
      id: 0,
      linea: this.fuenteDatosHCF.data.length + 1,
      parentescoId: null,
      parentescoDescripcion: '',
      enfermedadSintoma: '',
      seguimientoCandidatoId: 0,
      agregarNuevo: true,
      datosModificado: false
    };
 
    let lista = this.fuenteDatosHCF.data;
    if (lista.length > 0) {
      lista.forEach(l => { l.datosModificado = true });
    }
    lista.push(historialFamiliar);
    this.fuenteDatosHCF.data = [...lista];

  }

  removerLineaHistorialClinicoFamiliar(linea: number) {
    // if (this.listaHistorialClinicoFamiliar.length > 1) {
    //   this.listaHistorialClinicoFamiliar.splice(linea - 1, 1);
    //   this.listaHistorialClinicoFamiliar.forEach((element, index) => {
    //     element.linea = index + 1;
    //   });
    //   this.fuenteDatosHCF.data = this.listaHistorialClinicoFamiliar;
    // }

    if (linea) {
      let contactos = this.fuenteDatosHCF.data;
      if (contactos.length > 1) {
        contactos.splice(linea - 1, 1);
        contactos.forEach((element, index) => {
          element.linea = index + 1;
          element.datosModificado = true;
        });
        this.fuenteDatosHCF.data = [...contactos];
      }
    }
  
  }


  habilitaTablaHCF(event: any) {
    this.habilitaContenidoTablaHCF = event.checked as boolean;
  }

  buscarParentesco(texto: any) {
    this.textoBuscarParentesco = texto.target.value;
  }

  limpiarSeleccionParentesco(linea: number) {
    const parentesco = this.fuenteDatosHCF.data.find((e) => e.linea === linea);
    if (parentesco) {
      parentesco.parentescoId = null;
      parentesco.parentescoDescripcion = "";
      this.fuenteDatosHCF.data = [...this.fuenteDatosHCF.data];
    }
  }

  parentescoSeleccionado(linea: number, modelo: Parentescos) {
    const parentesco = this.fuenteDatosHCF.data.find((e) => e.linea === linea);
    if (parentesco) {
      parentesco.parentescoId = modelo.id;
      parentesco.parentescoDescripcion = modelo.descripcion;
      this.fuenteDatosHCF.data = [...this.fuenteDatosHCF.data];
    }
  }


  agregarSintoma(sintoma: SintomasMedicos, event: any) {
    let sc = new SintomasCandidato();
    this.listaSintomasMedicos.find(e => e.id == sintoma.id).aplica = event.checked;
    let lista = this.listaSintomasMedicos.filter(e => e.aplica == true).map(e => {
      let nuevoSintoma = new SintomasCandidato();
      nuevoSintoma.sintomasMedicoId = e.id
      return nuevoSintoma;
    });
    this.sintomasCandidato.emit(lista);
  }
  //#endregion

}
