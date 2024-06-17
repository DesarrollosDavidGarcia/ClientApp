import { Routes } from '@angular/router';
import { CompGenerosComponent } from './generos/comp-generos/comp-generos.component';
import { CompSintomasMedicosComponent } from './sintomas-medicos/comp-sintomas-medicos/comp-sintomas-medicos.component';
import { CompParentescosComponent } from './parentescos/comp-parentescos/comp-parentescos.component';
import { CompEstadoCivilComponent } from './estado-civil.ts/comp-estado-civil/comp-estado-civil.component';
import { CompRelacionParentalComponent } from './relacion-parental/comp-relacion-parental/comp-relacion-parental.component';
import { CompBancosComponent } from './bancos/comp-bancos/comp-bancos.component';
import { CompCategoriaDocumentoComponent } from './categorias-documentos/comp-categoria-documentos/comp-categoria-documentos.component';
import { CompGradoEscolarComponent } from './grados-escolares/comp-grados-escolares/comp-grados-escolares.component';
import { CompEmpresasComponent } from './empresas/comp-empresas/comp-empresas.component';
import { CompPuestosInternosComponent } from './puestos-internos/comp-puestos-internos/comp-puestos-internos.component';
import { CompEstatusComponent } from './estatus/comp-estatus/comp-estatus.component';
import { CompPaisesEstadosCiudadComponent } from './paises-estados-ciudad/com-paises-estados-ciudad/com-paises-estados-ciudad.component';


export const CatalogosRutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'generos',
        component: CompGenerosComponent,
        data: {
          title: 'Generos',
          urls: [
            { title: 'Generos', url: '/catalogos' },
            { title: 'Generos' }
          ]
        }
      },
      {
        path: 'sintomas-medicos',
        component: CompSintomasMedicosComponent,
        data: {
          title: 'Sintomas-Medicos',
          urls: [
            { title: 'Sintomas-Medicos', url: '/catalogos' },
            { title: 'Sintomas-Medicos' }
          ]
        }
      },
      {
        path: 'parentescos',
        component: CompParentescosComponent,
        data: {
          title: 'Parentesco',
          urls: [
            { title: 'Parentesco', url: '/catalogos' },
            { title: 'Parentesco' }
          ]
        }
      },
      {
        path: 'estado-civil',
        component: CompEstadoCivilComponent,
        data: {
          title: 'Estado Civil',
          urls: [
            { title: 'Estado Civil', url: '/catalogos' },
            { title: 'Estado Civil' }
          ]
        }
      },
      {
        path: 'relacion-parental',
        component: CompRelacionParentalComponent,
        data: {
          title: 'Relacion-Parental',
          urls: [
            { title: 'Relacion-Parental', url: '/catalogos' },
            { title: 'Relacion-Parental' }
          ]
        }
      },
      {
        path: 'bancos',
        component: CompBancosComponent,
        data: {
          title: 'Bancos',
          urls: [
            { title: 'Bancos', url: '/catalogos' },
            { title: 'Bancos' }
          ]
        }
      },
      {
        path: 'categoria-documentos',
        component: CompCategoriaDocumentoComponent,
        data: {
          title: 'Categoria Documentos',
          urls: [
            { title: 'Categoria Documentos', url: '/catalogos' },
            { title: 'Categoria Documentos' }
          ]
        }
      },
      {
        path: 'grados-escolares',
        component: CompGradoEscolarComponent,
        data: {
          title: 'Categoria Grados Escolares',
          urls: [
            { title: 'Categoria Grados Escolares', url: '/catalogos' },
            { title: 'Categoria Grados Escolares' }
          ]
        }
      },
      {
        path: 'empresas',
        component: CompEmpresasComponent,
        data: {
          title: 'Empresas',
          urls: [
            { title: 'Empresas', url: '/catalogos' },
            { title: 'Empresas' }
          ]
        }
      },
      {
        path: 'puestos-internos',
        component: CompPuestosInternosComponent,
        data: {
          title: 'Puestos Internos',
          urls: [
            { title: 'Puestos Internos', url: '/catalogos' },
            { title: 'Puestos Internos' }
          ]
        }
      },
      {
        path: 'estatus',
        component: CompEstatusComponent,
        data: {
          title: 'Estatus',
          urls: [
            { title: 'Estatus', url: '/catalogos' },
            { title: 'Estatus' }
          ]
        }
      },
      {
        path: 'ubicaciones',
        component: CompPaisesEstadosCiudadComponent,
        data: {
          title: 'Ubicaciones',
          urls: [
            { title: 'Ubicaciones', url: '/catalogos' },
            { title: 'Ubicaciones' }
          ]
        }
      },



    ],
  }
];
