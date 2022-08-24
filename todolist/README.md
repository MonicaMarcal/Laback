# TO DO LIST
### Lista de tarefas para o seu dia-a-dia

## Features
________________________________________________________________________
| ESTRUTURAS DE DADOS |

- USUARIOS
    - ID
    - NAME
    - NICKNAME
    - EMAIL
    
- TAREFAS
    - ID
    - TITLE
    - DESCRIPTION
    - DEADLINE
    - STATUS: "TO_DO" || "DOING" || "DONE"
    - AUTOR
    - ASSIGNEES
    
________________________________________________________________________________
| CRIAÇÃO DE TABELAS MYSQL |

```sql
CREATE TABLE to_do_list_users(
id VARCHAR(64) PRIMARY KEY,
name VARCHAR(64) NOT NULL,
nickname VARCHAR(64) NOT NULL,
email VARCHAR(64) NOT NULL
)

```

```sql
CREATE TABLE to_do_list_tasks(
id VARCHAR(64) PRIMARY KEY,
title VARCHAR(64) NOT NULL,
description VARCHAR(1024) DEFAULT "No description provided",
deadline DATE,
status ENUM ("TO_DO", "DOING", "DONE") DEFAULT "TO_DO",
author_id VARCHAR(64),
FOREIGN KEY (author_id) REFERENCES to_do_list_users(id)
)

```

```sql
CREATE TABLE to_do_list_assignees(
task_id VARCHAR(64),
assignee_id VARCHAR(64),
PRIMARY KEY (task_id, assignee_id),
FOREIGN KEY (task_id) REFERENCES to_do_list_tasks(id)
FOREIGN KEY (assignee_id) REFERENCES to_do_list_users(id)
)

```

|JUNÇÃO DAS TABELAS|  
```sql
SELECT tasks.*, users.nickname FROM to_do_list_tasks AS tasks 
JOIN to_do_list_users AS users
ON author_id = users.id;
```
________________________________________________________________________________
| ENDPOINTS |

- CRIAR USUARIO
    - METODO: PUT
    - PATH: /USER
    - BODY:
        - NAME:(OBRIGATORIO)
        - NICKNAME:(OBRIGATORIO)
        - EMAIL:(OBRIGATORIO)
        
- PEGAR USUARIO PELO ID
    - METODO: GET
    - PATH: /USER/:ID
    - BODY DE RESPOSTA: (RETORNAR UM ERRO SE NÃO ENCONTRAR)
        - ID
        - NICKNAME
        
- EDITAR USUARIO
    - METODO: POST
    - PATH: /USER/EDIT/:ID
    - BODY:
        - NAME(OPCIONAL, MAS NÃO PODE SER VAZIO)
        - NICKNAME(OPCIONAL, MAS NÃO PODE SER VAZIO)
        - EMAIL(OPCIONAL, MAS NÃO PODE SER VAZIO)
        
- CRIAR TAREFA
    - METODO: PUT
    - PATH: /TASK
    - BODY:
        - TITLE(OBRIGATORIO)
        - DESCRIPTION(OBRIGATORIO)
        - DEADLINE(OBRIGATORIO; FORMATO DD/MM/YYYY)
        - AUTHORID
        
- PEGAR TAREFA PELO ID
    - METODO: GET
    - PATH: /TASK/:ID
    - BODY DE RESPOSTA: (RETORNAR UM ERRO SE NÃO ENCONTRAR)
        - ID
        - TITLE
        - DESCRIPTION
        - DEADLINE(FORMATO DD/MM/YYYY)
        - STATUS
        - AUTHORID
        - AUTHORNICKNAME
________________________________________________________________________________
## Tecnologias

- [Typescript] 
- [Express] 
- [Knex]
- [MySQL Workbench]
- [Postman]


## Instalação
```sh
git clone https://github.com/MonicaMarcal/Laback.git
cd Laback 
cd todolist
npm install

```

## Configurações
```sh
Criar as tabelas no mysql

Criar os endpoints no postman

Criar um arquivo de configuração .env com seus dados do banco:
DB_HOST = endereço_do_seu_banco
DB_USER = Usuario_do_seu_banco
DB_PASSWORD = Senha_do_seu_banco
DB_SCHEMA = nome_do_seu_banco

```



