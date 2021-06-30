# Cripto Catch

Projeto desenvolvido como desafio da **QR-Capital** que consiste em criar uma aplicação em **React** para exibir Criptomoedas, seu preço e variação nas últimas 24 horas utilizando a API da
[CriptoCompare](https://min-api.cryptocompare.com/)

## Disclaimer

Algumas moedas estão vindo com informações erradas da API como por exemplo a **_Aero_**, eu não tratei pois considerei que como é um erro da API isso será consertado em breve. _(espero)_

A barra de pesquisa tem a função de sugestão de **Autocomplete** e se selecionar uma opção automaticamente essa opção é adicionada a lista, a seleção pode tanto ser feita clicando, como apertando **_Enter_** e navegando pelas setas.  
Apesar do autocomplete só sugerir os nomes das criptos é possível adicionar por simbolo também, por exemplo: pesquisando pelo simbolo **BTC** ele adicionará o Bitcoin a lista.

Também está responsivo em todas as resoluções, inclusive **mobile**.

O teste está testando apenas a funcionalidade de adicionar a Cripto, ou seja, pesquisar um nome de cripto (no caso Bitcoin) e verificar se o componente que exibe a Cripto foi renderizado. A API dos testes é **_"Mockada"_** usando a lib [MSW](https://mswjs.io/)

A inicialização do servidor de desenvolvimento está lenta por causa da lib de css **TailWindCss**. Como o tailwind contém muitas _(mesmo)_ classes de css a inicialização acaba sendo prejudicada mas claro que isso é otimizado na versão de produção. Gere a build de produção e execute para ver a diferença!

## Commandos

Para executar o projeto instale as dependencias utilizando o comando _yarn_ na raíz do projeto.

```bash
yarn dev #Inicia um servidor de desenvolvimento

yarn build #Cria a build de produção atravez do next scripts

yarn start #Executa a build de produção

yarn test #Executa os testes da aplicação

```

URL base do APP: **http://localhost:3000**

Qualquer dúvida é só enviar um email para: **ph.luna.vieira@gmail.com**
