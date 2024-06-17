import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DatosCandidatos } from 'src/app/models/onboarding/datos-candidatos';
import { ContextoService } from 'src/app/services/contexto.service';
import { FormaDatosBasicosComponent } from '../forma-datos-basicos/forma-datos-basicos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forma-principal-candidatos',
  templateUrl: './forma-principal.component.html',
  styleUrls: ['./forma-principal.component.scss'],
})
export class FormaPrincipalCandidatosComponent implements OnInit, OnDestroy {

  constructor(
    private ctx: ContextoService,
    private route: ActivatedRoute,
  ) {

    this.route.snapshot.params["seguimientoId"];
    this.route.snapshot.params["email"];


  }

  ngOnInit() {}

  ngOnDestroy(): void { }
}
