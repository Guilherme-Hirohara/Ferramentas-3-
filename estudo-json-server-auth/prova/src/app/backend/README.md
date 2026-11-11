# 🛠️ Backend - Estudo FPR3 (Prova)

Este backend foi desenvolvido especificamente para atender a aplicação Ionic localizada em `prova/`.

Ele provê uma API REST na porta **3000** compatível com os serviços Angular/Ionic e o arquivo de ambiente (`src/environments/environment.ts`).

---

## 🚀 Como Iniciar o Servidor

Você pode iniciar o servidor de qualquer uma das formas abaixo:

### Opção 1: Via script no `package.json` (recomendado)
Na pasta raiz de `prova/`:
```bash
npm run server
```

### Opção 2: Executando o arquivo Node diretamente
```bash
node src/app/backend/server.js
```
ou, se estiver dentro da pasta `src/app/backend/`:
```bash
node server.js
```

> **Nota:** O servidor utiliza módulos nativos do Node.js (`http`, `crypto`, `fs`, `path`). Portanto, **não necessita de instalações adicionais de pacotes** e roda imediatamente com o comando acima!

---

## 📡 Rotas Disponíveis

| Método | Rota | Descrição | Service Correspondente |
|---|---|---|---|
| `POST` | `/auth/login` | Realiza login e retorna `{ accessToken }` | `LoginService.realizarLogin` |
| `GET` | `/admin/users` | Lista todos os usuários cadastrados | `AdminService.getUsers` |
| `GET` | `/tasks` | Lista todas as tarefas | `TarefaService.getTarefas` |
| `DELETE` | `/tasks/:id` | Deleta uma tarefa pelo seu ID | `TarefaService.deleteTarefa` |
| `POST` | `/tasks` | Cria uma nova tarefa | - |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa | - |

*(Também aceita aliases como `/login` e `/users`)*

---

## 🔑 Usuários Pré-Cadastrados para Teste

| Email | Senha | Perfil (role) | Permissão no Sistema |
|---|---|---|---|
| `admin@gmail.com` | `123` | `admin` | Acessa tarefas e tem acesso liberado ao Guard `/admin/users` |
| `aluno@gmail.com` | `123` | `user` | Acessa tarefas (bloqueado de `/admin/users` pelo `adminGuard`) |
| `prof@gmail.com` | `123` | `professor` | Acessa tarefas |

---

## 📦 Estrutura dos Dados

Os dados de tarefas e usuários ficam armazenados no arquivo `db.json` e são persistidos em disco a cada alteração (adição ou exclusão).
