import { Routes } from '@angular/router';
import { CompMenusComponent } from './menus/comp-menus/comp-menus.component';
import { CompPantallaPorMenuComponent } from './pantalla-por-menu/comp-pantalla-por-menu/comp-pantalla-por-menu.component';
import { CompPantallaPorPerfilComponent } from './pantalla-por-perfil/comp-pantalla-por-perfil/comp-pantalla-por-perfil.component';
import { CompPantallasComponent } from './pantallas/comp-pantallas/comp-pantallas.component';
import { ComPerfilesComponent } from './perfiles/com-perfiles/com-perfiles.component';
import { CompPermisoPorPerfilComponent } from './permiso-por-perfil/comp-permiso-por-perfil/comp-permiso-por-perfil.component';
import { CompPermisosComponent } from './permisos/comp-permisos/comp-permisos.component';
import { CompUsuarioComponent } from './usuarios/comp-usuario/comp-usuario.component';
import { FormaUsuarioComponent } from './usuarios/forma-usuario/forma-usuario.component';

export const SeguridadRutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'menus',
        component: CompMenusComponent,
        data: {
          title: 'Menus',
          urls: [
           { title: 'Menus', url: '/seguridad' },
           { title: 'Menus' }
          ]
        }
      },
      {
        path: 'pantallas',
        component: CompPantallasComponent,
        data: {
          title: 'Pantallas',
          urls: [
           { title: 'Pantallas', url: '/seguridad' },
           { title: 'Pantallas' }
          ]
        }
      },
      {
        path: 'pantallas-por-menu',
        component: CompPantallaPorMenuComponent,
        data: {
          title: 'Pantallas por menu',
          urls: [
           { title: 'Pantallas por menu', url: '/seguridad' },
           { title: 'Pantallas por menu' }
          ]
        }
      },
      {
        path: 'usuarios',
        component: CompUsuarioComponent,
        data: {
          title: 'Usuarios',
          urls: [
           { title: 'Usuarios', url: '/seguridad' },
           { title: 'Usuarios' }
          ]
        }
      },
      {
        path: 'usuarios/forma-usuario/:id',
        component: FormaUsuarioComponent,
        data: {
          title: 'Forma Usuarios',
          urls: [
           { title: 'Forma Usuarios', url: '/seguridad' },
           { title: 'Forma Usuarios' }
          ]
        }
      },
      {
        path: 'perfiles',
        component: ComPerfilesComponent,
        data: {
          title: 'Perfiles',
          urls: [
           { title: 'Perfiles', url: '/seguridad' },
           { title: 'Perfiles' }
          ]
        }
      },
      {
        path: 'permisos',
        component: CompPermisosComponent,
        data: {
          title: 'Permisos',
          urls: [
           { title: 'Permisos', url: '/seguridad' },
           { title: 'Permisos' }
          ]
        }
      },
      {
        path: 'pantallas-por-perfil',
        component: CompPantallaPorPerfilComponent,
        data: {
          title: 'Pantallas por perfil',
          urls: [
           { title: 'Pantallas por perfil', url: '/seguridad' },
           { title: 'Pantallas por perfil' }
          ]
        }
      },
      {
        path: 'permisos-por-perfil',
        component: CompPermisoPorPerfilComponent,
        data: {
          title: 'Permisos por perfil',
          urls: [
           { title: 'Permisos por perfil', url: '/seguridad' },
           { title: 'Permisos por perfil' }
          ]
        }
      },


    ],
  }
];
