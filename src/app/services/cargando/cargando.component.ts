import { Component } from '@angular/core';
import { CargandoService } from './cargando.service';



@Component({
  selector: 'loading',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss'],
})
export class CargandosComponent {
  constructor(public spinner: CargandoService) { }
}
