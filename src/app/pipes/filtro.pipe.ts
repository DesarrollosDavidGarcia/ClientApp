import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[],
    texto: string = '',
    columna: string = 'descripcion|codigo'): any[] {
    if (texto === '') {
      return arreglo;
    }
    if (!arreglo) {
      return arreglo;
    }
    texto = texto.toLocaleLowerCase();
    return arreglo.filter(e => e[columna].toLowerCase().includes(texto));
  }

}
