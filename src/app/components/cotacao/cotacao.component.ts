import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Cotacao } from 'src/app/models/cotacao';
import { CotacaoService } from 'src/app/services/cotacao.service';

@Component({
    selector: 'app-cotacao',
    templateUrl: './cotacao.component.html',
    styleUrls: ['./cotacao.component.scss'],
})
export class CotacaoComponent {
    cotacao$!: Observable<Cotacao>;

    constructor(
        private cotacaoService: CotacaoService
    ) {}

    buscarCotacao(): void {
        this.cotacao$ = this.cotacaoService.buscarCotacao()
            .pipe(
                shareReplay()
            );
    }
}
