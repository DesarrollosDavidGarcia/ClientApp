import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';
import { Perfiles } from 'src/app/models/seguridad/perfiles';
import { Permisos } from 'src/app/models/seguridad/permisos';
import { PermisosPorPerfil } from 'src/app/models/seguridad/permisos-por-perfil';
import { PermisosPorUsuario } from 'src/app/models/seguridad/permisos-por-usuario';
import { Usuarios } from 'src/app/models/seguridad/usuarios';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
@Component({
  selector: 'app-forma-usuario',
  templateUrl: './forma-usuario.component.html',
  styleUrls: ['./forma-usuario.component.scss'],
})
export class FormaUsuarioComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  subsGuardar: Subscription;
  visible: boolean = false;
  guardado: EventEmitter<void> = new EventEmitter<void>();
  get f() {
    return this.forma.controls;
  }
  modelo: Usuarios;
  id: any;
  listaPerfiles: Perfiles[] = [];
  listaPermisos: Permisos[] = [];

  listaPerfilesSeleccionados: Perfiles[] = [];
  listaPermisosSeleccionados: PermisosPorPerfil[] = [];
  actualizar: boolean;
  chkActualiza: boolean;

  fotoPerfil: string;
  constructor(
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private activatedRouter: ActivatedRoute,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private router: Router,
    private refrescaMenu: ActualizaMenuUsuarioService,
    private auth: AutenticacionService
  ) {
    this.id = activatedRouter?.snapshot?.paramMap?.get('id');

    this.visible = this.auth.credencial.codigoPerfil == "PRL01" || this.auth.credencial.codigoPerfil == "PRL02" ? true : false;
  }

  async ngOnInit(): Promise<void> {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.nullValidator],
      apellidoMaterno: ['', Validators.nullValidator],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      celular: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      
      email: ['', [Validators.required, Validators.email]],
      perfilId: [undefined, Validators.nullValidator],
      permisosPorUsuario: [null, Validators.nullValidator],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
          ),
          Validators.minLength(8),
        ],
      ],
      contrasenaConfirmacion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
          ),
          Validators.minLength(8),
        ],
      ],
      actualizoContra: [false, Validators.nullValidator],
      foto: ['', Validators.nullValidator],
    });

    await this.perfiles();
    // await this.permisos();

    if (+this.id > 0) {
      let respuesta = await this.ctx.usuarios.getUserWithPerfilPhoto(+this.id);
      if (respuesta.isSuccess) {
        this.modelo = respuesta.data;
        Object.assign(this.forma.value, respuesta.data);
        this.forma.reset(this.forma.value);
        this.listaPerfiles
          .filter((e) => e.id == this.modelo.perfilId)
          .map((e) => (e.seleccionado = true))[0];
        this.listaPerfilesSeleccionados.push(
          this.listaPerfiles.filter((e) => e.id == this.modelo.perfilId)[0]
        );
        this.fotoPerfil = this.modelo.fotoPerfil;
      }
      this.actualizar = false;
      this.chkActualiza = true;
    } else {
      this.actualizar = true;
      this.chkActualiza = false;
    }
    if (!this.actualizar) {
      this.f['actualizoContra'].setValue(this.actualizar);
      this.f['contrasena'].setValidators([Validators.nullValidator]);
      this.f['contrasena'].clearValidators();
      this.f['contrasena'].updateValueAndValidity();

      this.f['contrasenaConfirmacion'].setValidators([
        Validators.nullValidator,
      ]);
      this.f['contrasenaConfirmacion'].clearValidators();
      this.f['contrasenaConfirmacion'].updateValueAndValidity();
    }
  }
  async guardar(): Promise<void> {
    let respuesta;
    try {
      if (this.forma.valid) {
        const model = this.forma.value as Usuarios;
        model.perfilId = this.listaPerfilesSeleccionados[0].id;
        model.fotoPerfil = this.fotoPerfil;
        if (+this.id && +this.id !== 0) {
          respuesta = await this.ctx.usuarios.updateUserWithPhotoAsync(this.id, model);
        } else {
          respuesta = await this.ctx.usuarios.addUserWithPhotoAsync(model);
        }
        this.refrescaMenu.si.next(true);
        if (respuesta.isSuccess) {
          this.alerta.mostrarMensaje(
            respuesta.message,
            respuesta.icon as SweetAlertIcon
          );

          if (this.auth.credencial.codigoPerfil == "PRL01" || this.auth.credencial.codigoPerfil == "PRL02") {
            this.router.navigate(['/seguridad/usuarios']);
          } else {
            this.router.navigate(['/candidatos/inicio']);
          }

        } else {
          this.alerta.mostrarMensaje(
            respuesta.message,
            respuesta.icon as SweetAlertIcon
          );
        }
      } else {
        this.alerta.mostrarMensaje(
          'Ingrese los campos que se encuentran en rojo',
          'warning'
        );
      }
    } catch (error) {
      this.alerta.mostrarMensajeErrorInterno();
      this.logger.error(error);
    }
  }

  async perfiles(): Promise<void> {
    try {
      let respuesta = await this.ctx.perfiles.getAllActives();
      if (respuesta.isSuccess) {
        this.listaPerfiles = respuesta.data;
      }
    } catch (error) {
      this.alerta.mostrarMensajeErrorInterno();
    }
  }

  async permisos(): Promise<void> {
    try {
      let respuesta = await this.ctx.permisos.getAllActives();
      if (respuesta.isSuccess) {
        this.listaPermisos = respuesta.data;
      }
    } catch (error) {
      this.alerta.mostrarMensajeErrorInterno();
    }
  }

  asignarPerfil(perfil: Perfiles): void {
    if (this.listaPerfilesSeleccionados.length < 1) {
      perfil.seleccionado = true;
      this.listaPerfilesSeleccionados.push(perfil);
    }
  }

  removerPerfil(perfil: Perfiles) {
    perfil.seleccionado = false;
    this.listaPerfilesSeleccionados = this.listaPerfilesSeleccionados.filter(
      (e) => e.id != perfil.id
    );
  }

  actualizarContrasena(valor: any): void {
    this.actualizar = valor.checked;
    if (this.actualizar) {
      this.f['actualizoContra'].setValue(this.actualizar);
      this.f['contrasena'].setValidators([
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        ),
        Validators.minLength(6),
      ]);
      this.f['contrasenaConfirmacion'].setValidators([
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        ),
        Validators.minLength(6),
      ]);
    } else {
      this.f['actualizoContra'].setValue(this.actualizar);
      this.f['contrasena'].setValidators([Validators.nullValidator]);
      this.f['contrasena'].clearValidators();
      this.f['contrasena'].updateValueAndValidity();

      this.f['contrasenaConfirmacion'].setValidators([
        Validators.nullValidator,
      ]);
      this.f['contrasenaConfirmacion'].clearValidators();
      this.f['contrasenaConfirmacion'].updateValueAndValidity();
    }
  }

  cargarFoto(e: any) {
    const file = (e.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPerfil = reader.result as string;
      this.forma.patchValue({ foto: this.fotoPerfil });
      this.forma.get('foto')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void { }
}
