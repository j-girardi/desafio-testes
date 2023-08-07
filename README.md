# Desafio PDI Angular - Testes

Este projeto foi criado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.1.2 and [Node](https://nodejs.org/) 16.16.0

## Objetivo:
O objetivo deste desafio é aprender um pouco mais sobre como criar testes para serem usados em aplicações Angular. Ao final, você deverá saber mockar dados, criar testes unitários, testes de DOM e testes assíncronos. Com isso, você será capaz de aumentar a cobertura de testes dos seus códigos e ter mais segurança no seu dia a dia.   
O desafio será focado nos testes de componentes, que são os mais abrangentes. Com base nestes testes, também é possível replicar estes conhecimentos para outros elementos do Angular, como services, diretivas e pipes.  
Também, por hora, não focaremos em testes de requisições HTTP.



## Desafio:
Para facilitar o desenvolvimento e acompanhamento do que vocễ fará, vamos estruturar esse desafio em pequenos passos. 

- Faça um fork deste projeto.
- Instale as depnedências e coloque o projeto rodar com ng s.
- Verifique que o projeto terá os seguintes componentes:
  - 1º componente: é um pequeno formulário com dois campos e um botão. 
    - O primeiro campo é obrigatório e do tipo number, onde deverá ser informado um valor entre 0 e 100;
    - O segundo campo é obrigatório e do tipo number, onde deverá ser informado um valor entre 100 e 200.
    - O botão de salvar, só estará habilitado se o formulário for válido.
    - A informação só será “salva” se a soma dos dois campos for par.
    - Se houver qualquer campo inválido, deve ser mostrado ao usuário o motivo.
    - Se a soma não for par e tentar salvar, deve mostrar uma mensagem de erro.
    - Se houver erro ao salvar, deve mostrar erro (essa condição só será possível de se ver via testes, não tem como disparar manualmente).
    - Se salvar com sucesso, deve mostrar a mensagem de sucesso ao salvar.
  - O segundo componente, é somente um botão que irá consultar uma API de cotações de moedas e mostrar o valor do dólar em relação ao real no momento em que for clicado no botão.
- Baseado nestes componentes, deverão ser feitos os testes.
- Organize os testes de forma que tenham uma estrutura organizada, com testes em seus devidos contextos (agrupar todos os testes de form, dentro de um describe em comum, por exemplo).

### Testes do componente 1:

- Ao inicializar o componente, não deve haver nenhuma mensagem de erro sendo exibida na tela. 
- Se o campo 1 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório”.
- Se o campo 1 estiver com um valor menor que zero, deve mostrar a mensagem “Valor deve ser maior ou igual a 0”.
- Se o campo 1 estiver com um valor maior que 100, deve mostrar a mensagem “Valor deve ser menor ou igual a 100”.
- Se o campo 2 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório”.
- Se o campo 2 estiver com um valor menor que 100, deve mostrar a mensagem “Valor deve ser maior ou igual a 100”.
- Se o campo 2 estiver com um valor maior que 200, deve mostrar a mensagem “Valor deve ser menor ou igual a 200”.
- Se o formulário estiver inválido, o botão de salvar deve estar desabilitado.
- Se o formulário estiver válido, o botão de salvar deve estar habilitado.
- Se houver sucesso ao salvar, deve mostrar a mensagem de sucesso.
- Se a soma dos números não for par e for clicado em salvar, deve mostrar a mensagem de erro de número par.
- Se houver erro ao salvar, deve mostrar a mensagem de erro ao salvar.
- Se o formulário for inválido, não deve chamar o método de salvar do formularioService.
- Se a soma dos números não for par, não deve chamar o método de salvar do formularioService.
- Se o formulário for válido e a soma dos números for par, deve chamar o método de salvar do formularioService.
- Se salvou com sucesso, deve chamar o método de salvoComSucesso.
- Se houve erro ao salvar, deve chamar o método erroAoSalvar.
- As mensagens só devem ficar visíveis por 3 segundos na tela. 
- Quando a soma dos dois campos for par, o método verificaNumeroPar deve retornar true;
- Quando a soma dos dois campos for ímpar, o método verificaNumeroPar deve retornar false.

### Testes do componente 2

- Quando clicar no botão, deve chamar o método verificaNumeroPar do cotacaoService.
- Se o valor do dólar 5.00 deve ser exibida a mensagem na tela: “Valor do dólar para hoje: R$ 5,00”
- Se não houver cotação, não deve exibir o “container-cotacao”.
- Se houver cotação, deve exibir o “container-cotacao”.
