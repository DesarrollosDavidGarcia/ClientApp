export class Paises {
    id: number;
    codigo: string;
    descripcion: string;
    activo: boolean;
}


export class Ubicacion{
    paisId: number;
    paisDescripcion: string;
    estadoId: number;
    estadoDescripcion: string;
    ciudadId: number;
    ciudadDescripcion: string;
}