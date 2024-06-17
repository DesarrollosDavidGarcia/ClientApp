// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
     connectionAPI: 'https://localhost:7135',
     connectionAPISAC: 'http://localhost:15564',
     production: true,
     apiUrl: 'https://localhost:7135/api/LogsCliente', // Reemplazar con API remoto
     logLevel: NgxLoggerLevel.TRACE,
     serverLogLevel: NgxLoggerLevel.ERROR,
     recaptcha: {
      siteKey: '6LdLJk4pAAAAAFXn1hzNkRV681oiYGk-QKsyv7t1',

    }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


