import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

// Validador personalizado para el número IMSS
export function validarNumeroIMSS(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const numeroIMSS = control.value;
    if (!numeroIMSS) {
      return null;  // No valida si el campo está vacío, eso lo maneja Validators.required
    }
    // Expresión regular para validar el formato del número IMSS
    const formatoValido = /^[0-9]{11}$/;
    const esValido = formatoValido.test(numeroIMSS);
    return esValido ? null : { 'numeroIMSSInvalido': { value: control.value } };
  };
}