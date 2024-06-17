import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/seguridad/login';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { NGXLogger } from 'ngx-logger';
import { SweetAlertIcon } from 'sweetalert2';
import { Credencial } from 'src/app/models/seguridad/credencial';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  get f() {
    return this.forma.controls;
  }
  key: string = environment.recaptcha.siteKey;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private autenticacion: AutenticacionService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.forma = this.formBuilder.group({
      usuario: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
          ),
          Validators.minLength(8),
        ]),
      ],
      recaptcha: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    let respuesta: ResultVM<Credencial>;
    try {
      if (this.forma.valid) {
        if (this.forma.valid) {
          const modelo = this.forma.value as Login;
          respuesta = await this.ctx.login.signIn(modelo);
          if (respuesta.isSuccess) {
            this.autenticacion.asignarCredencial(respuesta.data);
            
            if(respuesta.data.codigoPerfil == "PRL04")
            {
              this.router.navigate(['/candidatos/inicio']);
            }else{
              this.router.navigate(['/candidatos/seguimiento-candidatos']);
            }
           
          } else {
            this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
          }
        }

      }
    } catch (error) {
      this.logger.error(error);
      // this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
    }
  }
  handleSuccess(token: string) {
    this.forma.controls['recaptcha'].setValue(token);
    if (token != null) {

    }
  }

  handleLoad() {
  }

  handleExpire() {
    this.forma.controls['recaptcha'].reset();
  }

  handleReset() {
    this.forma.controls['recaptcha'].reset();
  }

}
// // // // https://dev.to/isaacojeda/parte-3-cqrs-y-mediatr-automapper-249n
