import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from 'src/app/models/cotacao';

@Injectable({
    providedIn: 'root',
})
export class CotacaoService {
    constructor(
        private http: HttpClient
    ) {}

    buscarCotacao(): Observable<Cotacao> {
        return this.http.get<Cotacao>('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    }
}
