# TestFlow API

A TestFlow API é uma API REST para gestão de testes de software, criada como projeto de portfólio pessoal. O projeto foi pensado para representar um cenário real de backend voltado ao controle de projetos de teste, casos de teste, execuções e registro de falhas, com foco em organização, clareza e boas práticas de desenvolvimento.

## Descrição

A proposta da TestFlow API é oferecer uma base para operações comuns de gerenciamento de testes em projetos de software. A API permite cadastrar projetos, criar e atualizar casos de teste, registrar execuções, controlar bugs encontrados e gerar resumos de execução. Além disso, conta com autenticação via JWT e documentação interativa com Swagger.

## Objetivo

O principal objetivo deste projeto é demonstrar habilidades de desenvolvimento backend por meio de uma aplicação prática e alinhada a necessidades do mercado. A API busca evidenciar conhecimento em arquitetura REST, autenticação, organização de rotas, modelagem de recursos e documentação de endpoints.

## Tecnologias Utilizadas

- Node.js
- JavaScript
- Express
- Arquitetura REST
- JWT para autenticação
- Swagger para documentação da API
- Nodemon para ambiente de desenvolvimento

## Autenticação com JWT

A autenticação da API é baseada em JSON Web Token (JWT). Após realizar o login com sucesso, o cliente recebe um token que deve ser enviado nas requisições autenticadas por meio do cabeçalho `Authorization`:

```http
Authorization: Bearer <seu-token>
```

Esse fluxo permite proteger endpoints privados e simula um modelo de autenticação comum em aplicações reais.

### Endpoint de Login

O endpoint de autenticação atualmente disponível é:

- `POST /login`

Credenciais de teste:

- `user`: `samuel.aquino`
- `password`: `123456`

### Exemplo de Request

```http
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "user": "samuel.aquino",
  "password": "123456"
}
```

Também é possível testar com `curl`:

```bash
curl -X POST http://localhost:3000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"user\":\"samuel.aquino\",\"password\":\"123456\"}"
```

### Exemplo de Response com Sucesso

```json
{
  "token": "jwt-token-gerado"
}
```

Observação: o token real é gerado dinamicamente pela API e possui expiração configurada em `1h`.

### Exemplo de Erro de Autenticação

Quando as credenciais estão incorretas, a API retorna:

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid credentials"
}
```

### Como Usar o Token Bearer

Depois de obter o token no `POST /login`, envie-o no cabeçalho `Authorization` das rotas protegidas:

```http
Authorization: Bearer <seu-token>
```

Exemplo:

```http
GET /rota-protegida HTTP/1.1
Host: localhost:3000
Authorization: Bearer <seu-token>
```

No Swagger, o token pode ser informado diretamente na interface para facilitar os testes dos endpoints autenticados.

## Documentação Swagger

A documentação da API é disponibilizada com Swagger, permitindo visualizar os endpoints, entender os formatos de entrada e saída e testar as rotas de forma interativa em ambiente local.

Após iniciar a aplicação, acesse:

```text
http://localhost:3000/api-docs
```

## Endpoints Iniciais da API

### Autenticação

- `POST /login` - Realiza autenticação e retorna um token JWT

### Próximos endpoints planejados

- `POST /projects` - Cria um novo projeto de testes
- `GET /projects` - Lista todos os projetos cadastrados
- `GET /projects/{projectId}` - Retorna os detalhes de um projeto específico
- `POST /test-cases` - Cria um novo caso de teste vinculado a um projeto
- `GET /test-cases` - Lista todos os casos de teste cadastrados
- `PATCH /test-cases/{testCaseId}` - Atualiza parcialmente um caso de teste existente
- `POST /test-runs` - Cria uma nova execução de testes
- `GET /test-runs` - Lista todas as execuções de teste
- `POST /bugs` - Registra um bug encontrado durante a execução dos testes
- `GET /reports/execution-summary` - Retorna um resumo das execuções de teste

## Estrutura Sugerida de Pastas

A estrutura abaixo representa uma organização recomendada para o projeto:

```text
testflow-api/
+-- src/
|   +-- controllers/
|   |   +-- authController.js
|   +-- docs/
|   |   +-- swagger.js
|   +-- middlewares/
|   +-- routes/
|   |   +-- authRoutes.js
|   +-- services/
|   |   +-- authService.js
|   +-- app.js
|   +-- server.js
+-- .env
+-- .env.example
+-- package.json
+-- README.md
```

## Como Instalar o Projeto

1. Clone o repositório.
2. Acesse a pasta do projeto.
3. Instale as dependências com o comando abaixo:

```bash
npm install
```

4. Crie o arquivo `.env` com base no `.env.example` e defina as variáveis de ambiente necessárias.

Exemplo:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

## Como Executar o Projeto

Para iniciar o ambiente de desenvolvimento, utilize:

```bash
npm run dev
```

Esse comando utiliza `nodemon` para reiniciar o servidor automaticamente durante o desenvolvimento.

Para executar a aplicação em modo padrão:

```bash
npm start
```

Por padrão, a API fica disponível em:

```text
http://localhost:3000
```

## Como Acessar o Swagger

Após iniciar a aplicação, a documentação Swagger poderá ser acessada no seguinte endereço:

```text
http://localhost:3000/api-docs
```

Na interface do Swagger, é possível visualizar o endpoint `POST /login`, enviar as credenciais de teste e inspecionar a resposta com o token JWT.

## Possíveis Evoluções Futuras

- Adicionar cadastro de usuários e controle de permissões por perfil
- Implementar testes automatizados para rotas e serviços
- Adicionar paginação, filtros e ordenação nas rotas de listagem
- Melhorar validações e tratamento de erros
- Integrar banco de dados para persistência das informações
- Configurar pipeline de CI/CD