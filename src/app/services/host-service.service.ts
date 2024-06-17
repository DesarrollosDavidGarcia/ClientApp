import { Injectable, Inject } from '@angular/core';
import { WINDOW } from './windows.provider';


@Injectable()
export class HostService {
    constructor(@Inject(WINDOW) private window: Window) {
    }
    getHostname() : string {
        return this.window.location.origin + "/HubTablaNotificacion";
    }

}
