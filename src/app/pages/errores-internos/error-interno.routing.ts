import { Routes } from '@angular/router';
import { CompErroresInternoClienteComponent } from './error-interno-cliente/comp-error-interno-cliente.component';
import { CompErroresInternoServidorComponent } from './error-interno-servidor/comp-error-interno-servidor.component';


export const ErroresInternosRutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cliente',
        component: CompErroresInternoClienteComponent,
        data: {
          title: 'cliente',
          urls: [
           { title: 'cliente', url: '/erroresinternos' },
           { title: 'cliente' }
          ]
        }
      },
      {
        path: 'servidor',
        component: CompErroresInternoServidorComponent,
        data: {
          title: 'servidor',
          urls: [
           { title: 'servidor', url: '/erroresinternos' },
           { title: 'servidor' }
          ]
        }
      },


    ],
  }
];
