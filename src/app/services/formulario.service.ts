import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FormularioService {

    salvar(): Observable<boolean> {
        return of(true);
    }
}
