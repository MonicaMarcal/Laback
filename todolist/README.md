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
        - NICKENAME
        
- EDITAR USUARIO
    - METODO: POST
    - PATH: /USER/EDIT/:ID
    - BODY:
        - NAME(OPCIONAL, NÃO PODE SER VAZIO)
        - NICKENAME(OPCIONAL, NÃO PODE SER VAZIO)
        - EMAIL(OPCIONAL, NÃO PODE SER VAZIO)
        
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
## Tech
Dillinger uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework


## Installation
Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```


Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

**Free Software, Hell Yeah!**
