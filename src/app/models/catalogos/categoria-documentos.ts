export class CategoriaDocumentos {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    esHabilitado: boolean;
    esAlta: boolean;
    esFirmado: boolean;
    activo: boolean;
    extension: string;
    orden: number;
    temporalId: number;
    esRequerido: boolean;
    nombreDocumentoSeleccionado: string = '';
    esCargado: boolean;
    seguimientoCandidatoId: number;
    documentoSeleccionadoId: number;
}
