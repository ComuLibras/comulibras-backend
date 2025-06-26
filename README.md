# Node.js TypeScript Backend Template

A modern, production-ready backend template built with Node.js, TypeScript, Express, and PostgreSQL.

## 📋 About This Template

This template provides a solid foundation for building scalable backend applications following clean architecture principles. It includes authentication, database integration, API documentation, and development tooling out of the box.

## 🚀 Technologies

- **Node.js** (v20+)
- **TypeScript** - Static typing
- **SWC** - Fast TypeScript/JavaScript compiler
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma** - Database ORM
- **Docker** - Containerization
- **Swagger** - API documentation
- **JWT** - Authentication
- **Zod** - Schema validation
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
├── src/
│   ├── application/         # Application logic
│   │   ├── config/         # Configuration
│   │   ├── domain/         # Domain modules
│   │   │   ├── auth/       # Authentication module
│   │   │   └── accounts/   # Accounts module
│   │   ├── kernel/         # Core framework (DI, decorators)
│   │   └── shared/         # Shared resources
│   ├── main/               # Main configuration
│   │   └── express/        # Express setup
│   └── @types/             # Type definitions
├── prisma/                 # Database schemas and migrations
│   └── schema/             # Prisma schemas
├── docker-compose.yml      # Development database
└── package.json            # Scripts and dependencies
```

## 🛠️ Prerequisites

- **Node.js** v20 or higher
- **PNPM** (package manager)
- **Docker** and **Docker Compose** (for database)

## ⚙️ Getting Started

### 1. Use this template

Click "Use this template" on GitHub or clone the repository:

```bash
git clone <your-repo-url>
cd your-comulibras
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp"

# Server configuration
PORT=3000
NODE_ENV=development

# JWT secret (generate a secure secret)
JWT_SECRET=your-super-secret-jwt-key-here
```

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

### 7. Start development

```bash
pnpm dev
```

Your API will be available at `http://localhost:3000`

## 🔧 Development Workflow

### Quick Start

```bash
# Start database (run once)
pnpm db:up

# Start development (SWC compilation + server with hot reload)
pnpm dev
```

## 📦 Available Scripts

### Development

| Script     | Description                                            |
| ---------- | ------------------------------------------------------ |
| `pnpm dev` | Start development (build + server) with hot reload    |

### Production

| Script            | Description             |
| ----------------- | ----------------------- |
| `pnpm build:prod` | Build for production    |
| `pnpm start:prod` | Start production server |

### Database

| Script                | Description                |
| --------------------- | -------------------------- |
| `pnpm db:up`          | Start database container   |
| `pnpm db:down`        | Stop database container    |
| `pnpm db:logs`        | View database logs         |
| `pnpm db:health`      | Check container status     |
| `pnpm db:rebuild`     | Rebuild database container |
| `pnpm db:migrate:dev` | Run database migrations    |
| `pnpm db:generate`    | Generate Prisma client     |
| `pnpm db:studio`      | Open Prisma Studio         |

### Code Quality

| Script        | Description               |
| ------------- | ------------------------- |
| `pnpm lint`   | Lint and fix code         |
| `pnpm format` | Format code with Prettier |

## 🔐 API Endpoints

### Health Check

- `GET /health` - API health status

### Authentication

- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login

## 📚 API Documentation

Swagger documentation is available at:

- **Development**: `http://localhost:3000/api-docs`

## 🏗️ Architecture

This template follows **Clean Architecture** principles:

- **Domain Layer**: Business logic and entities
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External services and frameworks
- **Main Layer**: Dependency injection and app configuration

### Key Features

- ✅ **Fast Compilation** - SWC for blazing fast TypeScript compilation
- ✅ **Path Mappings** - Clean imports with `@/` aliases instead of long relative paths
- ✅ **Dependency Injection** - Custom DI container with decorators
- ✅ **Input Validation** - Zod schemas with automatic validation
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Authentication** - JWT-based authentication system
- ✅ **Database Migrations** - Version-controlled database changes
- ✅ **API Documentation** - Auto-generated Swagger docs
- ✅ **Code Quality** - ESLint + Prettier configuration
- ✅ **Hot Reload** - Development server with automatic restarts

## 🐳 Docker Support

The template includes a PostgreSQL database in Docker for development. For production deployment, you can extend the setup with application containers.

## 🛠️ Customization

### Adding New Modules

1. Create a new folder in `src/application/domain/`
2. Add your entities, use cases, and controllers
3. Register routes in the router
4. Update Swagger documentation

### Environment Configuration

Modify `src/application/config/env.ts` to add new environment variables.

### Path Mappings

The project now supports clean import paths using `@/` aliases:

```typescript
// Instead of long relative imports:
import { Injectable } from '../../../../kernel/decorators/injectable';
import { Controller } from '../../../../shared/http/interfaces/controller';

// Use clean aliases:
import { Injectable } from '@kernel/decorators/injectable';
import { Controller } from '@shared/http/interfaces/controller';
```

Available path mappings:
- `@/*` → `src/*`
- `@kernel/*` → `src/application/kernel/*`
- `@shared/*` → `src/application/shared/*`
- `@domain/*` → `src/application/domain/*`
- `@main/*` → `src/main/*`
- `@types/*` → `src/@types/*`
- `@prisma/*` → `prisma/*`

### Database Schema

Update Prisma schemas in `prisma/schema/` and run migrations:

```bash
pnpm db:migrate:dev
```

## 🧪 Testing

```bash
# Run tests (implement your test suite)
pnpm test
```

## 🚀 Deployment

For production deployment:

1. Build the application: `pnpm build:prod`
2. Set up your production database
3. Run migrations: `pnpm db:migrate:deploy`
4. Start the server: `pnpm start:prod`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This template is available as open source under the [MIT License](LICENSE).

---

**Happy coding! 🎉**

For questions or issues, please create an issue in the repository.
