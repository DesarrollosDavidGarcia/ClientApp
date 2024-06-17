import { PermisosPorPerfil } from './permisos-por-perfil';

export class Usuarios {
  id: number;
  codigo?:string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  celular: string;
  telefono: string;
  email: string;
  activo: boolean;
  perfilId: number;
  perfilDescripcion: number;
  permisosPorPerfil: PermisosPorPerfil[] = [];
  actualizoContra: boolean;
  fotoPerfil: string;
  rfc: string;
}
