import { DocumentacionCandidato } from "../catalogos/documentacion-colaborador";
import { SintomasMedicos } from "../catalogos/sintomas-medicos";
import { Contactos } from "./contactos";
import { HistorialClinicoFamiliar } from "./enfermedades-familiares";
import { HistorialClinicoPersonal } from "./enfermedades-personales";
import { Familiar } from "./familiares";
import { SintomasCandidato } from "./sintomas-candidatos";

 
export class SeguimientoCandidato{
    id: number;
    codigo: number;
    rfc: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
    celular: string;
    fechaRegistro: Date;
    fechaProbableIngreso: Date;
    estatusId: number;
    estatusDescripcion: string;
    empresaId: number;
    puestoInternoId: number;
    fechaActualizacion: Date;
    fechaCulminacionSeguimiento: Date;
    avance: number;
    activo: boolean;
    datosBasicos: DatosBasicos = new DatosBasicos();
    direccionActual: DireccionActual = new DireccionActual();
    direccionFiscal: DireccionFiscal = new DireccionFiscal();
    contactos: Contactos[] = [];
    familiares: Familiar[] = [];
    general: General= new General();
    habitos: Habitos = new Habitos();
    historialClinicoPersonal: HistorialClinicoPersonal[] = [];
    historialClinicoFamiliar: HistorialClinicoFamiliar[] = [];
    sintomasCandidato: SintomasCandidato[] = [];
    documentosCandidato: DocumentacionCandidato[] = [];

}

export class DatosBasicos {
    id: number;
    codigo: string; 
    seguimientoCandidatoId: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    generoDescripcion: string;
    generoId: number;
    fechaNacimiento: Date;
    paisId: number;
    paisDescripcion: string;
    estadoId: number;
    estadoDescripcion: string;
    ciudadId: number;
    ciudadDescripcion: string;
    estadoCivilId: number;
    estadoCivilDescripcion: string;
    correoElectronico: string;
    celular: string;
    numeroTelefonico: string;
    numeroIMSS: string;
    curp: string;
    aplicaInfonavit: boolean;
    numeroCreditoInfonavit: string;
    montoInfonavit: string;

    aplicaFonacot: boolean;
    montoFonacot: string;

    rfc: string;
    gradoEscolaridadId: number;
    gradoEscolaridadDescripcion: string;
    universidad: string;
    bancoId: number;
    bancoDescripcion: string;
    clabe: string;
    cuenta: string;
    formularioCompletado: boolean;
}


export class DireccionActual {
    id: number;
    seguimientoCandidatoId: number;
    calle: string;
    noExterior: string;
    noInterior: string;
    codigoPostal: string;
    direccionPaisId: number;
    direccionPaisDescripcion: string;
    direccionEstadoId: number;
    direccionEstadoDescripcion: string;
    direccionCiudadId: number;
    direccionCiudadDescripcion: string;
    colonia: string;
    formularioCompletado: boolean;
}

export class DireccionFiscal {
    id: number;
    seguimientoCandidatoId: number;
    fiscalCalle: string;
    fiscalNoExterior: string;
    fiscalNoInterior: string;
    fiscalCodigoPostal: string;
    fiscalDireccionPaisId: number;
    fiscalDireccionPaisDescripcion: string;
    fiscalDireccionEstadoId: number;
    fiscalDireccionEstadoDescripcion: string;
    fiscalDireccionCiudadId: number;
    fiscalDireccionCiudadDescripcion: string;
    fiscalColonia: string;
    formularioCompletado: boolean;
}

export class General {
    id: number;
    seguimientoCandidatoId: number;
    tipoSangreFactor: string;
    peso: number;
    estatura: number;
    fechaUltimoExamenMedico: Date;
    aplicaDonaciones: boolean;
    porqueAplicaDonacion: string;
    medicamentoHabitual: string;
    intervencionQuirurgica: string;
    medicamentosPreescripcion: string;
    medicamentosAlergicos: string;
    otrasAlergias: string;
    aplicaLentes: boolean;
    formularioCompletado: boolean;

}


export class Habitos {
    id: number;
    seguimientoCandidatoId: number;
    fuma: boolean;
    fumaDesde: string;
    cigarrosDiarios: string;
    aplicaBebibasAlcolicas: boolean;
    bebidasAlcoholicasDesde: string;
    bebidasAlcoholicasDiarias: string;
    tazasCafe: number;
    aplicaSustanciaNociva: boolean;
    sustanciaNociva: string;
    tiempoUsoSustanciaNociva: string;
    aplicaDroga: boolean;
    tipoDroga: string;
    tiempoUsoDroga: string;
    motivoConsumaDroga: string;
    formularioCompletado: boolean;
}