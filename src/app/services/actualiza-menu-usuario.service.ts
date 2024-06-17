import { Injectable, Inject } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActualizaMenuUsuarioService {

    public si = new BehaviorSubject<boolean>(false);
    constructor() {
    }


}
