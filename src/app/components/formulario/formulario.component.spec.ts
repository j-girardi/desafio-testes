import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FormularioService } from 'src/app/services/formulario.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let formularioService: FormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formularioService = TestBed.inject(FormularioService);
  });

  it('Ao inicializar o componente, não deve haver nenhuma mensagem de erro sendo exibida na tela', () => {
    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement).toBeNull();
  });

  it('Se o campo 1 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório”.', () =>{
    const valor1Control = component.form.get('valor1');

    valor1Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor1');
    expect(errorMessageElement.textContent).toContain('Campo obrigatório');
  })
  
  it('Se o campo 1 estiver com um valor menor que zero, deve mostrar a mensagem “Valor deve ser maior ou igual a 0”', () =>{
    const valor1Control = component.form.get('valor1');

    valor1Control?.setValue(-1);
    valor1Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor1');
    expect(errorMessageElement.textContent).toContain('Valor deve ser maior ou igual a 0');
  })

  it('Se o campo 1 estiver com um valor maior que 100, deve mostrar a mensagem “Valor deve ser menor ou igual a 100”', () =>{
    const valor1Control = component.form.get('valor1');

    valor1Control?.setValue(101);
    valor1Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor1');
    expect(errorMessageElement.textContent).toContain('Valor deve ser menor ou igual a 100');
  })

  it('Se o campo 2 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório”', () =>{
    const valor2Control = component.form.get('valor2');

    valor2Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor2');
    expect(errorMessageElement.textContent).toContain('Campo obrigatório');
  })

  it('Se o campo 2 estiver com um valor menor que 100, deve mostrar a mensagem “Valor deve ser maior ou igual a 100”', () =>{
    const valor1Control = component.form.get('valor2');

    valor1Control?.setValue(50);
    valor1Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor2');
    expect(errorMessageElement.textContent).toContain('Valor deve ser maior ou igual a 100');
  })

  it('Se o campo 2 estiver com um valor maior que 200, deve mostrar a mensagem “Valor deve ser menor ou igual a 200”', () =>{
    const valor1Control = component.form.get('valor2');

    valor1Control?.setValue(201);
    valor1Control?.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement: HTMLElement = fixture.nativeElement.querySelector('#error-valor2');
    expect(errorMessageElement.textContent).toContain('Valor deve ser menor ou igual a 200');
  })

  it('Se o formulário estiver inválido, o botão de salvar deve estar desabilitado.', () => {
    const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    component.form.get('valor1')?.setValue(''); // Define o campo1 como inválido
    fixture.detectChanges();

    expect(saveButtonElement.disabled).toBe(true);
  });

  it('Se o formulário estiver válido, o botão de salvar deve estar habilitado.', () =>{
    const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    // Simula um estado de formulário inválido
    component.form.get('valor1')?.setValue(5); // Define um valor1 valido
    component.form.get('valor2')?.setValue(105); // Define um valor2 valido
    fixture.detectChanges();

    expect(saveButtonElement.disabled).toBe(false);
  })

  it('Se houver sucesso ao salvar, deve mostrar a mensagem de sucesso.', () =>{
    const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    // Simula um estado de formulário inválido
    spyOn(component, 'salvoComSucesso');
    component.form.get('valor1')?.setValue(5); // Define um valor1 valido
    component.form.get('valor2')?.setValue(105); // Define um valor2 valido
    fixture.detectChanges();
    // Mock da função de salvamento
    saveButtonElement.click(); // Simula um clique no botão de salvar
    
    expect(component.salvoComSucesso).toHaveBeenCalled();
  })
  
  it('Se a soma dos números não for par e for clicado em salvar, deve mostrar a mensagem de erro de número par.', () =>{
    const saveButtonElement = fixture.nativeElement.querySelector('.btn');

    component.form.get('valor1')?.setValue(5); 
    component.form.get('valor2')?.setValue(106);
    fixture.detectChanges();
    saveButtonElement.click();

    const erroPar = component.mensagemErroPar;
    expect(erroPar).toBe(true);
  })
 
  it('Se houver erro ao salvar, deve mostrar a mensagem de erro ao salvar.', (() =>{
    const saveButtonElement = fixture.nativeElement.querySelector('.btn');

    spyOn(formularioService, 'salvar').and.returnValue(throwError(new Error('Erro ao salvar')));
    
    component.form.get('valor1')?.setValue(50);
    component.form.get('valor2')?.setValue(150);
    fixture.detectChanges();
    saveButtonElement.click();
    fixture.detectChanges();

    const erroSalvar = component.mensagemErroAoSalvar;
    expect(erroSalvar).toBe(true);
  }));

    it('Se o formulário for inválido, não deve chamar o método de salvar do formularioService.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(formularioService, 'salvar');

        component.form.get('valor1')?.setValue(null); // valor1 para tornar o form invalido
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();

        expect(formularioService.salvar).not.toHaveBeenCalled();
    }));
    
    it('Se a soma dos números não for par, não deve chamar o método de salvar do formularioService.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(formularioService, 'salvar');

        component.form.get('valor1')?.setValue(55);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();

        expect(formularioService.salvar).not.toHaveBeenCalled();
    }));
    
    it('Se o formulário for válido e a soma dos números for par, deve chamar o método de salvar do formularioService.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(formularioService, 'salvar');

        component.form.get('valor1')?.setValue(50);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();

        expect(formularioService.salvar).toHaveBeenCalled();
    }));
    
    it('Se salvou com sucesso, deve chamar o método de salvoComSucesso.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(component, 'salvoComSucesso');

        component.form.get('valor1')?.setValue(50);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();

        expect(component.salvoComSucesso).toHaveBeenCalled();
    }));
    
    it('Se houve erro ao salvar, deve chamar o método erroAoSalvar.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(component, 'erroAoSalvar');
        spyOn(formularioService, 'salvar').and.returnValue(throwError(new Error('Erro ao salvar')));
        
        component.form.get('valor1')?.setValue(50);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();

        expect(component.erroAoSalvar).toHaveBeenCalled();
    }));
    
    // it('As mensagens só devem ficar visíveis por 3 segundos na tela.',  (() => {
        //     const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');
        //     component.form.get('valor1')?.setValue(50);
        //     component.form.get('valor2')?.setValue(150); 
        //     fixture.detectChanges();
        //     saveButtonElement.click();
        //     // fixture.detectChanges();
        //     // component.mensagemSalvoComSucesso = true; // Mostra a mensagem de sucesso
        //     // fixture.detectChanges();
        //     spyOn(component, 'agendaResetarMensagem');
        //     expect(component.agendaResetarMensagem).toHaveBeenCalled();
        //     // const mensagemSucessoElement: HTMLElement = fixture.nativeElement.querySelector('#mensagem-sucesso');
        //     // expect(mensagemSucessoElement).toBeTruthy(); // Verifica se a mensagem de sucesso está visível
        //     // tick(3100); // Avança o tempo em 3 segundos
        //     // fixture.detectChanges();
        //     // expect(mensagemSucessoElement.style.display).toBe('none'); // Verifica se a mensagem de sucesso foi oculta
        
        // }));
        
    it('Quando a soma dos dois campos for par, o método verificaNumeroPar deve retornar true', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(component, 'verificaNumeroPar')
        component.form.get('valor1')?.setValue(50);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();
        
        expect(component.verificaNumeroPar).toBeTrue;
    }));

    it('Quando a soma dos dois campos for ímpar, o método verificaNumeroPar deve retornar false.', (() => {
        const saveButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

        spyOn(component, 'verificaNumeroPar')
        component.form.get('valor1')?.setValue(51);
        component.form.get('valor2')?.setValue(150); 
        fixture.detectChanges();
        saveButtonElement.click();
        
        expect(component.verificaNumeroPar).toBeFalse;
    }));    
});
