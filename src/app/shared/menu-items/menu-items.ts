import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '',
    name: 'Personal',
    type: 'saperator',
    icon: 'av_timer',
  },
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'sub',
    icon: 'av_timer',
    children: [
      { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
      { state: 'dashboard2', name: 'Dashboard 2', type: 'link' },
    ],
  },
  {
    state: 'seguridad',
    name: 'Seguridad',
    type: 'sub',
    icon: 'security',
    children: [
      { state: 'menus', name: 'Menus', type: 'link' },
      { state: 'pantallas', name: 'Pantallas', type: 'link' },
      { state: 'pantallas-por-menu', name: 'Pantallas por menu', type: 'link' },
      { state: 'usuarios', name: 'Usuarios', type: 'link' },
      { state: 'perfiles', name: 'Perfiles', type: 'link' },
      { state: 'permisos', name: 'Permisos', type: 'link' },
      { state: 'pantallas-por-perfil', name: 'Pantallas por perfil', type: 'link' },




    ],
  },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
// asdasd
