# Cookenu

### Projeto backend de receitas
- Cadastro de usuario, login do usuario, buscar usuario por id, buscar dados do usuario.
- Criação de receitas, buscar receitas por id.

### Tecnologias Utilizadas:
- [Typescript] 
- [Express] 
- [Knex]
- [MySQL]
- [RestClient]
- [jsonwebtoken]
- [bcryptjs]
- [uuid]


## Instalação
```sh
git clone https://github.com/MonicaMarcal/Laback.git
cd Laback 
cd cookenu
npm install
```

## Configurações
Para ativar as tabelas do mysql pelo VsCode tenha a extenção MySQL instalada, rode:
```
npm run migrations
```

Crie um arquivo requests.rest para rodar suas requisições pelo VsCode, lembrando que a extensão REST Client precisa estar instalada.
```
POST http://localhost:3003/users/signup
Content-Type: application/json

{
  "name": "bob",
  "email":"bob@gmail.com",
  "password":"25252525"
}

###
# @name login
POST http://localhost:3003/users/login
Content-Type: application/json

{
  "email":"alice@gmail.com",
  "password":"123"
}

###
# @name getProfile
GET http://localhost:3003/users/profile
Authorization: {{login.response.body.token}}

###
GET http://localhost:3003/users/{{getProfile.response.body.id}}/profile
Authorization: {{login.response.body.token}}

###
POST http://localhost:3003/recipe
Content-Type: application/json
Authorization: {{login.response.body.token}}

{
  "title": "Big Mac",
  "description":"Dois hamburguers, alface, queijo, molho especial, cebola, picles, pão de gergelim"
}

###
GET http://localhost:3003/recipe/41db81e1-c170-48e6-a505-d23ba5e2e9ed
Authorization: {{login.response.body.token}}
```

Criar um arquivo de configuração .env com seus dados do banco:
```
DB_HOST = endereço_do_seu_banco
DB_USER = Usuario_do_seu_banco
DB_PASSWORD = Senha_do_seu_banco
DB_SCHEMA = nome_do_seu_banco

BCRYPT_COST = 12 ;
JWT_KEY = colocar_uma_senha_aleatoria ;
```

### ESTRUTURAS DE DADOS: 
  - USER
        - id
        - name 
        - password (minino 6 caracteres)
        - recipes ?
              - id 
              - title
              - description
              - createdAt 

### FUNCIONALIDADES:
- NOME: signup INPUT: name, email, password OUTPUT: token
- NOME: login INPUT: email, password OUTPUT: token
- NOME: getProfile INPUT: token OUTPUT: id, name, email
- NOME: getUserById INPUT: token, id OUTPUT: id, name, email
- NOME: createRecipe INPUT: token, title, description  
- NOME: getRecipeById INPUT: token, id OUTPUT: id, title, description, createdAt

