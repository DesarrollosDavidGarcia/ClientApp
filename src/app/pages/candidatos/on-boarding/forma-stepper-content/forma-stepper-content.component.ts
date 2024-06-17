import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DatosCandidatos } from 'src/app/models/onboarding/datos-candidatos';
import { ContextoService } from 'src/app/services/contexto.service';
import { FormaDireccionActualComponent } from '../forma-direccion-actual/forma-direccion-actual.component';
import { FormaContactosComponent } from '../forma-seccion-contactos-familiares/forma-contactos/forma-contactos.component';
import { FormaDatosBasicosComponent } from '../forma-datos-basicos/forma-datos-basicos.component';
import { Familiar } from 'src/app/models/onboarding/familiares';
import { Contactos } from 'src/app/models/onboarding/contactos';
import { FormaGeneralComponent } from '../estado-salud/general/forma-general.component';
import { FormaHabitosComponent } from '../estado-salud/habitos/forma-habitos.component';
import { FormaHistorialClinicoComponent } from '../estado-salud/historial-clinico/forma-historial-clinico.component';
import { HistorialClinicoPersonal } from 'src/app/models/onboarding/enfermedades-personales';
import { FormaDocumentacionComponent } from '../carga-documentos/forma-documentacion/forma-documentacion.component';
import { DatosBasicos, DireccionActual, DireccionFiscal, General, Habitos, SeguimientoCandidato } from 'src/app/models/onboarding/candidato';
import { HistorialClinicoFamiliar } from 'src/app/models/onboarding/enfermedades-familiares';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';
import { SintomasCandidato } from 'src/app/models/onboarding/sintomas-candidatos';
import { Subscription } from 'rxjs';
import { DocumentacionCandidato } from 'src/app/models/catalogos/documentacion-colaborador';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-steeper-content',
  templateUrl: './forma-stepper-content.component.html',
  styleUrls: ['./forma-stepper-content.component.scss'],
})
export class FormaStepperContentComponent implements OnInit, OnDestroy {
  @ViewChild(FormaDatosBasicosComponent)
  formaDatosBasicos: FormaDatosBasicosComponent;
  mensajeFormularioBasico: string = 'Ingresa tus datos en el formulario de Datos Basicos';

  @ViewChild(FormaDireccionActualComponent)
  formaDireccionActual: FormaDireccionActualComponent;
  mensajeFormularioDireccionActual: string = "Ingresa tus datos en el formulario de Direccion Actual y Fiscal";

  @ViewChild(FormaContactosComponent)
  formaContactosCandidato: FormaContactosComponent;
  mensajeFormularioContactos: string = "Ingresa tus datos en el formulario de Contactos y Familiares";

  @ViewChild(FormaGeneralComponent)
  formaDatosGeneralesCandidato: FormaGeneralComponent;
  mensajeFormularioDatosGenerales: string = "Ingresa tus datos en el formulario de Datos Generales";


  @ViewChild(FormaHabitosComponent)
  formaHabitosCandidato: FormaHabitosComponent;
  mensajeFormularioHabitos: string = "Ingresa tus datos en el formulario de Habitos";

  @ViewChild(FormaHistorialClinicoComponent)
  formaHistorialClinicoCandidato: FormaHistorialClinicoComponent;
  mensajeFormularioHistoralClinicoCandidato: string = "Ingresa tus datos en el formulario de Historial Clinico Personal y Familiar";

  @ViewChild(FormaDocumentacionComponent)
  formaCargaDocumentos: FormaDocumentacionComponent;


  disableBotonSiguienteDatosBasicos = false;
  disableBotonSiguienteDireccionActual = false;
  disableBotonSiguienteContactosFamiliares = false;
  disableBotonSiguienteGenerales = false;

  disableBotonSiguienteHabitos = true;
  disableBotonSiguienteHCPF = true;

  habilitaSeccionDireccionActual = false;
  habilitaSeccionContactosFamiliares = false;


  precargaDatos: DatosCandidatos;
  step = 0;

  familiares: Familiar[] = [];
  contactos: Contactos[] = [];
  historialClinicoPersonal: HistorialClinicoPersonal[] = [];


  candidato: SeguimientoCandidato = new SeguimientoCandidato();

  subSeguimientoCandidato: Subscription;
  seguimientoCandidatoId: number = 0;
  emailCandidato: string = "";
  constructor(private ctx: ContextoService, 
    private auth: AutenticacionService, 
    private router: Router,
    private route: ActivatedRoute) { 
       this.seguimientoCandidatoId = +this.route.snapshot.params["seguimientoId"];
       this.emailCandidato = this.route.snapshot.params["email"];
 
  }
  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnDestroy(): void { }

  async ngAfterViewInit(): Promise<void> {
    await this.cargaDatos();
    //CARGA LOS DATOS DE LISTAS DEL FORMULARIO DE DATOS DE DIRECCCION ACTUAL
    this.formaDireccionActual.listaPaises = this.precargaDatos.paises;
    this.formaDireccionActual.listaEstados = this.precargaDatos.estados;
    this.formaDireccionActual.listaCiudad = this.precargaDatos.ciudades;

    this.formaCargaDocumentos.listaDocumentosParaAlta = this.precargaDatos.categoriaDocumentos.filter(e => e.esAlta);
    this.formaCargaDocumentos.listaDocumentosParaFirmar = this.precargaDatos.categoriaDocumentos.filter(e => e.esFirmado);

    //CARGA LOS DATOS DE LISTAS DEL FORMULARIO DE DATOS DE SECCION DE DATOS DE CONTACTOS Y FAMILIARES
    this.formaContactosCandidato.listaRelacionParental = this.precargaDatos.relacionParental;
    this.formaContactosCandidato.listaParentescos = this.precargaDatos.parentescos;

    this.formaHistorialClinicoCandidato.listaParentescos = this.precargaDatos.parentescos;
    this.formaHistorialClinicoCandidato.listaSintomasMedicos = this.precargaDatos.sintomasMedicos;

    //#region ======FORMA DATOS BASICOS====
    //Deteccion de cambios en los formulario que permiten la validacion para identificar si estan correctamente llenos.
    //CARGA LOS DATOS DE LISTAS DEL FORMULARIO DE DATOS BASICOS.
    this.formaDatosBasicos.listaGeneros = this.precargaDatos.generos;
    this.formaDatosBasicos.listaEstadosCiviles = this.precargaDatos.estadosCiviles;
    this.formaDatosBasicos.listaPaises = this.precargaDatos.paises;
    this.formaDatosBasicos.listaEstados = this.precargaDatos.estados;
    this.formaDatosBasicos.listaCiudad = this.precargaDatos.ciudades;
    this.formaDatosBasicos.listaBancos = this.precargaDatos.bancos;
    this.formaDatosBasicos.listaGradosEscolares = this.precargaDatos.gradoEscolaridad;

   
      
    await this.obtenerCandidatoPorCorreo(this.seguimientoCandidatoId, this.emailCandidato);


    this.formaDatosBasicos.forma.valueChanges.subscribe(async () => {
      await this.validarFormularioDatosBasicos();
    });

    //#endregion

    //#region  ===========FORMA DATOS DE DIRECCIONES ACTUALES Y FISCALES =======
    this.validarFormularioDireccionActualYFiscal();
    this.formaDireccionActual.formaDireccionActual.valueChanges.subscribe(() => {
      this.validarFormularioDireccionActualYFiscal();
    });
    this.validarFormularioDireccionActualYFiscal();
    this.formaDireccionActual.formaDireccionFiscal.valueChanges.subscribe(() => {
      this.validarFormularioDireccionActualYFiscal();
    });

    //#endregion

    //#region =========DATOS CONTACTOS Y FAMILIARES ==========
    this.formaContactosCandidato.fuenteDatosFamiliares.connect().subscribe((data: Familiar[]) => {
      let datosCompletos = data.filter(e => e.nombre != "" &&
        e.parentescoId > 0 &&
        e.parentescoDescripcion != "" &&
        e.celular != "" &&
        e.nombre != "" &&
        e.fechaNacimiento != null && 
        e.datosModificado == true
      );
      if (datosCompletos.length > 0) {
        this.disableBotonSiguienteContactosFamiliares = true;
        this.candidato.familiares = datosCompletos;
        this.mensajeFormularioContactos = 'Formulario de Contactos y Familiares Completo';
        this.guardarFormularios("datosFamiliares");
      }
    });

    this.formaContactosCandidato.fuenteDatosContactos.connect().subscribe((data: Contactos[]) => {
      let datosCompletos = data.filter(e => e.nombre != "" &&
        e.relacionId > 0 &&
        e.relacionDescripcion != "" &&
        e.celular != "" &&
        e.telefonoTrabajo != ""&&
        e.datosModificado == true);
      if (datosCompletos.length > 0) {
        this.disableBotonSiguienteContactosFamiliares = true;
        this.mensajeFormularioContactos = 'Formulario de Contactos y Familiares Completo';
        this.candidato.contactos = datosCompletos;
        this.guardarFormularios("datosContactos");
      }
    });
    //#endregion

    //#region ========FORMA DATOS GENERALES=======
    this.formaDatosGeneralesCandidato.forma.valueChanges.subscribe(() => {
      this.validarFormularioDatosGenerales();
    });

    //#endregion

    //#region =========FORMA DE DATOS HABITOS ==============
    this.formaHabitosCandidato.forma.valueChanges.subscribe(() => {
      this.validarFormularioHabitos();
    });


    this.formaHistorialClinicoCandidato.fuenteDatosHCP.connect().subscribe((data: HistorialClinicoPersonal[]) => {
      let datosCompletos = data.filter(e => e.enfermedad != "" &&
        e.fechaSintomas != null &&
        e.tratamiento != "" && 
        e.datosModificado == true
      );
      if (datosCompletos.length > 0) {
        this.disableBotonSiguienteHCPF = true;
        this.candidato.historialClinicoPersonal = datosCompletos;
        this.mensajeFormularioContactos = 'Formulario de Datos Historicos Clinicos Personales Completo';
        this.guardarFormularios("datosHistorialCP");
      }
    });

    this.formaHistorialClinicoCandidato.fuenteDatosHCF.connect().subscribe((data: HistorialClinicoFamiliar[]) => {

      let datosCompletos = data.filter(e => e.parentescoDescripcion != "" &&
        e.parentescoId != null &&
        e.enfermedadSintoma != "" &&
        e.datosModificado == true
      );
      if (datosCompletos.length > 0) {
        this.disableBotonSiguienteHCPF = true;
        this.candidato.historialClinicoFamiliar = datosCompletos;
        this.mensajeFormularioContactos = 'Formulario de Datos Historicos Clinicos Familiares Completo';
        this.guardarFormularios("datosHistorialCF");
      }
    });

    this.formaHistorialClinicoCandidato.sintomasCandidato.subscribe((sintomas) => {

      this.validarFormularioSintomas(sintomas);
    })

    this.formaCargaDocumentos.documentoEvent.subscribe((documento) => {
      if (documento != null) {
        this.validarFormularioDocumentos(documento);
      }
    });

    //#endregion


    // var totalSize = 0;
    // for (var key in window.localStorage) {
    //   if (window.localStorage.hasOwnProperty(key)) {
    //     // Calcula el tamaño de cada elemento (clave + valor)
    //     var itemSize = (key.length + window.localStorage.getItem(key).length) * 2; // Multiplica por 2 para la codificación UTF-16
    //     totalSize += itemSize;

    //     // Muestra el tamaño de cada elemento
    //     console.log(key.substr(0, 50) + " = " + (itemSize / 1024).toFixed(2) + " KB");
    //   }
    // }
    // // Muestra el tamaño total
    // console.log("Total = " + (totalSize / 1024).toFixed(2) + " KB");

  }

  async cargaDatos() {
    try {
      let result = await this.ctx.candidatos.precargaDatos();
      if (result.isSuccess) {
        this.precargaDatos = result.data;
      }
    } catch (error) {
    }
  }

  async validarFormularioDatosBasicos(): Promise<void> {

    const mensajeFormularioIncompleto = 'Formulario de Datos Basicos Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Datos Basicos Completado';
    this.disableBotonSiguienteDatosBasicos = false;
    this.habilitaSeccionDireccionActual = false;
    if (this.formaDatosBasicos && this.formaDatosBasicos.forma) {
      if (this.formaDatosBasicos.forma.valid) {
        this.mensajeFormularioBasico = mensajeFormularioCompleto;
        this.candidato.datosBasicos = this.formaDatosBasicos.forma.value as DatosBasicos;
        let datosBasicos = await this.guardarFormularios("datosBasicos");
        this.disableBotonSiguienteDatosBasicos = datosBasicos;
        this.habilitaSeccionDireccionActual = datosBasicos;
      } else {
        this.mensajeFormularioBasico = mensajeFormularioIncompleto;
      }
    } else {
      this.mensajeFormularioBasico = mensajeFormularioIncompleto;
    }
  }

  validarFormularioDireccionActualYFiscal(): void {
    const mensajeFormularioIncompleto = 'Formulario de Dirección Actual y Fiscal Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Dirección Actual y Fiscal Completado';

    if (this.formaDireccionActual && this.formaDireccionActual.formaDireccionActual && this.formaDireccionActual.formaDireccionFiscal) {
      if (this.formaDireccionActual.formaDireccionActual.valid && this.formaDireccionActual.formaDireccionFiscal.valid) {
        this.disableBotonSiguienteDireccionActual = true;
        this.habilitaSeccionContactosFamiliares = true;
        this.mensajeFormularioDireccionActual = mensajeFormularioCompleto;
        this.candidato.direccionActual = this.formaDireccionActual.formaDireccionActual.value as DireccionActual;
        this.candidato.direccionFiscal = this.formaDireccionActual.formaDireccionFiscal.value as DireccionFiscal;
        this.candidato.direccionActual.formularioCompletado = true;
        this.candidato.direccionFiscal.formularioCompletado = true;

        this.guardarFormularios("direccionActual");
        this.guardarFormularios("direccionFiscal");
      } else {
        this.disableBotonSiguienteDireccionActual = false;
        this.habilitaSeccionContactosFamiliares = false;
        this.mensajeFormularioDireccionActual = mensajeFormularioIncompleto;
      }
    } else {
      this.disableBotonSiguienteDireccionActual = false;
      this.habilitaSeccionContactosFamiliares = false;
      this.mensajeFormularioDireccionActual = mensajeFormularioIncompleto;
    }
  }

  validarFormularioDatosGenerales(): void {
    const mensajeFormularioIncompleto = 'Formulario de Datos Generales Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Datos Generales Completado';
    if (this.formaDatosGeneralesCandidato && this.formaDatosGeneralesCandidato.forma) {
      if (this.formaDatosGeneralesCandidato.forma.valid) {
        this.disableBotonSiguienteGenerales = true;
        this.mensajeFormularioDatosGenerales = mensajeFormularioCompleto
        this.candidato.general = this.formaDatosGeneralesCandidato.forma.value as General;
        this.candidato.general.formularioCompletado = this.formaDatosGeneralesCandidato.forma.valid;
        this.guardarFormularios("datosGenerales");
      } else {
        this.disableBotonSiguienteGenerales = false;
        this.mensajeFormularioDatosGenerales = mensajeFormularioIncompleto
      }
    } else {
      this.mensajeFormularioDatosGenerales = mensajeFormularioIncompleto
    }
  }

  validarFormularioHabitos(): void {
    const mensajeFormularioIncompleto = 'Formulario de Habitos Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Habitos Completado';
    debugger;
    if (this.formaHabitosCandidato && this.formaHabitosCandidato.forma) {
      if (this.formaHabitosCandidato.forma.valid) {
        this.disableBotonSiguienteHabitos = true;
        this.mensajeFormularioHabitos = mensajeFormularioCompleto;
        this.candidato.habitos = this.formaHabitosCandidato.forma.value as Habitos;
        this.candidato.habitos.formularioCompletado = this.formaHabitosCandidato.forma.valid;
        this.guardarFormularios("datosHabitos");
      } else {
        this.mensajeFormularioHabitos = mensajeFormularioIncompleto;
        this.disableBotonSiguienteHabitos = false;
      }
    } else {
      this.mensajeFormularioHabitos = mensajeFormularioIncompleto;
    }
  }

  esFamiliarValido(familiar: Familiar) {
    return familiar.nombre && familiar.parentescoId && familiar.parentescoDescripcion && familiar.fechaNacimiento && familiar.celular;
  }

  async validarFormularioSintomas(sintomasCandidato: SintomasCandidato[]): Promise<void> {
    this.candidato.sintomasCandidato = sintomasCandidato;
    await this.guardarFormularios("datosSintomasActuales")
  }


  async validarFormularioDocumentos(documento: DocumentacionCandidato): Promise<void> {


    await this.ctx.candidatos.guardarDocumentosCandidato(this.candidato.id, documento);
  }


  async guardarFormularios(formulario: string): Promise<boolean> {
    let resultado: boolean = false;
    if(this.candidato != null || this.candidato != undefined)
    {
      switch (formulario) {
        case 'datosBasicos':
          let respuestaDatosBasicos = await this.ctx.candidatos.guardarDatosBasicosCandidato(this.candidato.id, this.candidato.datosBasicos);
          resultado = respuestaDatosBasicos.isSuccess;
          break;
        case 'direccionActual':
          let respuestaDireccionActual = await this.ctx.candidatos.guardarDatosDireccionActualCandidato(this.candidato.id, this.candidato.direccionActual);
          resultado = respuestaDireccionActual.isSuccess;
          break;
        case 'direccionFiscal':
          let respuestaDireccionFiscal = await this.ctx.candidatos.guardarDatosDireccionFiscalCandidato(this.candidato.id, this.candidato.direccionFiscal);
          resultado = respuestaDireccionFiscal.isSuccess;
          break;
        case 'datosFamiliares':
          let respuestaFamiliares = await this.ctx.candidatos.guardarFamiliaresCandidato(this.candidato.id, this.candidato.familiares);
          resultado = respuestaFamiliares.isSuccess;
          break;
        case 'datosContactos':
          let respuestaContactos = await this.ctx.candidatos.guardarContactosCandidato(this.candidato.id, this.candidato.contactos);
          resultado = respuestaContactos.isSuccess;
          break;
        case 'datosGenerales':
          let respuestaGeneral = await this.ctx.candidatos.guardarDatosGeneralesCandidato(this.candidato.id, this.candidato.general);
          resultado = respuestaGeneral.isSuccess;
          break;
        case 'datosHabitos':
          let respuestaHabitos = await this.ctx.candidatos.guardarDatosHabitosCandidato(this.candidato.id, this.candidato.habitos);
          resultado = respuestaHabitos.isSuccess;
          break;
        case 'datosHistorialCP':
          let respuestaHistorialClinicoPersonal = await this.ctx.candidatos.guardarDatosHistorialClinicoPersonalCandidato(this.candidato.id, this.candidato.historialClinicoPersonal);
          resultado = respuestaHistorialClinicoPersonal.isSuccess;
          break;
        case 'datosHistorialCF':
          let respuestaHistorialClinicoFamiliar = await this.ctx.candidatos.guardarDatosHistorialClinicoFamiliarCandidato(this.candidato.id, this.candidato.historialClinicoFamiliar);
          resultado = respuestaHistorialClinicoFamiliar.isSuccess;
          break;
        case 'datosSintomasActuales':
          let respuestaSintomasCandidato = await this.ctx.candidatos.guardarDatosSintomasCandidato(this.candidato.id, this.candidato.sintomasCandidato);
          resultado = respuestaSintomasCandidato.isSuccess;
          break;
  
      }
    }
  
    return resultado;
  }

  async obtenerCandidatoPorCorreo(seguimientoId: number, correo: string) {
    let resultado: ResultVM<SeguimientoCandidato>;
    try {
      var result = await this.ctx.candidatos.obtenerCandidatoPorCorreo(seguimientoId, correo);
      if (result.isSuccess && result.data != null) {
        resultado = result;
        this.candidato = resultado.data;
        await this.SetDatosBasicos(this.candidato.datosBasicos);
        await this.SetDireccionActual(this.candidato.direccionActual, this.candidato.direccionFiscal)
        await this.SetFamiliares(this.candidato.familiares);
        await this.SetContactos(this.candidato.contactos);
        
        await this.SetDatosGenerales(this.candidato.general);
        await this.SetHabitos(this.candidato.habitos);
        await this.SetHistorialClinicoFamiliar(this.candidato.historialClinicoFamiliar);
        await this.SetHistorialClinicoPersonal(this.candidato.historialClinicoPersonal);
        await this.SetSintomasCandidato(this.candidato.sintomasCandidato);
        await this.SetDocumentosCandidato(this.candidato.documentosCandidato, this.candidato.id);
      }else{

        this.router.navigate(['/authenticaction/404']);
      }
    } catch (error) {

    }
  }

  async SetDatosBasicos(datos: DatosBasicos) {
    const mensajeFormularioIncompleto = 'Formulario de Datos Basicos Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Datos Basicos Completado';
    this.mensajeFormularioBasico = mensajeFormularioIncompleto;
    if (datos != null) {
      this.disableBotonSiguienteDatosBasicos = false;
      this.habilitaSeccionDireccionActual = false;
      Object.assign(this.formaDatosBasicos.forma.value, datos);
      this.formaDatosBasicos.forma.reset(this.formaDatosBasicos.forma.value);
      
      if (datos.formularioCompletado) {
        this.disableBotonSiguienteDatosBasicos = true;
        this.habilitaSeccionDireccionActual = true;
        this.mensajeFormularioBasico = mensajeFormularioCompleto;
      }
      this.formaDatosBasicos.f["formularioCompletado"].setValue(this.formaDatosBasicos.forma.valid);
    }
  }

  async SetDireccionActual(direccionActual: DireccionActual, direccionFiscal: DireccionFiscal) {

    const mensajeFormularioIncompleto = 'Formulario de Dirección Actual y Fiscal Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Dirección Actual y Fiscal Completado';
    if (direccionActual != null && direccionFiscal) {

      this.disableBotonSiguienteDireccionActual = false;
      this.habilitaSeccionContactosFamiliares = false;
      Object.assign(this.formaDireccionActual.formaDireccionActual.value, direccionActual);
      this.formaDireccionActual.formaDireccionActual.reset(this.formaDireccionActual.formaDireccionActual.value);
      Object.assign(this.formaDireccionActual.formaDireccionFiscal.value, direccionFiscal);
      this.formaDireccionActual.formaDireccionFiscal.reset(this.formaDireccionActual.formaDireccionFiscal.value);

      if (direccionActual.formularioCompletado && direccionFiscal.formularioCompletado) {
        this.disableBotonSiguienteDireccionActual = true;
        this.habilitaSeccionContactosFamiliares = true;
        this.mensajeFormularioDireccionActual = mensajeFormularioCompleto;
      } else {
        this.mensajeFormularioDireccionActual = mensajeFormularioIncompleto;
      }
      this.formaDireccionActual.fDA["formularioCompletado"].setValue(this.formaDireccionActual.formaDireccionActual.valid);
      this.formaDireccionActual.fDF["formularioCompletado"].setValue(this.formaDireccionActual.formaDireccionFiscal.valid);
    } else {
      this.mensajeFormularioDireccionActual = mensajeFormularioIncompleto;
    }
  }

  async SetFamiliares(familiares: Familiar[]) {
    if (familiares.length > 0) {
      this.disableBotonSiguienteContactosFamiliares= true;
      familiares.forEach(familiar => {familiar.agregarNuevo = true, familiar.datosModificado = false});
      this.formaContactosCandidato.fuenteDatosFamiliares.data = [...familiares];
    }
  }

  async SetContactos(contactos: Contactos[]) {
    if (contactos.length > 0) {
      this.disableBotonSiguienteContactosFamiliares= true;
      contactos.forEach(contacto => {contacto.agregarNuevo = true, contacto.datosModificado = false});
      this.formaContactosCandidato.fuenteDatosContactos.data = [...contactos];
    }
  }

  async SetDatosGenerales(datos: General) {
    const mensajeFormularioIncompleto = 'Formulario de Datos Generales Incompleto';
    const mensajeFormularioCompleto = 'Formulario de Datos Generales Completado';
    this.mensajeFormularioDatosGenerales = mensajeFormularioIncompleto;
    if (datos != null) {
      this.disableBotonSiguienteGenerales = false;
      Object.assign(this.formaDatosGeneralesCandidato.forma.value, datos);
      this.formaDatosGeneralesCandidato.forma.reset(this.formaDatosGeneralesCandidato.forma.value);
      if (datos.formularioCompletado) {
        this.disableBotonSiguienteGenerales = true;
        this.mensajeFormularioDatosGenerales = mensajeFormularioCompleto;
      }
      this.formaDatosGeneralesCandidato.f["formularioCompletado"].setValue(this.formaDatosGeneralesCandidato.forma.valid);
    }
  }

  async SetHabitos(datos: Habitos) {
    const mensajeFormularioCompleto = 'Formulario de Habitos Completado';
    if (datos != null) {
      this.disableBotonSiguienteHabitos = false;
      Object.assign(this.formaHabitosCandidato.forma.value, datos);
      this.formaHabitosCandidato.forma.reset(this.formaHabitosCandidato.forma.value);
      if (datos.formularioCompletado) {
        this.disableBotonSiguienteHabitos = true;
        this.mensajeFormularioHabitos = mensajeFormularioCompleto;
      }
      this.formaHabitosCandidato.f["formularioCompletado"].setValue(this.formaHabitosCandidato.forma.valid);
    }
  }

  async SetHistorialClinicoFamiliar(historial: HistorialClinicoFamiliar[]) {
    if (historial.length > 0) {
      historial.forEach(h => h.agregarNuevo = true);
      this.formaHistorialClinicoCandidato.fuenteDatosHCF.data = [...historial];
    }
  }

  async SetHistorialClinicoPersonal(historial: HistorialClinicoPersonal[]) {
    if (historial.length > 0) {
      historial.forEach(h => h.agregarNuevo = true);
      this.formaHistorialClinicoCandidato.fuenteDatosHCP.data = [...historial];
    }
  }

  async SetSintomasCandidato(sintomas: SintomasCandidato[]) {
    if (sintomas.length > 0) {
      this.precargaDatos.sintomasMedicos = this.precargaDatos.sintomasMedicos.map(sm => {
        if (sintomas.some(e => e.sintomasMedicoId === sm.id)) {
          return { ...sm, aplica: true };
        } else {
          return { ...sm, aplica: false };
        }
      });
      this.formaHistorialClinicoCandidato.listaSintomasMedicos = [...this.precargaDatos.sintomasMedicos];
    }
  }

  async SetDocumentosCandidato(documento: DocumentacionCandidato[], seguimientoCandidatoId: number) {
    if (documento.length > 0) {
      documento.forEach(element => {
        let doc = this.precargaDatos.categoriaDocumentos.find(e => e.id === element.documentoId);
        if (doc) {
          doc.nombreDocumentoSeleccionado = element.nombreDocumento;
          doc.seguimientoCandidatoId = seguimientoCandidatoId;
          doc.documentoSeleccionadoId = element.documentoId;
          doc.esCargado = true;
        }
      });
      this.formaCargaDocumentos.listaDocumentosParaAlta = this.precargaDatos.categoriaDocumentos;

      this.formaCargaDocumentos.listaDocumentosParaAlta = this.precargaDatos.categoriaDocumentos.filter(e => e.esAlta);
      this.formaCargaDocumentos.listaDocumentosParaFirmar = this.precargaDatos.categoriaDocumentos.filter(e => e.esFirmado);
    }
  }

}
