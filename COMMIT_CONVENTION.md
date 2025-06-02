# Convenções de Commit

Este projeto utiliza **Conventional Commits** com **Commitlint** e **Husky** para garantir mensagens de commit padronizadas.

## Formato das Mensagens de Commit

```
<tipo>(<escopo opcional>): <descrição>

<corpo opcional>

<rodapé opcional>
```

### Tipos Permitidos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Formatação, ponto e vírgula, etc (sem mudança de código)
- **refactor**: Refatoração de código
- **test**: Adição ou correção de testes
- **chore**: Tarefas de build, configurações, etc
- **perf**: Melhoria de performance
- **ci**: Mudanças de CI/CD
- **build**: Mudanças de build
- **revert**: Reverter commit anterior

### Exemplos de Commits Válidos

```bash
feat: adiciona autenticação JWT
fix: corrige erro na validação de email
docs: atualiza README com instruções de instalação
style: corrige formatação do código
refactor: reorganiza estrutura de pastas
test: adiciona testes para o controller de usuários
chore: atualiza dependências do projeto
perf: otimiza consulta de banco de dados
ci: configura GitHub Actions
feat(auth): adiciona middleware de autenticação
fix(api): corrige endpoint de listagem de usuários
```

### Exemplos de Commits Inválidos

```bash
# Sem tipo
adiciona nova funcionalidade

# Tipo inválido
feature: adiciona nova funcionalidade

# Sem descrição
feat:

# Descrição muito longa (mais de 100 caracteres)
feat: esta é uma descrição muito longa que excede o limite de caracteres permitido e será rejeitada pelo commitlint

# Primeira letra maiúscula
feat: Adiciona nova funcionalidade
```

## Scripts Disponíveis

```bash
# Executa o linting
pnpm run lint

# Formata o código
pnpm run format

# Testa uma mensagem de commit
pnpm run commitlint

# Valida mensagem de commit de um arquivo
npx commitlint --edit <arquivo>
```

## Git Hooks

- **pre-commit**: Executa `pnpm run db:generate` e `eslint --fix` antes de cada commit
- **commit-msg**: Valida a mensagem de commit usando commitlint

## Desabilitando Hooks (Emergência)

Se precisar fazer um commit urgente sem validação:

```bash
git commit --no-verify -m "fix: correção urgente"
```

**⚠️ Use apenas em emergências!**
