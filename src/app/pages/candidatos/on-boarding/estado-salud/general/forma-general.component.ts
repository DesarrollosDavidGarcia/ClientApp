import { Component, OnInit, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { General } from 'src/app/models/onboarding/candidato';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-general',
  templateUrl: './forma-general.component.html',
  styleUrls: ['./forma-general.component.scss'],
})
export class FormaGeneralComponent implements OnInit, OnDestroy {
  @Output() formaGeneral = new EventEmitter<FormGroup>();
  @ViewChild(FormaGeneralComponent)

  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();

  public forma: FormGroup;
  get f() {
    return this.forma.controls;
  }

  datosGenerales: General;

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
      tipoSangreFactor: ['', [
        Validators.required,
        Validators.pattern(/^(A|B|AB|O)[+-]$/)
      ]],
      peso: [null, [
        Validators.required,
        Validators.min(20.01), // Mayor a 20
        Validators.max(199.99), // Menor a 200
        Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") // Permite decimales hasta dos dígitos
      ]],
      estatura: [null, [
        Validators.required,
        Validators.min(0.01), // Mayor a 0
        Validators.max(2.99), // Menor a 3
        Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") // Permite decimales hasta dos dígitos
      ]],
      fechaUltimoExamenMedico: [null, Validators.nullValidator],
      aplicaDonaciones: [null, Validators.required],
      porqueAplicaDonacion: ['', Validators.nullValidator],
      medicamentoHabitual: ['', Validators.nullValidator],
      intervencionQuirurgica: ['', Validators.nullValidator],
      medicamentosPreescripcion: ['', Validators.nullValidator],
      medicamentosAlergicos: ['', Validators.nullValidator],
      otrasAlergias: ['', Validators.nullValidator],
      aplicaLentes: [null, Validators.nullValidator],
      formularioCompletado: [null]
    });


  }

  async ngAfterViewInit(): Promise<void> {
    
  }


  ngOnDestroy(): void { }

  aplicaDonaciones(model: any) {
    let m = model.value as string;
    this.f["aplicaDonaciones"].setValue(m == "1" ? true : false);
  }


  aplicaLentes(model: any) {
    let m = model.value as string;
    this.f["aplicaLentes"].setValue(m == "1" ? true : false);
  }

}
