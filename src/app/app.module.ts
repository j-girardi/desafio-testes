import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CotacaoComponent } from './components/cotacao/cotacao.component';
import { FormularioComponent } from './components/formulario/formulario.component';

registerLocaleData(ptBr);

@NgModule({
    declarations: [
        AppComponent,
        FormularioComponent,
        CotacaoComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
