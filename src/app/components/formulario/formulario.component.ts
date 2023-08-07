import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
    form!: FormGroup;

    controls!: {[key: string]: AbstractControl};
    mensagemErroPar = false;
    mensagemErroAoSalvar = false;
    mensagemSalvoComSucesso = false;
    timeout: any;
    formGroup: any;

    constructor(
        private formBuilder: FormBuilder,
        private formularioService: FormularioService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            valor1: [null, [Validators.min(0), Validators.max(100), Validators.required]],
            valor2: [null, [Validators.min(100), Validators.max(200), Validators.required]]
        });

        this.controls = this.form.controls;
    }

    verificaNumeroPar(): boolean {
        return (+this.controls['valor1'].value + +this.controls['valor2'].value) % 2 === 0;
    }

    salvar(): void {
        this.resetarMensagens();
        if (this.form.invalid) {
            return;
        }

        if (!this.verificaNumeroPar()) {
            this.mensagemErroPar = true;
            this.agendaResetarMensagem();
            return;
        }

        this.formularioService.salvar()
            .subscribe({
                next: () => this.salvoComSucesso(),
                error: () => this.erroAoSalvar()
            });
    }

    agendaResetarMensagem(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.resetarMensagens();
        }, 3000);
    }

    resetarMensagens() {
        this.mensagemErroAoSalvar = false;
        this.mensagemErroPar = false;
        this.mensagemSalvoComSucesso = false;
    }

    salvoComSucesso(): void {
        this.mensagemSalvoComSucesso = true;
        this.agendaResetarMensagem();
    }

    erroAoSalvar(): void {
        this.mensagemErroAoSalvar = true;
        this.mensagemSalvoComSucesso = true;
        this.agendaResetarMensagem();
    }
}
