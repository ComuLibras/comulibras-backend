# ComuLibras Backend

Backend da plataforma ComuLibras - Sistema de comunicação e aprendizado de Libras (Língua Brasileira de Sinais).

## 📋 Sobre o Projeto

O ComuLibras Backend é uma API RESTful moderna construída com Node.js e TypeScript, seguindo os princípios da Clean Architecture. O sistema oferece funcionalidades para gerenciamento de usuários, categorias e frases em Libras, com autenticação JWT e documentação automática via Swagger.

## 🚀 Tecnologias Utilizadas

- **Node.js** (v20+) - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **SWC** - Compilador rápido para TypeScript/JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM moderno para TypeScript
- **Docker** - Containerização
- **Swagger** - Documentação automática da API
- **JWT** - Autenticação baseada em tokens
- **Zod** - Validação de schemas
- **Bcrypt** - Hash de senhas
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 📁 Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture** organizando o código em camadas bem definidas:

```
src/
├── @types/                    # Definições de tipos personalizados
├── application/               # Camada de aplicação
│   ├── config/               # Configurações da aplicação
│   ├── domain/               # Camada de domínio
│   │   ├── accounts/         # Módulo de contas/usuários
│   │   │   ├── docs/         # Documentação Swagger
│   │   │   ├── entities/     # Entidades de domínio
│   │   │   ├── mappers/      # Mapeadores de dados
│   │   │   ├── repositories/ # Interfaces e implementações de repositórios
│   │   │   └── use-cases/    # Casos de uso
│   │   ├── auth/             # Módulo de autenticação
│   │   ├── categories/       # Módulo de categorias
│   │   └── sentences/        # Módulo de frases
│   ├── kernel/               # Núcleo do framework
│   │   ├── decorators/       # Decorators personalizados
│   │   └── di/               # Injeção de dependência
│   └── shared/               # Recursos compartilhados
│       ├── clients/          # Clientes externos (Prisma)
│       ├── entities/         # Entidades base
│       ├── http/             # Utilitários HTTP
│       └── providers/        # Provedores de serviços
├── main/                     # Camada principal
│   └── express/              # Configuração do Express
│       ├── adapters/         # Adaptadores
│       ├── routes/           # Rotas da aplicação
│       └── swagger.ts        # Configuração do Swagger
└── index.ts                  # Ponto de entrada
```

### Padrões de Arquitetura Implementados

#### 1. **Clean Architecture**
- **Entities**: Objetos de domínio com regras de negócio
- **Use Cases**: Lógica de aplicação específica
- **Interface Adapters**: Controllers, mappers e gateways
- **Frameworks & Drivers**: Express, Prisma, PostgreSQL

#### 2. **Dependency Injection (DI)**
Sistema customizado com decorators para inversão de controle:

```typescript
@Injectable()
export class SignInController extends Controller {
  constructor(
    @Inject('SignInService') private readonly signInService: SignInService,
  ) {
    super();
  }
}
```

#### 3. **Repository Pattern**
Abstração da camada de dados:

```typescript
export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  create(account: Account): Promise<Account>;
  // ...
}
```

#### 4. **Factory Pattern**
Para criação de middlewares e serviços:

```typescript
export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const tokenProvider = container.resolve<TokenProvider>('JwtTokenProvider');
  return new AuthenticationMiddleware(tokenProvider);
};
```

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v20.0.0 ou superior
- **PNPM** (gerenciador de pacotes)
- **Docker** e **Docker Compose**
- **Git**

### Verificando as versões:

```bash
node --version  # >= v20.0.0
pnpm --version  # >= 8.0.0
docker --version
docker-compose --version
```

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/comulibras-backend.git
cd comulibras-backend
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configuração do banco de dados
DATABASE_URL="postgresql://comulibras-postgres:comulibras-postgres@localhost:5432/comulibras-db"

# Configuração do servidor
PORT=3000
NODE_ENV=development

# Chave secreta do JWT (gere uma chave segura)
JWT_SECRET=sua-chave-secreta-super-segura-aqui-com-pelo-menos-256-bits
```

> **Importante**: Para produção, gere uma chave JWT segura usando: `openssl rand -base64 64`

### 4. Inicie o banco de dados

```bash
pnpm db:up
```

### 5. Execute as migrações do banco

```bash
pnpm db:migrate:dev
```

### 6. Gere o cliente Prisma

```bash
pnpm db:generate
```

### 7. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

🎉 **Pronto!** Sua API estará rodando em `http://localhost:3000`

## 📦 Scripts Disponíveis

### 🔧 Desenvolvimento

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento com hot reload |
| `pnpm dev:clean` | Inicia apenas o build e servidor (sem gerar Prisma) |
| `pnpm dev:db` | Gera Prisma client e inicia desenvolvimento |

### 🚀 Produção

| Script | Descrição |
|--------|-----------|
| `pnpm build:prod` | Build para produção |
| `pnpm start:prod` | Inicia servidor de produção |
| `pnpm prod` | Build + start para produção |

### 🗄️ Banco de Dados

| Script | Descrição |
|--------|-----------|
| `pnpm db:up` | Inicia container do PostgreSQL |
| `pnpm db:down` | Para container do banco |
| `pnpm db:logs` | Visualiza logs do banco |
| `pnpm db:health` | Verifica status do container |
| `pnpm db:rebuild` | Reconstrói container do banco |
| `pnpm db:migrate:dev` | Executa migrações em desenvolvimento |
| `pnpm db:generate` | Gera cliente Prisma |
| `pnpm db:studio` | Abre Prisma Studio (interface visual) |
| `pnpm db:reset` | Reseta banco e executa migrações |

### 🔍 Qualidade de Código

| Script | Descrição |
|--------|-----------|
| `pnpm lint` | Executa ESLint e corrige problemas |
| `pnpm format` | Formata código com Prettier |

## 🔗 Endpoints da API

### ✅ Health Check
- `GET /health` - Status da API

### 🔐 Autenticação
- `POST /auth/sign-up` - Registro de usuário
- `POST /auth/sign-in` - Login de usuário

### 👥 Contas/Usuários
- `GET /accounts` - Listar contas (admin)
- `POST /accounts` - Criar conta (admin)
- `PATCH /accounts/:id/role` - Atualizar role (admin)
- `PATCH /accounts/:id/status` - Ativar/desativar conta (admin)
- `DELETE /accounts/:id` - Deletar conta (admin)

### 📂 Categorias
- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria
- `PATCH /categories/:id` - Atualizar categoria
- `PATCH /categories/:id/status` - Ativar/desativar categoria
- `DELETE /categories/:id` - Deletar categoria

### 💬 Frases
- `GET /sentences` - Listar frases
- `POST /sentences` - Criar frase
- `PATCH /sentences/:id` - Atualizar frase
- `PATCH /sentences/:id/status` - Ativar/desativar frase
- `PATCH /sentences/category` - Atualizar categoria de múltiplas frases
- `DELETE /sentences/:id` - Deletar frase
- `DELETE /sentences` - Deletar múltiplas frases

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger:

- **Desenvolvimento**: `http://localhost:3000/api-docs`

A documentação inclui:
- Esquemas de request/response
- Códigos de status HTTP
- Exemplos de uso
- Autenticação necessária para cada endpoint

## 🏗️ Detalhes da Arquitetura

### Camadas da Aplicação

#### 1. **Domain Layer (Domínio)**
- **Entities**: Objetos de negócio com regras e validações
- **Value Objects**: Objetos imutáveis (ex: Email, Password)
- **Domain Services**: Lógica de domínio complexa
- **Repository Interfaces**: Contratos para persistência

#### 2. **Application Layer (Aplicação)**
- **Use Cases**: Orquestração de operações de negócio
- **DTOs**: Objetos de transferência de dados
- **Application Services**: Coordenação entre use cases

#### 3. **Infrastructure Layer (Infraestrutura)**
- **Repository Implementations**: Implementações concretas (Prisma)
- **External Services**: APIs externas, email, etc.
- **Database Configuration**: Configuração do Prisma

#### 4. **Presentation Layer (Apresentação)**
- **Controllers**: Manipulação de requests HTTP
- **Middlewares**: Autenticação, autorização, validação
- **Route Adapters**: Adaptação entre Express e controllers

### Sistema de Injeção de Dependência

O projeto implementa um sistema customizado de DI com decorators:

```typescript
// Registro de dependências
container.register('AccountRepository', PrismaAccountRepository);
container.register('HashProvider', BcryptHashProvider);

// Injeção em controllers
@Injectable()
export class CreateAccountController {
  constructor(
    @Inject('AccountRepository') private accountRepo: AccountRepository,
    @Inject('HashProvider') private hashProvider: HashProvider,
  ) {}
}
```

### Validação de Dados

Utiliza Zod para validação robusta:

```typescript
const signInBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

@Schema({ body: signInBody })
export class SignInController extends Controller {
  // Validação automática do request body
}
```

### Tratamento de Erros

Sistema centralizado de tratamento de erros:

```typescript
// Erros customizados
export class NotFoundHttpError extends HttpError {
  constructor(message = 'Resource not found') {
    super(message, StatusCode.NOT_FOUND);
  }
}

// Middleware global de erros
app.use(errorMiddlewareAdapter(makeHandleApplicationErrorMiddleware()));
```

## 🐳 Suporte ao Docker

### Desenvolvimento
O projeto inclui um `docker-compose.yml` configurado para PostgreSQL:

```yaml
services:
  db:
    image: postgres:15-alpine
    container_name: comulibras-db
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: comulibras-postgres
      POSTGRES_PASSWORD: comulibras-postgres
      POSTGRES_DB: comulibras-db
```

### Produção
Para deploy em produção, você pode estender a configuração adicionando:

```yaml
services:
  app:
    build: .
    ports:
      - 3000:3000
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/dbname
```

## 🔧 Personalização e Extensão

### Adicionando Novos Módulos

1. **Crie a estrutura do domínio**:
```
src/application/domain/novo-modulo/
├── docs/           # Documentação Swagger
├── entities/       # Entidades de domínio
├── mappers/        # Mapeadores
├── repositories/   # Repositórios
└── use-cases/      # Casos de uso
```

2. **Registre as dependências**:
```typescript
// src/application/kernel/di/container/repositories.ts
container.register('NovoModuloRepository', PrismaNovoModuloRepository);
```

3. **Adicione as rotas**:
```typescript
// src/main/express/routes/novo-modulo-router.ts
export const novoModuloRouter = Router();
novoModuloRouter.get('/', routeAdapter(makeListNovoModuloController()));
```

### Configurações Personalizadas

Edite o arquivo `src/application/config/env.ts`:

```typescript
export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Adicione suas configurações aqui
};
```

## 🧪 Testes (Em desenvolvimento)

```bash
# Executar testes (quando implementados)
pnpm test

# Testes com coverage
pnpm test:coverage

# Testes em modo watch
pnpm test:watch
```

## 🚀 Deploy

### Preparação para Produção

1. **Configure variáveis de ambiente**:
```env
NODE_ENV=production
DATABASE_URL=sua-url-de-producao
JWT_SECRET=sua-chave-super-segura
PORT=3000
```

2. **Execute o build**:
```bash
pnpm build:prod
```

3. **Inicie a aplicação**:
```bash
pnpm start:prod
```

### Deploy com Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo `LICENSE` para detalhes.

## 👥 Equipe

- **Backend Development**: Amauri Lima
- **Database Design**: Amauri Lima
- **Architecture**: Amauri Lima

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/comulibras-backend/issues)
- **Email**: amauri.plimaj@gmail.com
- **Documentação**: `http://localhost:3000/api-docs`

---

Desenvolvido com ❤️ para a comunidade surda brasileira 🤟
