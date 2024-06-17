import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

// Función para calcular el dígito de verificación de la CURP
function calcularDigitoVerificador(curp17: string): number {
  const diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let largo = curp17.length;
  let i = 0;
  let suma = 0;
  for(i = 0; i < largo; i++)
    suma = suma + diccionario.indexOf(curp17.charAt(i)) * (largo - i);
  let digitoVerificador = 10 - suma % 10;
  if(digitoVerificador === 10)
    return 0;
  return digitoVerificador;
}

// Validador personalizado para la CURP
export function validarCURP(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const curp = control.value;
    if (!curp) {
      return null;  // No valida si el campo está vacío, eso lo maneja Validators.required
    }
    // Expresión regular para validar el formato de la CURP
    const formatoValido = /^[A-Z]{4}\\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}A-Z\\d$/;
    const validado = curp.match(formatoValido);
    if (!validado) {
      return { 'curpInvalida': { value: control.value } };
    }
    // Verificar que el dígito verificador es correcto
    const digitoVerificador = calcularDigitoVerificador(validado[1]);
    if (digitoVerificador !== parseInt(validado[2])) {
      return { 'curpInvalida': { value: control.value } };
    }
    return null;
  };
}

// Uso del validador en un campo de formulario
curp: ['', [Validators.required, validarCURP()]]
