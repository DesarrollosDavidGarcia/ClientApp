import { NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  ConnectionAPI: 'https://localhost:7135',
  connectionAPISAC: 'http://localhost:15564',
  production: true,
  apiUrl: 'https://localhost:7135/api/LogsCliente', // Reemplazar con API remoto
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  recaptcha: {
    siteKey: '6LdLJk4pAAAAAFXn1hzNkRV681oiYGk-QKsyv7t1',
  }
};

