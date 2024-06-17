import { Component, OnInit, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Habitos } from 'src/app/models/onboarding/candidato';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-habitos',
  templateUrl: './forma-habitos.component.html',
  styleUrls: ['./forma-habitos.component.scss'],
})
export class FormaHabitosComponent implements OnInit, OnDestroy {
  @Output() formaGeneral = new EventEmitter<FormGroup>();
  @ViewChild(FormaHabitosComponent)


  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();

  public forma: FormGroup;
  get f() {
    return this.forma.controls;
  }

  datosHabitos: Habitos;
  constructor(
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private activatedRouter: ActivatedRoute,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private router: Router,
    private refrescaMenu: ActualizaMenuUsuarioService
  ) {


  }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
     
      fuma: [false, Validators.nullValidator],
      fumaDesde: [{ value: '', disabled: true }, Validators.nullValidator],
      cigarrosDiarios: [{ value: '', disabled: true }, Validators.nullValidator], 
      
      aplicaBebibasAlcolicas: [false, Validators.nullValidator],
      bebidasAlcoholicasDesde: [{ value: '', disabled: true }, Validators.nullValidator],
      bebidasAlcoholicasDiarias: [{ value: '', disabled: true }, Validators.nullValidator],
      tazasCafe: [0, Validators.nullValidator],
      
      aplicaSustanciaNociva: [false, Validators.required],
      sustanciaNociva: [{ value: '', disabled: true }, Validators.required],
      tiempoUsoSustanciaNociva: [{ value: '', disabled: true }, Validators.required],
     
      aplicaDroga: [false, Validators.required],
      tipoDroga:[{ value: '', disabled: true }, Validators.required],
      tiempoUsoDroga: [{ value: '', disabled: true }, Validators.required],
      motivoConsumaDroga: [{ value: '', disabled: true }, Validators.required],
      formularioCompletado:[null]
    });
 
     
  }

  async ngAfterViewInit(): Promise<void> {}
  ngOnDestroy(): void { }
  aplicaSiFuma(model: any) {
    let m = model.value as string;
    this.f["fuma"].setValue(m == "1" ? true : false);
    if (m == "1") {
      this.f["fumaDesde"].enable();
      this.f["cigarrosDiarios"].enable();
      this.f["fumaDesde"].setValue("");
      this.f["cigarrosDiarios"].setValue("");

    } else {
      this.f["fumaDesde"].disable();
      this.f["cigarrosDiarios"].disable();
      this.f["fumaDesde"].setValue("");
      this.f["cigarrosDiarios"].setValue("");
    }
  }

  aplicaBebibasAlcolicas(model: any) {
    let m = model.value as string;
    this.f["aplicaBebibasAlcolicas"].setValue(m == "1" ? true : false);
   
    if (m == "1") {
      this.f["bebidasAlcoholicasDesde"].enable();
      this.f["bebidasAlcoholicasDiarias"].enable();
      this.f["bebidasAlcoholicasDesde"].setValue("");
      this.f["bebidasAlcoholicasDiarias"].setValue("");

    } else {
      this.f["bebidasAlcoholicasDesde"].disable();
      this.f["bebidasAlcoholicasDiarias"].disable();
      this.f["bebidasAlcoholicasDesde"].setValue("");
      this.f["bebidasAlcoholicasDiarias"].setValue("");
    }
  }

  aplicaSustanciaNociva(model: any) {
    let m = model.value as string;
    this.f["aplicaSustanciaNociva"].setValue(m == "1" ? true : false);
    if (m == "1") {
      this.f["sustanciaNociva"].enable();
      this.f["tiempoUsoSustanciaNociva"].enable();
      this.f["sustanciaNociva"].setValue("");
      this.f["tiempoUsoSustanciaNociva"].setValue("");

    } else {
      this.f["sustanciaNociva"].disable();
      this.f["tiempoUsoSustanciaNociva"].disable();
      this.f["sustanciaNociva"].setValue("");
      this.f["tiempoUsoSustanciaNociva"].setValue("");
    }
  }

  aplicaDroga(model: any) {
    let m = model.value as string;
    this.f["aplicaDroga"].setValue(m == "1" ? true : false);


 

    if (m == "1") {
      this.f["tipoDroga"].enable();
      this.f["tiempoUsoDroga"].enable();
      this.f["motivoConsumaDroga"].enable();

      this.f["tipoDroga"].setValue("");
      this.f["tiempoUsoDroga"].setValue("");
      this.f["motivoConsumaDroga"].setValue("");

      this.forma.get('tipoDroga').setValidators([Validators.required]);
      this.forma.get('tiempoUsoDroga').setValidators([Validators.required]);
      this.forma.get('motivoConsumaDroga').setValidators([Validators.required]);

    } else {
      this.f["tipoDroga"].disable();
      this.f["tiempoUsoDroga"].disable();
      this.f["motivoConsumaDroga"].disable();

      this.f["tipoDroga"].setValue("");
      this.f["tiempoUsoDroga"].setValue("");
      this.f["motivoConsumaDroga"].setValue("");

      this.forma.get('tipoDroga').setValidators([Validators.nullValidator]);
      this.forma.get('tiempoUsoDroga').setValidators([Validators.nullValidator]);
      this.forma.get('motivoConsumaDroga').setValidators([Validators.nullValidator]);
    }
    this.forma.get('tipoDroga').updateValueAndValidity();
    this.forma.get('tiempoUsoDroga').updateValueAndValidity();
    this.forma.get('motivoConsumaDroga').updateValueAndValidity();

  }
}
