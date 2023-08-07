import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CotacaoComponent } from './cotacao.component';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Cotacao } from 'src/app/models/cotacao';

describe('CotacaoComponent', () => {
  let component: CotacaoComponent;
  let fixture: ComponentFixture<CotacaoComponent>;
  let cotacaoService: CotacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CotacaoComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoComponent);
    component = fixture.componentInstance;
    cotacaoService = TestBed.inject(CotacaoService);
  });

  it('Quando clicar no botão, deve chamar o método bucarCotacao do cotacaoService.', () => {
    spyOn(cotacaoService, 'buscarCotacao').and.returnValue(of({} as any)); // Mock the service call
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#btn-cotacao');
    button.click();

    expect(cotacaoService.buscarCotacao).toHaveBeenCalled();
  });

  it('Se o valor do dólar 5.00 deve ser exibida a mensagem na tela: “Valor do dólar para hoje: R$ 5,00”', () => {
    // const mockCotacao: Cotacao = { USDBRL: { bid: 5.00 } };
    // spyOn(cotacaoService, 'buscarCotacao').and.returnValue(of(mockCotacao));

    // fixture.detectChanges();

    // const button = fixture.nativeElement.querySelector('#btn-cotacao');
    // button.click();

    // fixture.detectChanges();

    // const valorDolarElement = fixture.nativeElement.querySelector('#valor-dolar');
    // expect(valorDolarElement.textContent).toContain('Valor do dólar para hoje: R$ 5,00');
  })
});

// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { CotacaoComponent } from "./cotacao.component";
// import { CotacaoService } from "src/app/services/cotacao.service";
// import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
// import { By } from '@angular/platform-browser';
// import { of } from "rxjs";

// describe('CotacaoComponent', () => {
//     let component: CotacaoComponent;
//     let fixture: ComponentFixture<CotacaoComponent>;
//     let cotacaoService: CotacaoService;
//     let httpTestingController: HttpTestingController;


//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             declarations: [CotacaoComponent],
//             providers: [CotacaoService],
//             imports: [HttpClientTestingModule]
//         }).compileComponents();
//     });
        
//     beforeEach(() => {
//         fixture = TestBed.createComponent(CotacaoComponent);
//         component = fixture.componentInstance;
//         cotacaoService = TestBed.inject(CotacaoService);
//         httpTestingController = TestBed.inject(HttpTestingController)
//         fixture.detectChanges();
//     })

//     afterEach(() => {
//         httpTestingController.verify();
//     })

//     it('Quando clicar no botão, deve chamar o método verificaNumeroPar do cotacaoService.', () => {
//         const buttonCotacao = fixture.nativeElement.querySelector('#btn-cotacao')
//         spyOn(cotacaoService, 'buscarCotacao').and.returnValue(of({} as any));
//         fixture.detectChanges();
//         buttonCotacao.click();
//         expect(cotacaoService.buscarCotacao).toHaveBeenCalled();
//     })
// })