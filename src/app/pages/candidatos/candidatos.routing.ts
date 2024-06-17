import { Routes } from '@angular/router';
import { FormaPrincipalCandidatosComponent } from './on-boarding/forma-principal/forma-principal.component';
import { CompInicioCandidatoComponent } from './on-boarding/comp-inicio-candidato/comp-inicio-candidato.component';
import { CompReportOnBordingComponent } from './report-on-boarding/report-on-boarding.component';
 
export const CandidatosRutas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'onboarding/:seguimientoId/:email',
        component: FormaPrincipalCandidatosComponent,
        data: {
          title: 'Onboarding',
          urls: [
           { title: 'Onboarding', url: '/candidatos' },
           { title: 'Onboarding' }
          ]
        }
      },
      {
        path: 'seguimiento-candidatos',
        component: CompReportOnBordingComponent,
        data: {
          title: 'seguimiento-candidatos',
          urls: [
           { title: 'seguimiento-candidatos', url: '/candidatos' },
           { title: 'seguimiento-candidatos' }
          ]
        }
      },
      {
        path: 'inicio',
        component: CompInicioCandidatoComponent,
        data: {
          title: 'Inicio',
          urls: [
           { title: 'Inicio', url: '/inicio' },
           { title: 'Inicio' }
          ]
        }
      },
    


    ],
  }
];
