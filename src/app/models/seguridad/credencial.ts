import { Modulos } from "./modulos";
import { Pantallas } from "./pantallas";
import { PantallasPorMenu } from "./pantallas-por-menu";
import { Sesion } from "./sesion";

export class Credencial {
  token: string;
  expira: Date;
  tokenActualizable: string;
  perfilDescripcion: string;
  nombreCompleto: string;
  lenguaje: string;
  menus: PantallasPorMenu[];
  usuarioId: number;
  codigoUsuario: string;
  codigoPerfil: string;
  sesion: Sesion;
  fotoPerfil: string;
  rfc: string;
  correo: string;
}
