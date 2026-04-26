# TestFlow API

TestFlow API é uma API REST para gestão de testes de software. O projeto está sendo desenvolvido em etapas, com os endpoints implementados documentados separadamente dos endpoints que ainda estão planejados.

## Descrição

A API foi projetada para suportar fluxos comuns de testes, como criação de projetos, gerenciamento de casos de teste, acompanhamento de execuções, registro de bugs e geração de relatórios. No estágio atual, autenticação e criação protegida de projetos já estão disponíveis.

## Tecnologias

- Node.js
- JavaScript
- Express
- JWT
- Swagger
- Nodemon

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

Use o Swagger para testar os endpoints implementados de forma interativa, incluindo rotas protegidas que exigem Bearer Token.

## Endpoints implementados

### Autenticação

- `POST /login`

Credenciais de teste:

- `user`: `samuel.aquino`
- `password`: `123456`

Exemplo de requisição:

```json
{
  "user": "samuel.aquino",
  "password": "123456"
}
```

Exemplo de resposta com sucesso:

```json
{
  "message": "Login successful",
  "token": "jwt-token-gerado"
}
```

O JWT é gerado somente após credenciais válidas e atualmente inclui dados simples no payload, como `user` e `role`, com expiração configurada em `1h`.

### Projetos

- `POST /projects`
- `GET /projects`
- `GET /projects/{projectId}`

Os endpoints de projetos são protegidos por JWT e exigem o header:

```http
Authorization: Bearer <token>
```

Os endpoints de consulta de projetos também são protegidos por JWT.

Exemplo de uso do Bearer Token:

```http
POST /projects HTTP/1.1
Host: localhost:3000
Authorization: Bearer <token>
Content-Type: application/json
```

Exemplo de requisição:

```json
{
  "name": "Website QA Project",
  "description": "Test project for website regression testing",
  "status": "active"
}
```

## Regras de Negócio

As regras de negócio da API estão sendo formalizadas e rastreadas no Jira conforme a evolução do projeto.

### Autenticação (POST /login)

- `user` é obrigatório
- `password` é obrigatório
- ambos devem ser `string`
- ambos não podem ser vazios
- o campo `user` deve ser normalizado com `trim()`
- credenciais válidas:
  - `user`: `samuel.aquino`
  - `password`: `123456`
- credenciais inválidas retornam `401`
- credenciais ausentes ou inválidas retornam `400` quando aplicável
- a resposta nunca deve expor a `password`
- o token JWT deve conter payload básico
- o token deve possuir expiração
- o endpoint deve estar documentado no Swagger

### Projetos (POST /projects)

- endpoint protegido por JWT
- exige `Authorization: Bearer <token>`
- token ausente retorna `401`
- token inválido retorna `401`
- `name` é obrigatório
- `name` deve ter no mínimo 3 caracteres
- `description` é opcional
- `status` aceita apenas:
  - `active`
  - `archived`
- o `status` padrão deve ser `active`
- não permitir projetos com o mesmo `name`
- o projeto deve retornar:
  - `id`
  - `name`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`
- o endpoint deve estar documentado no Swagger

Para regras mais detalhadas do módulo de projetos, consulte [docs/projects.md](/D:/MENTORIAJULIO/PROJETOS/testflow-api/docs/projects.md).

### Casos de Teste

- `POST /test-cases`
- `GET /test-cases`
- `PATCH /test-cases/{testCaseId}`

Os endpoints de casos de teste também são protegidos por JWT e exigem `Authorization: Bearer <token>`.

Para regras mais detalhadas do módulo de casos de teste, consulte [docs/test-cases.md](/D:/MENTORIAJULIO/PROJETOS/testflow-api/docs/test-cases.md).

## Endpoints planejados

- `POST /test-runs`
- `GET /test-runs`
- `POST /bugs`
- `GET /reports/execution-summary`

Conforme novos endpoints forem implementados, eles devem sair da seção de planejados e passar para a seção de implementados.

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
+-- docs/
|   +-- projects.md
|   +-- test-cases.md
+-- src/
|   +-- controllers/
|   |   +-- authController.js
|   |   +-- projectsController.js
|   |   +-- testCasesController.js
|   +-- docs/
|   |   +-- swagger.js
|   +-- middlewares/
|   |   +-- authMiddleware.js
|   +-- routes/
|   |   +-- authRoutes.js
|   |   +-- projectsRoutes.js
|   |   +-- testCasesRoutes.js
|   +-- services/
|   |   +-- authService.js
|   |   +-- projectsService.js
|   |   +-- testCasesService.js
|   +-- app.js
|   +-- server.js
+-- .env
+-- .env.example
+-- package.json
+-- README.md
```

## Melhorias futuras

- Adicionar testes automatizados para rotas e serviços
- Introduzir persistência em banco de dados
- Adicionar gerenciamento de usuários e perfis de autorização
- Expandir validações e tratamento de erros
- Adicionar pipeline de CI/CD
