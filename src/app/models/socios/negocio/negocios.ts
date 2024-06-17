import { Empresas } from '../empresa/empresas';

export class Socios {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  tieneMasEmpresas: string;
  registroCompletado: string;
  rfc: string;
  activo: boolean;
  empresas: Empresas[] = [];
}
