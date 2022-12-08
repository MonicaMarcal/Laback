# LABOOK

### Projeto backend rede social
- O LaBook será uma rede social com o objetivo de promover a conexão e interação entre seus mais diversos usuários.
- Cadastrar, Logar, Criar post, Buscar um post por id.

### Tecnologias Utilizadas:
- [Typescript] 
- [Express] 
- [Knex]
- [MySQL]
- [RestClient]
- [jsonwebtoken]


## Instalação
```sh
git clone https://github.com/MonicaMarcal/Laback.git
cd Laback 
cd labook
npm install
```

* Criar um arquivo de configuração .env na raiz do projeto e preencher com seus dados do banco:
```
DB_HOST = endereço_do_seu_banco
DB_USER = Usuario_do_seu_banco
DB_PASSWORD = Senha_do_seu_banco
DB_SCHEMA = nome_do_seu_banco

BCRYPT_COST = 12 ;
JWT_KEY = colocar_uma_senha_aleatoria ;
JWT_EXPIRES_IN = "colocar_a_experiação_da_autenticação_pode_ser_horas_dias_meses_Etc"
 
```
* Executar tabelas no Mysql Workbench
```
         CREATE TABLE labook_users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
            
         CREATE TABLE labook_posts(
            id VARCHAR(255) PRIMARY KEY,
            photo VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            type ENUM("normal","event") DEFAULT "normal",
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            author_id VARCHAR(255),
            FOREIGN KEY (author_id) REFERENCES labook_users (id)
         );
```
* Executar `npm run build` para trasnpilar os arquivos
* Executar `npm run dev` para executar o projeto

## Endpoints
1. Cadastro
   * Exemplo de requisição:
      ```bash
      curl -i -X POST http://localhost:3003/users/signup -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@gmail.com","password":"pass123"}'
      ```
   * Exemplo de resposta (sucesso):
      ```bash
      HTTP/1.1 201 Created
      X-Powered-By: Express
      Access-Control-Allow-Origin: *
      Content-Type: application/json; charset=utf-8
      Content-Length: 220
      ETag: W/"dc-ec7r4rkKsMBe/V0SGyUkO6Vyto0"
      Date: Tue, 17 Nov 2020 14:33:15 GMT
      Connection: keep-alive

      {"message":"Success!", "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5OGJjNDVlLTExZjEtNGEyMy04OTZhLTdmMmUyOWNmZTAxMiIsImlhdCI6MTYwNTYyMzU5NSwiZXhwIjoxNjA1NzA5OTk1fQ.pWxV2vtLnp0hKm0CXXnLpnDu6PEPkZM27A71oTTCYfE"}%   
      ```
1. Login
   * Exemplo de requisição:
      ```bash
      curl -i -X POST http://localhost:3003/users/login -H "Content-Type: application/json" -d '{"email":"alice@gmail.com","password":"pass123"}'
      ```
   * Exemplo de resposta (sucesso):
      ```bash
      HTTP/1.1 200 OK
      X-Powered-By: Express
      Access-Control-Allow-Origin: *
      Content-Type: application/json; charset=utf-8
      Content-Length: 220
      ETag: W/"dc-IBDYVXSmDzdFsqHXhPCAutzNwn8"
      Date: Tue, 17 Nov 2020 14:39:23 GMT
      Connection: keep-alive

      {"message":"Success!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5OGJjNDVlLTExZjEtNGEyMy04OTZhLTdmMmUyOWNmZTAxMiIsImlhdCI6MTYwNTYyMzk2MywiZXhwIjoxNjA1NzEwMzYzfQ.9JvXRQpazI5k6GAnc1lFcVcTbZ_ElASnwyybU_tRU48"}%   
      ```
1. Criar Post
   * Exemplo de requisição:
      ```bash
      curl -i -X POST http://localhost:3003/posts/create -H "Content-Type: application/json" -H "authorization:$token" -d '{"photo":"https://i.picsum.photos/id/238/200/200.jpg?hmac=O4Jc6lqHVfaKVzLf8bWssNTbWzQoaRUC0TDXod9xDdM","description":"My city is beautiful =D","type":"normal"}'
      ```
   * Exemplo de resposta (sucesso):
      ```bash
      HTTP/1.1 201 Created
      X-Powered-By: Express
      Access-Control-Allow-Origin: *
      Content-Type: application/json; charset=utf-8
      Content-Length: 22
      ETag: W/"16-ChcZhlw1slqtGuDwxLsUclql5gE"
      Date: Tue, 17 Nov 2020 14:47:15 GMT
      Connection: keep-alive

      {"message":"Success!"}%    
      ```
1. Buscar Post por id
   * Exemplo de requisição:
      ```bash
      curl -i http://localhost:3003/posts/$id -H "Content-Type: application/json" -H "authorization:$token" 
      ```
   * Exemplo de resposta (sucesso):
      ```bash
      HTTP/1.1 200 OK
      X-Powered-By: Express
      Access-Control-Allow-Origin: *
      Content-Type: application/json; charset=utf-8
      Content-Length: 322
      ETag: W/"142-IYRwCODXZBltXE3MydHuIDB8M3w"
      Date: Tue, 17 Nov 2020 14:52:19 GMT
      Connection: keep-alive

      {"message":"Success!","post":{"id":"e4eb1531-d814-4742-b614-be2a36602548","photo":"https://i.picsum.photos/id/238/200/200.jpg?hmac=O4Jc6lqHVfaKVzLf8bWssNTbWzQoaRUC0TDXod9xDdM","description":"My city is beautiful =D","type":"normal","createdAt":"2020-11-17T17:47:15.000Z","authorId":"898bc45e-11f1-4a23-896a-7f2e29cfe012"}}% 
      ```