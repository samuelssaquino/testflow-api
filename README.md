# TestFlow API

## Descrição

TestFlow API é uma API REST para gestão de testes de software, desenvolvida como projeto de portfólio com foco em simular um backend real para operações de qualidade de software.

No estado atual, a API já possui autenticação, gestão de projetos, gestão de casos de teste, gestão de execuções de teste, registro e atualização de bugs, relatório consolidado de execução e testes automatizados funcionais para os principais endpoints do MVP.

## Tecnologias

- Node.js
- JavaScript
- Express
- JWT
- Swagger
- Nodemon
- Mocha
- Chai
- Supertest
- Mochawesome
- dotenv

## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com base no `.env.example`:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

3. Inicie a API:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Swagger

O Swagger está disponível em:

```text
http://localhost:3000/api-docs
```

Para testar endpoints protegidos, faça login em `POST /login`, copie o token JWT retornado e use o botão `Authorize` do Swagger com o formato:

```text
Bearer <token>
```

## Testes Automatizados

O projeto possui uma suíte de testes automatizados funcionais cobrindo os principais endpoints implementados:

- `POST /login`
- `POST /projects`
- `GET /projects`
- `GET /projects/{projectId}`
- `PATCH /projects/{projectId}`
- `POST /test-cases`
- `GET /test-cases`
- `PATCH /test-cases/{testCaseId}`
- `DELETE /test-cases/{testCaseId}`
- `POST /test-runs`
- `GET /test-runs`
- `POST /bugs`
- `PATCH /bugs/{bugId}`
- `GET /reports/execution-summary`

Os testes validam:

- `status code`
- corpo da resposta
- regras de negócio
- autenticação JWT
- cenários positivos e negativos
- relatórios com `Mochawesome`

Comandos disponíveis:

```bash
npm test
npm run test:report
```

Documentação de QA:

- [Plano de Testes](./qa/test-plan.md)
- [Casos de Teste](./qa/test-cases.md)
- [Relatório de Testes](./qa/test-report.md)

## Endpoints implementados

### Autenticação

- `POST /login`

### Projetos

- `POST /projects`
- `GET /projects`
- `GET /projects/{projectId}`
- `PATCH /projects/{projectId}`

### Casos de Teste

- `POST /test-cases`
- `GET /test-cases`
- `PATCH /test-cases/{testCaseId}`
- `DELETE /test-cases/{testCaseId}`

### Execuções de Teste

- `POST /test-runs`
- `GET /test-runs`

### Bugs

- `POST /bugs`
- `PATCH /bugs/{bugId}`

### Relatórios

- `GET /reports/execution-summary`

## Regras de Negócio

As regras de negócio detalhadas estão organizadas por módulo na pasta `docs/`:

- Autenticação: documentação específica ainda não separada em arquivo próprio nesta etapa
- [Projetos](./docs/projects.md)
- [Casos de Teste](./docs/test-cases.md)
- [Execuções de Teste](./docs/test-runs.md)
- [Bugs](./docs/bugs.md)
- [Relatórios](./docs/reports.md)

## Endpoints planejados

No momento, todos os endpoints previstos para o MVP atual foram implementados. Novos endpoints poderão ser adicionados conforme a evolução do projeto.

## Fluxo de autenticação JWT

1. Envie as credenciais para `POST /login`.
2. Copie o token retornado.
3. Use o token nas rotas protegidas com:

```http
Authorization: Bearer <token>
```

## Estrutura do projeto

```text
testflow-api/
+-- .codex/
|   +-- skills/
|   |   +-- testflow-api-endpoint-development-skill/
|   |   |   +-- SKILL.md
|   |   +-- testflow-api-test-automation-skill/
|   |   |   +-- SKILL.md
|   |   |   +-- openai.yaml
+-- docs/
|   +-- bugs.md
|   +-- projects.md
|   +-- reports.md
|   +-- test-cases.md
|   +-- test-runs.md
+-- qa/
|   +-- reports/
|   +-- test-cases.md
|   +-- test-plan.md
|   +-- test-report.md
+-- src/
|   +-- controllers/
|   +-- docs/
|   |   +-- swagger.js
|   +-- middlewares/
|   +-- routes/
|   +-- services/
|   +-- app.js
|   +-- server.js
+-- test/
|   +-- auth/
|   |   +-- login.test.js
|   +-- bugs/
|   |   +-- bugs.test.js
|   +-- fixtures/
|   |   +-- auth.fixture.js
|   |   +-- bugs.fixture.js
|   |   +-- projects.fixture.js
|   |   +-- test-cases.fixture.js
|   |   +-- test-runs.fixture.js
|   +-- helpers/
|   |   +-- auth.helper.js
|   |   +-- bugs.helper.js
|   |   +-- projects.helper.js
|   |   +-- reports.helper.js
|   |   +-- test-cases.helper.js
|   |   +-- test-runs.helper.js
|   +-- projects/
|   |   +-- projects.test.js
|   +-- reports/
|   |   +-- execution-summary.test.js
|   +-- test-cases/
|   |   +-- test-cases.test.js
|   +-- test-runs/
|   |   +-- test-runs.test.js
+-- .env.example
+-- package.json
+-- README.md
```

## Melhorias futuras

- Introduzir persistência em banco de dados
- Criar camada de repositórios
- Implementar cadastro real de usuários
- Adicionar controle de perfis e permissões
- Adicionar paginação, filtros e ordenação
- Criar testes de integração mais abrangentes
- Criar testes de performance com K6
- Adicionar pipeline de CI/CD
- Publicar documentação técnica complementar
- Preparar deploy em ambiente cloud
