const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'fpr3-secret-key-estudo-ionic-2026';
const DB_FILE = path.join(__dirname, 'db.json');

// Carrega ou inicializa a base de dados db.json
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Erro ao ler db.json, reiniciando dados padrão:', err.message);
  }

  const defaultDb = {
    users: [
      { id: 1, email: "admin@gmail.com", password: "123", name: "Guilherme Hirohara", role: "admin" },
      { id: 2, email: "aluno@gmail.com", password: "123", name: "Gabriel Pontel", role: "user" },
      { id: 3, email: "prof@gmail.com", password: "123", name: "Vilson Maziero", role: "professor" }
    ],
    tasks: [
      { id: 1, title: "Estudar Angular Standalone", description: "Revisar diretivas, pipes, signals e o ciclo de vida do Ionic", priority: "alta", done: false },
      { id: 2, title: "Configurar rotas e guards", description: "Testar authGuard, guestGuard e adminGuard", priority: "alta", done: false },
      { id: 3, title: "Verificar interceptor HTTP", description: "Validar envio automático do header Authorization com token JWT", priority: "media", done: true },
      { id: 4, title: "Filtragem de tarefas", description: "Testar select de prioridade (Todas, alta, media, baixa)", priority: "media", done: false },
      { id: 5, title: "Exclusão com alerta Ionic", description: "Validar AlertController e exclusão via DELETE /tasks/:id", priority: "baixa", done: false }
    ]
  };

  saveDatabase(defaultDb);
  return defaultDb;
}

let db = loadDatabase();

function saveDatabase(dataToSave) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Erro ao salvar db.json:', err.message);
  }
}

// Criação de Token JWT compatível com RFC 7519 e jwt-decode
function createToken(user) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: Number(user.id),
    name: user.name,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + (24 * 60 * 60) // Válido por 24 horas
  };

  const base64UrlEncode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Helper para ler body da requisição
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        return resolve({});
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

// Resposta JSON auxiliar com CORS
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // Configuração CORS preflight (OPTIONS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method;

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

  try {
    // 1. ROTA DE LOGIN: POST /auth/login (ou POST /login)
    if (method === 'POST' && (pathname === '/auth/login' || pathname === '/login')) {
      const body = await parseBody(req);
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(res, 400, {
          message: 'E-mail e senha são obrigatórios'
        });
      }

      // Procura usuário no db.json
      const user = db.users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() && String(u.password) === String(password)
      );

      if (!user) {
        return sendJson(res, 401, {
          message: 'Credenciais inválidas! Verifique e-mail e senha.'
        });
      }

      const accessToken = createToken(user);
      return sendJson(res, 200, {
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    // 2. ROTA DE USUÁRIOS: GET /admin/users (ou GET /users)
    if (method === 'GET' && (pathname === '/admin/users' || pathname === '/users')) {
      // Retorna lista de usuários cadastrados
      return sendJson(res, 200, db.users);
    }

    // 3. ROTA DE TAREFAS: GET /tasks (ou GET /tarefas)
    if (method === 'GET' && (pathname === '/tasks' || pathname === '/tarefas')) {
      return sendJson(res, 200, db.tasks);
    }

    // 4. ROTA DE TAREFA POR ID: GET /tasks/:id
    const taskMatch = pathname.match(/^\/(?:tasks|tarefas)\/(\d+)$/);
    if (method === 'GET' && taskMatch) {
      const id = Number(taskMatch[1]);
      const task = db.tasks.find(t => Number(t.id) === id);
      if (!task) {
        return sendJson(res, 404, { message: 'Tarefa não encontrada' });
      }
      return sendJson(res, 200, task);
    }

    // 5. ROTA DE CRIAÇÃO DE TAREFA: POST /tasks
    if (method === 'POST' && (pathname === '/tasks' || pathname === '/tarefas')) {
      const body = await parseBody(req);
      const nextId = db.tasks.length > 0 ? Math.max(...db.tasks.map(t => Number(t.id) || 0)) + 1 : 1;
      const newTask = {
        id: nextId,
        title: body.title || '',
        description: body.description || '',
        priority: body.priority || 'baixa',
        done: Boolean(body.done)
      };

      db.tasks.push(newTask);
      saveDatabase();
      return sendJson(res, 201, newTask);
    }

    // 6. ROTA DE ATUALIZAÇÃO DE TAREFA: PUT/PATCH /tasks/:id
    if ((method === 'PUT' || method === 'PATCH') && taskMatch) {
      const id = Number(taskMatch[1]);
      const body = await parseBody(req);
      const index = db.tasks.findIndex(t => Number(t.id) === id);

      if (index === -1) {
        return sendJson(res, 404, { message: 'Tarefa não encontrada' });
      }

      db.tasks[index] = {
        ...db.tasks[index],
        ...body,
        id
      };
      saveDatabase();
      return sendJson(res, 200, db.tasks[index]);
    }

    // 7. ROTA DE DELEÇÃO DE TAREFA: DELETE /tasks/:id
    if (method === 'DELETE' && taskMatch) {
      const id = Number(taskMatch[1]);
      const initialLength = db.tasks.length;
      db.tasks = db.tasks.filter(t => Number(t.id) !== id);

      if (db.tasks.length === initialLength) {
        return sendJson(res, 404, { message: 'Tarefa não encontrada para deletar' });
      }

      saveDatabase();
      return sendJson(res, 200, {
        message: 'Tarefa excluída com sucesso',
        id
      });
    }

    // 8. Rota raiz informativo
    if (pathname === '/') {
      return sendJson(res, 200, {
        status: 'online',
        message: 'Backend da prova rodando com sucesso na porta 3000!',
        endpoints: [
          'POST   /auth/login    - Autenticação (retorna accessToken)',
          'GET    /admin/users   - Listagem de usuários',
          'GET    /tasks         - Listagem de tarefas',
          'DELETE /tasks/:id     - Exclusão de tarefa por ID',
          'POST   /tasks         - Criação de nova tarefa'
        ]
      });
    }

    // Rota 404
    return sendJson(res, 404, {
      message: `Rota ${method} ${pathname} não encontrada no backend.`
    });

  } catch (error) {
    console.error('Erro no processamento da requisição:', error);
    return sendJson(res, 500, {
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

server.listen(PORT, () => {
  console.log('========================================================');
  console.log(`🚀 Servidor Backend rodando em http://localhost:${PORT}`);
  console.log('========================================================');
  console.log('Rotas registradas:');
  console.log('  ➜ POST   http://localhost:3000/auth/login');
  console.log('  ➜ GET    http://localhost:3000/admin/users');
  console.log('  ➜ GET    http://localhost:3000/tasks');
  console.log('  ➜ DELETE http://localhost:3000/tasks/:id');
  console.log('  ➜ POST   http://localhost:3000/tasks');
  console.log('--------------------------------------------------------');
  console.log('Usuários de teste configurados:');
  console.log('  1) Admin:  admin@gmail.com / senha: 123  (Role: admin)');
  console.log('  2) User:   aluno@gmail.com / senha: 123  (Role: user)');
  console.log('  3) Prof:   prof@gmail.com  / senha: 123  (Role: professor)');
  console.log('========================================================');
});
