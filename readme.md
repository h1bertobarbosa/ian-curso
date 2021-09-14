Vamos usar 
Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web
TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.

npm i express
npm i typescript @types/express -D
npx typescript --init

Vamos fazer: 
- Cadastro de cliente com nome,telefone e email
- Listagem de clientes

Desafio:
- Rota para remoção com o verbo DELETE
- Rota de update com o verbo PUT

aula 2
-correção do desafio e implementação do middleware

Aula 3
- Criar um banco PG com docker
- Add conexão banco de dados
- usar o BD nas rotas
- mostrar sistema de modulos import e export

https://docs.docker.com/
https://hub.docker.com/_/postgres
https://docs.docker.com/desktop/windows/install/
https://www.beekeeperstudio.io/
docker run --name curso-postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_USER=curso_ian -d -p 5432:5432 postgres:13.4-alpine