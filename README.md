# KnowCards:
O projeto KnowCards é uma ferramenta que tem como objetivo ajudar na memorização de conteúdos previamente estudados, isso através da repetição de perguntas e respostas a respeito do que foi aprendido através de cards.

Neste repositório está a versão para ser executada em um servidor, tendo o front-end com o angular, adonisJs para o back-end e o mysql como banco de dados, porém irei no futuro desenvolver uma versão "lite" que seja necessário apenas um documento html, ou seja uma versão que possa ser executada sem ter o angular e o adonis, com o problema que não terá diversos recursos do projeto completo.

No momento o projeto ainda está em desenvolvimento e por enquanto na fase beta, o projeto está funcional em boa parte de suas funções, porém há ainda muitas coisas para ser adicionado até que haja uma versão que possa ser considerada como finalizada, mas se deseja instalar para testar segue os requisitos e o método de instalação:

## Tecnologias utilizadas:

- Angular
- Adonis
- Mysql
- NodeJs

## Como instalar a versão completa de forma local

### Angular:

Clone o projeto, dentro da pasta do angular execute o seguinte comando:

```
npm install --force
```
Para executar basta utilizar:
```
ng serve
```

### AdonisJs:

Assim como no Angular, precisamos instalar

O AdonisJs irá requerer que tenha o mysql instalado, e o primeiro passo será configurar o banco de dados que será utilizado,
dentro da pasta do Adonis terá um arquivo chamado .env.example, renomeie para .env, em seguida você deve preencher com as informações do teu banco de dados, como o host, porta utilizada, senha, usuário e por fim o nome do banco de dados.

As tabelas do banco de dados serão criadas pelo próprio Adonis, basta dar o seguinte comando:
```
node ace migration:run
```
Agora que todo o projeto está configurado, podemos dar inicio à api do Adonis com:

```
node ace serve
```

Com isso entrar no link fornecido do angular que o projeto estará rodando no seu navegador!

## Recursos que ainda faltam ser acresentados:

### Front-end
- Possibilidade de importar e exportar decks através de arquivos .txt
- alterar o css temporário da página



## 

Fora essas modificações há muitas outras modificações que farei com o tempo.
