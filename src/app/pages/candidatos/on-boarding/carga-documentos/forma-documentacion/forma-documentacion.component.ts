import { Component, OnInit, EventEmitter, OnDestroy, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { CategoriaDocumentos } from 'src/app/models/catalogos/categoria-documentos';
import { DocumentacionCandidato } from 'src/app/models/catalogos/documentacion-colaborador';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
@Component({
  selector: 'app-documentacion',
  templateUrl: './forma-documentacion.component.html',
  styleUrls: ['./forma-documentacion.component.scss'],
})
export class FormaDocumentacionComponent implements OnInit, OnDestroy {
  @Output() formaDocumentos = new EventEmitter<FormGroup>();
  @ViewChild(FormaDocumentacionComponent)

  subsGuardar: Subscription;
  documentoEvent: EventEmitter<DocumentacionCandidato> = new EventEmitter<DocumentacionCandidato>();
  public forma: FormGroup;
  get f() {
    return this.forma.controls;
  }

  listaDocumentosParaAlta: CategoriaDocumentos[] = [];
  listaDocumentosParaFirmar: CategoriaDocumentos[] = [];
  camposDinamicos: { [key: string]: any } = {};


  listaDocumentosCargados: DocumentacionCandidato[] = [];





  @ViewChild('inputField') inputField: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private activatedRouter: ActivatedRoute,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private router: Router,
    private refrescaMenu: ActualizaMenuUsuarioService,

  ) {



  }

  ngOnInit(): void {



  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void { }


  adjuntarDocumento(e: any, categoria: CategoriaDocumentos): void {
    const file = (e.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let documento = new DocumentacionCandidato();
        const splitFileName = file.name.split('.');
        const extension = "." + splitFileName.pop();
        const nombreSinCaracteresEspeciales = splitFileName.join('_').replace(/[^a-zA-Z0-9]/g, '_');
        // Verificar que la extensión del archivo sea .pdf
        if (extension.toLowerCase() !== categoria.extension) {
          
          categoria.esCargado = false;
          this.alerta.mostrarMensaje("El documento que estas subiendo tiene una extensión " + extension + " incorrecta, la correcta es:  " + categoria.extension, "info" as SweetAlertIcon);
          return;
        }
        documento.id = categoria.id;
        documento.tipoFormato = reader.result.toString().split(",")[0] + ",";
        documento.nombreDocumento = `${nombreSinCaracteresEspeciales}${extension}`;
        documento.extension = extension;
        documento.base64 = reader.result.toString();
        documento.tipoDocumento = categoria.nombre;
        this.documentoEvent.next(documento);
        categoria.esCargado = true;
        categoria.nombreDocumentoSeleccionado = `${nombreSinCaracteresEspeciales}${extension}`;
      };
      reader.readAsDataURL(file);
    }
  }




  limpiarDocumentosAltaSeleccionDocumento(codigo: string) {
    let categoria = this.listaDocumentosParaAlta.find(e => e.codigo === codigo);
    if (categoria) {
      categoria.nombreDocumentoSeleccionado = '';
      categoria.seguimientoCandidatoId = null;
      categoria.esCargado = false;
    }
  }

  limpiarDocumentosPorFirmarSeleccionDocumento(codigo: string) {
    let categoria = this.listaDocumentosParaFirmar.find(e => e.codigo === codigo);
    if (categoria) {
      categoria.nombreDocumentoSeleccionado = '';
      categoria.seguimientoCandidatoId = null;
      categoria.esCargado = false;
    }
  }

  async descargarDocumento(documentoId: number, seguimientoId: number, nombreDocumento: string) {
    let respuesta: ResultVM<string>;
    try {
      respuesta = await this.ctx.candidatos.descargarDocumento(documentoId, seguimientoId);
      if (respuesta.isSuccess) {
        this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
        const source = respuesta.data;
        const link = document.createElement("a");
        link.href = source;
        link.download = nombreDocumento;
        link.click();
      }
    } catch (error) {

    }

  }
  async eliminarDocumento(categoriaDocumento: CategoriaDocumentos) {
    let respuesta: ResultVM<string>;
    try {

      let documentoAlta = this.listaDocumentosParaAlta.find(e => e.codigo == categoriaDocumento.codigo);
      if (documentoAlta) {
        documentoAlta.esCargado = false;
        documentoAlta.nombreDocumentoSeleccionado = "";
      } else {
        let documentoPorFirmar = this.listaDocumentosParaFirmar.find(e => e.codigo == categoriaDocumento.codigo);
        if (documentoPorFirmar) {
          documentoPorFirmar.esCargado = false;
          documentoPorFirmar.nombreDocumentoSeleccionado = "";
        }
      }

      if (categoriaDocumento.documentoSeleccionadoId, categoriaDocumento.seguimientoCandidatoId) {
        respuesta = await this.ctx.candidatos.eliminarDocumentoPorSeguimiento(categoriaDocumento.documentoSeleccionadoId, categoriaDocumento.seguimientoCandidatoId);
        this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
      }
      this.listaDocumentosParaAlta = this.listaDocumentosParaAlta;
      this.listaDocumentosParaFirmar = this.listaDocumentosParaFirmar;
    } catch (error) {
    }
  }

  descargarDocumentoPrivacidad(codigo: string) {

  }
}


