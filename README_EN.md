# ComuLibras Backend

Backend for the ComuLibras platform - Communication and learning system for Libras (Brazilian Sign Language).

## 📋 About the Project

ComuLibras Backend is a modern RESTful API built with Node.js and TypeScript, following Clean Architecture principles. The system provides functionalities for user management, categories, and phrases in Libras, with JWT authentication and automatic documentation via Swagger.

## 🚀 Technologies Used

- **Node.js** (v20+) - JavaScript Runtime
- **TypeScript** - Static typing
- **SWC** - Fast compiler for TypeScript/JavaScript
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM for TypeScript
- **Docker** - Containerization
- **Swagger** - Automatic API documentation
- **JWT** - Token-based authentication
- **Zod** - Schema validation
- **Bcrypt** - Password hashing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Architecture

The project follows **Clean Architecture** principles organizing code into well-defined layers:

```
src/
├── @types/                    # Custom type definitions
├── application/               # Application layer
│   ├── config/               # Application configurations
│   ├── domain/               # Domain layer
│   │   ├── accounts/         # Accounts/users module
│   │   │   ├── docs/         # Swagger documentation
│   │   │   ├── entities/     # Domain entities
│   │   │   ├── mappers/      # Data mappers
│   │   │   ├── repositories/ # Repository interfaces and implementations
│   │   │   └── use-cases/    # Use cases
│   │   ├── auth/             # Authentication module
│   │   ├── categories/       # Categories module
│   │   └── sentences/        # Sentences module
│   ├── kernel/               # Framework core
│   │   ├── decorators/       # Custom decorators
│   │   └── di/               # Dependency injection
│   └── shared/               # Shared resources
│       ├── clients/          # External clients (Prisma)
│       ├── entities/         # Base entities
│       ├── http/             # HTTP utilities
│       └── providers/        # Service providers
├── main/                     # Main layer
│   └── express/              # Express configuration
│       ├── adapters/         # Adapters
│       ├── routes/           # Application routes
│       └── swagger.ts        # Swagger configuration
└── index.ts                  # Entry point
```

### Implemented Architecture Patterns

#### 1. **Clean Architecture**
- **Entities**: Domain objects with business rules
- **Use Cases**: Application-specific logic
- **Interface Adapters**: Controllers, mappers, and gateways
- **Frameworks & Drivers**: Express, Prisma, PostgreSQL

#### 2. **Dependency Injection (DI)**
Custom system with decorators for inversion of control:

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
Data layer abstraction:

```typescript
export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  create(account: Account): Promise<Account>;
  // ...
}
```

#### 4. **Factory Pattern**
For creating middlewares and services:

```typescript
export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const tokenProvider = container.resolve<TokenProvider>('JwtTokenProvider');
  return new AuthenticationMiddleware(tokenProvider);
};
```

## 🛠️ Prerequisites

Before starting, make sure you have installed:

- **Node.js** v20.0.0 or higher
- **PNPM** (package manager)
- **Docker** and **Docker Compose**
- **Git**

### Checking versions:

```bash
node --version  # >= v20.0.0
pnpm --version  # >= 8.0.0
docker --version
docker-compose --version
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/comulibras-backend.git
cd comulibras-backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Database configuration
DATABASE_URL="postgresql://comulibras-postgres:comulibras-postgres@localhost:5432/comulibras-db"

# Server configuration
PORT=3000
NODE_ENV=development

# JWT secret key (generate a secure key)
JWT_SECRET=your-super-secure-secret-key-here-with-at-least-256-bits
```

> **Important**: For production, generate a secure JWT key using: `openssl rand -base64 64`

### 4. Start the database

```bash
pnpm db:up
```

### 5. Run database migrations

```bash
pnpm db:migrate:dev
```

### 6. Generate Prisma client

```bash
pnpm db:generate
```

### 7. Start the development server

```bash
pnpm dev
```

🎉 **Ready!** Your API will be running at `http://localhost:3000`

## 📦 Available Scripts

### 🔧 Development

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm dev:clean` | Start only build and server (without generating Prisma) |
| `pnpm dev:db` | Generate Prisma client and start development |

### 🚀 Production

| Script | Description |
|--------|-------------|
| `pnpm build:prod` | Build for production |
| `pnpm start:prod` | Start production server |
| `pnpm prod` | Build + start for production |

### 🗄️ Database

| Script | Description |
|--------|-------------|
| `pnpm db:up` | Start PostgreSQL container |
| `pnpm db:down` | Stop database container |
| `pnpm db:logs` | View database logs |
| `pnpm db:health` | Check container status |
| `pnpm db:rebuild` | Rebuild database container |
| `pnpm db:migrate:dev` | Run migrations in development |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:studio` | Open Prisma Studio (visual interface) |
| `pnpm db:reset` | Reset database and run migrations |

### 🔍 Code Quality

| Script | Description |
|--------|-------------|
| `pnpm lint` | Run ESLint and fix issues |
| `pnpm format` | Format code with Prettier |

## 🔗 API Endpoints

### ✅ Health Check
- `GET /health` - API status

### 🔐 Authentication
- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login

### 👥 Accounts/Users
- `GET /accounts` - List accounts (admin)
- `POST /accounts` - Create account (admin)
- `PATCH /accounts/:id/role` - Update role (admin)
- `PATCH /accounts/:id/status` - Activate/deactivate account (admin)
- `DELETE /accounts/:id` - Delete account (admin)

### 📂 Categories
- `GET /categories` - List categories
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category
- `PATCH /categories/:id/status` - Activate/deactivate category
- `DELETE /categories/:id` - Delete category

### 💬 Sentences
- `GET /sentences` - List sentences
- `POST /sentences` - Create sentence
- `PATCH /sentences/:id` - Update sentence
- `PATCH /sentences/:id/status` - Activate/deactivate sentence
- `PATCH /sentences/category` - Update category of multiple sentences
- `DELETE /sentences/:id` - Delete sentence
- `DELETE /sentences` - Delete multiple sentences

## 📚 API Documentation

Complete API documentation is available via Swagger:

- **Development**: `http://localhost:3000/api-docs`

The documentation includes:
- Request/response schemas
- HTTP status codes
- Usage examples
- Required authentication for each endpoint

## 🏗️ Architecture Details

### Application Layers

#### 1. **Domain Layer**
- **Entities**: Business objects with rules and validations
- **Value Objects**: Immutable objects (e.g., Email, Password)
- **Domain Services**: Complex domain logic
- **Repository Interfaces**: Persistence contracts

#### 2. **Application Layer**
- **Use Cases**: Business operation orchestration
- **DTOs**: Data transfer objects
- **Application Services**: Coordination between use cases

#### 3. **Infrastructure Layer**
- **Repository Implementations**: Concrete implementations (Prisma)
- **External Services**: External APIs, email, etc.
- **Database Configuration**: Prisma configuration

#### 4. **Presentation Layer**
- **Controllers**: HTTP request handling
- **Middlewares**: Authentication, authorization, validation
- **Route Adapters**: Adaptation between Express and controllers

### Dependency Injection System

The project implements a custom DI system with decorators:

```typescript
// Dependency registration
container.register('AccountRepository', PrismaAccountRepository);
container.register('HashProvider', BcryptHashProvider);

// Injection in controllers
@Injectable()
export class CreateAccountController {
  constructor(
    @Inject('AccountRepository') private accountRepo: AccountRepository,
    @Inject('HashProvider') private hashProvider: HashProvider,
  ) {}
}
```

### Data Validation

Uses Zod for robust validation:

```typescript
const signInBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

@Schema({ body: signInBody })
export class SignInController extends Controller {
  // Automatic request body validation
}
```

### Error Handling

Centralized error handling system:

```typescript
// Custom errors
export class NotFoundHttpError extends HttpError {
  constructor(message = 'Resource not found') {
    super(message, StatusCode.NOT_FOUND);
  }
}

// Global error middleware
app.use(errorMiddlewareAdapter(makeHandleApplicationErrorMiddleware()));
```

## 🐳 Docker Support

### Development
The project includes a `docker-compose.yml` configured for PostgreSQL:

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

### Production
For production deployment, you can extend the configuration by adding:

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

## 🔧 Customization and Extension

### Adding New Modules

1. **Create the domain structure**:
```
src/application/domain/new-module/
├── docs/           # Swagger documentation
├── entities/       # Domain entities
├── mappers/        # Mappers
├── repositories/   # Repositories
└── use-cases/      # Use cases
```

2. **Register dependencies**:
```typescript
// src/application/kernel/di/container/repositories.ts
container.register('NewModuleRepository', PrismaNewModuleRepository);
```

3. **Add routes**:
```typescript
// src/main/express/routes/new-module-router.ts
export const newModuleRouter = Router();
newModuleRouter.get('/', routeAdapter(makeListNewModuleController()));
```

### Custom Configurations

Edit the file `src/application/config/env.ts`:

```typescript
export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // Add your configurations here
};
```

## 🧪 Testing (In development)

```bash
# Run tests (when implemented)
pnpm test

# Tests with coverage
pnpm test:coverage

# Tests in watch mode
pnpm test:watch
```

## 🚀 Deployment

### Production Preparation

1. **Configure environment variables**:
```env
NODE_ENV=production
DATABASE_URL=your-production-url
JWT_SECRET=your-super-secure-key
PORT=3000
```

2. **Run the build**:
```bash
pnpm build:prod
```

3. **Start the application**:
```bash
pnpm start:prod
```

### Deploy with Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the `LICENSE` file for details.

## 👥 Team

- **Backend Development**: Amauri Lima
- **Database Design**: Amauri Lima
- **Architecture**: Amauri Lima

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/comulibras-backend/issues)
- **Email**: amauri.plimaj@gmail.com
- **Documentation**: `http://localhost:3000/api-docs`

---

Developed with ❤️ for the Brazilian deaf community 🤟
