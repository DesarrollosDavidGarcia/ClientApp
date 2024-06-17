import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Registro } from 'src/app/models/registro/registro';
import { Usuarios } from 'src/app/models/seguridad/usuarios';
import { Empresas } from 'src/app/models/socios/empresa/empresas';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { ResultVM } from 'src/app/models/utils/resultVM';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = Object.create(null);

  formaUsuario: FormGroup;
  formaEmpresa: FormGroup;
  get fu() {
    return this.formaUsuario.controls;
  }
  get fe() {
    return this.formaEmpresa.controls;
  }
  siteKey: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
  ) {
    this.siteKey =environment.recaptcha.siteKey;
  }

  ngOnInit(): void {
    this.formaUsuario = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      celular: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      email: ['', Validators.compose([Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
      ),
      Validators.minLength(8)])],
      confirmacionContrasena: ['', Validators.compose([Validators.required, Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
      ),
      Validators.minLength(8)])]

    });
    this.formaEmpresa = this.formBuilder.group({
      nombreEmpresa: ['', Validators.required],
      direccion: ['', Validators.required],
      tieneMasEmpresas: [false, Validators.nullValidator],
      telefono: ['', Validators.nullValidator],
      rfc: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  async guardar(): Promise<void> {
    let respuesta: ResultVM<Registro>;
    let registro: Registro = new Registro();
    try {
      if (this.formaUsuario.valid) {

        const modeloUsuario = this.formaUsuario.value as Usuarios;
        const modeloEmpresa = this.formaEmpresa.value as Empresas;
        registro.empresa = modeloEmpresa;
        registro.usuario = modeloUsuario;

        respuesta = await this.ctx.registro.usuarioRegistro(registro).toPromise();
        if (respuesta.isSuccess) {
          this.alerta.mostrarMensaje(
            respuesta.message,
            respuesta.icon as SweetAlertIcon
          );
          this.router.navigate(['/']);
        } else {
          this.alerta.mostrarMensaje(
            respuesta.message,
            respuesta.icon as SweetAlertIcon
          );
        }
      } else {
        this.alerta.mostrarMensaje('Formulario invalido...', 'warning');
      }

    } catch (error) {
      this.logger.error(error);
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
    }

  }

  login(){
    this.router.navigate(['/autenticacion/login']);
  }

  verContrasena(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }


}
