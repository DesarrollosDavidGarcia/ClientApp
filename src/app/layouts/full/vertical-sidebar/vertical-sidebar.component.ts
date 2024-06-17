import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { NGXLogger } from 'ngx-logger';
import { PantallasPorMenu } from 'src/app/models/seguridad/pantallas-por-menu';
import { Subscription } from 'rxjs';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: [],
})
export class VerticalAppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _mobileQueryListener: () => void;
  status = true;
  showMenu = '';
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  subclickEvent(): void {
    this.status = true;
  }
  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  fotoPerfil: string="";
  menus: PantallasPorMenu[]=[]
  nombreCompleto: string="";
  subActualizaMenu: Subscription;
  actualizaTodo: boolean= false;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private router: Router,
    private ctx: ContextoService,
    private autenticacion: AutenticacionService,
    private logger: NGXLogger,
    private refresacarMenu: ActualizaMenuUsuarioService,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.subActualizaMenu = this.refresacarMenu.si.subscribe(
      async(resultado) => {
        if (resultado != null && resultado == true) {

          var respuesta = await this.ctx.login.refreshSessionMenuUser(this.autenticacion.credencial.codigoUsuario);
          if(respuesta.isSuccess)
          {
            this.autenticacion.asignarCredencial(respuesta.data);
            this.menus = this.autenticacion.credencial.menus;
            this.nombreCompleto = this.autenticacion.credencial.nombreCompleto;
            this.fotoPerfil =this.autenticacion.credencial.fotoPerfil;
            this.actualizaTodo = true;
          }
        }
      }
    );
    if(this.actualizaTodo== false)
    {
      this.fotoPerfil =this.autenticacion.credencial.fotoPerfil;
      this.menus = this.autenticacion.credencial.menus;
      this.nombreCompleto = this.autenticacion.credencial.nombreCompleto;
    }


  }

  ngOnDestroy(): void {}

  handleNotify() {
    if (window.innerWidth < 1024) {
      this.notify.emit(!this.showClass);
    }
  }

  async salir() {
    try {
      this.autenticacion.salir();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async verPerfil() {
    try {
      this.router.navigate(['/seguridad/usuarios/forma-usuario/', this.autenticacion.credencial.usuarioId]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
