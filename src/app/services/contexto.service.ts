import { Injectable } from '@angular/core';
import { RepositorioLogin } from './acceso/repo-login';
import { RepositorioSalida } from './acceso/repo-salida';
import { RepositorioLogCliente } from './errores-internos/repo-log-cliente';
import { RepositorioLogServidor } from './errores-internos/repo-log-servidor';
import { RepositorioRegistro } from './registro/repo-registro';
import { RepositorioMenu } from './seguridad/repo-menus';
import { RepositorioPantalla } from './seguridad/repo-pantalla';
import { RepositorioPantallaMenus } from './seguridad/repo-pantalla-menus';
import { RepositorioPantallaPerfiles } from './seguridad/repo-pantalla-perfil';
import { RepositorioPerfiles } from './seguridad/repo-perfiles';
import { RepositorioPermisos } from './seguridad/repo-permisos';
import { RepositorioPermisosPerfiles } from './seguridad/repo-permisos-por-perfil';
import { RepositorioUsuarios } from './seguridad/repo-usuario';
import { RepositorioSocios } from './socios/socios/repo-negocio';
import { RepositorioGeneros } from './catalogos/repo-generos';
import { RepositorioSintomasMedicos } from './catalogos/repo-sintomas-medicos';
import { RepositorioParentescos } from './catalogos/repo-parentescos';
import { RepositorioEstadoCivil } from './catalogos/repo-estado-civil';
import { RepositorioCandidatos } from './onboarding/candidatos';
import { RepositorioRelacionParental } from './catalogos/repo-relacion-parental';
import { RepositorioBancos } from './catalogos/repo-bancos';
import { RepositorioCategoriaDocumentos } from './catalogos/repo-categoria-documentos';
import { RepositorioSeguimientoCandidato } from './onboarding/seguimiento-candidatos';
import { RepositorioGradoEscolaridad } from './catalogos/repo-grado-escolaridad';
import { RepositorioEmpresas } from './catalogos/repo-empresas';
import { RepositorioPuestosInternos } from './catalogos/repo-puestos-internos';
import { RepositorioEstatus } from './catalogos/repo-estatus';
import { RepositorioPaises } from './catalogos/repo-paises';
import { RepositorioEstados } from './catalogos/repo-estados';
import { RepositorioCiudades } from './catalogos/repo-ciudades';
@Injectable({
  providedIn: 'root',
})
export class ContextoService {
  constructor(
    //Login
    public login: RepositorioLogin,
    public salida: RepositorioSalida,


    // *Seguridad
    public menu: RepositorioMenu,
    public pantalla: RepositorioPantalla,
    public perfiles: RepositorioPerfiles,
    public permisos: RepositorioPermisos,
    public usuarios: RepositorioUsuarios,
    public pantallaMenus: RepositorioPantallaMenus,
    public pantallaPerfiles: RepositorioPantallaPerfiles,
    public permisosPerfiles: RepositorioPermisosPerfiles,



    // Registro
    public registro: RepositorioRegistro,

    //Socios de negocio

    //Negocios
    public socios: RepositorioSocios,

    //Error internos de lador de cliente y servidor
    public erroresInternosCliente: RepositorioLogCliente,
    public erroresInternosServidor: RepositorioLogServidor,

    //PRUEBA CORS

    //CATALOGOS
    public generos: RepositorioGeneros,
    public sintomasMedicos: RepositorioSintomasMedicos,
    public parentescos: RepositorioParentescos,
    public estadoCivil: RepositorioEstadoCivil,
    public relacionParental: RepositorioRelacionParental,
    public bancos: RepositorioBancos,
    public categoriaDocumentos: RepositorioCategoriaDocumentos,
    public gradoEscolaridad: RepositorioGradoEscolaridad,
    public empresas: RepositorioEmpresas,
    public puestosInternos: RepositorioPuestosInternos,
    public estatus: RepositorioEstatus,
    public paises: RepositorioPaises,
    public estados: RepositorioEstados,
    public ciudades: RepositorioCiudades,








    //CANDIDATOS
    public candidatos: RepositorioCandidatos,

    public seguimientoCandidato: RepositorioSeguimientoCandidato

  ) {}
}
