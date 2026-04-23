# TestFlow API

A TestFlow API é uma API REST para gestão de testes de software, criada como projeto de portfólio pessoal. O projeto foi pensado para representar um cenário real de backend voltado ao controle de projetos de teste, casos de teste, execuções e registro de falhas, com foco em organização, clareza e boas práticas de desenvolvimento.

## Descrição

A proposta da TestFlow API é oferecer uma base para operações comuns de gerenciamento de testes em projetos de software. A API permite cadastrar projetos, criar e atualizar casos de teste, registrar execuções, controlar bugs encontrados e gerar resumos de execução. Além disso, conta com autenticação via JWT e documentação interativa com Swagger.

## Objetivo

O principal objetivo deste projeto é demonstrar habilidades de desenvolvimento backend por meio de uma aplicação prática e alinhada a necessidades do mercado. A API busca evidenciar conhecimento em arquitetura REST, autenticação, organização de rotas, modelagem de recursos e documentação de endpoints.

## Tecnologias Utilizadas

- Node.js
- JavaScript
- Arquitetura REST
- JWT para autenticação
- Swagger para documentação da API

## Autenticação com JWT

A autenticação da API é baseada em JSON Web Token (JWT). Após realizar o login com sucesso, o cliente recebe um token que deve ser enviado nas requisições autenticadas por meio do cabeçalho `Authorization`:

```http
Authorization: Bearer <seu-token>
```

Esse fluxo permite proteger endpoints privados e simula um modelo de autenticação comum em aplicações reais.

## Documentação Swagger

A documentação da API é disponibilizada com Swagger, permitindo visualizar os endpoints, entender os formatos de entrada e saída e testar as rotas de forma interativa em ambiente local.

## Endpoints Iniciais da API

### Projetos

- `POST /projects` - Cria um novo projeto de testes
- `GET /projects` - Lista todos os projetos cadastrados
- `GET /projects/{projectId}` - Retorna os detalhes de um projeto específico

### Casos de Teste

- `POST /test-cases` - Cria um novo caso de teste vinculado a um projeto
- `GET /test-cases` - Lista todos os casos de teste cadastrados
- `PATCH /test-cases/{testCaseId}` - Atualiza parcialmente um caso de teste existente

### Execuções de Teste

- `POST /test-runs` - Cria uma nova execução de testes
- `GET /test-runs` - Lista todas as execuções de teste

### Bugs e Relatórios

- `POST /bugs` - Registra um bug encontrado durante a execução dos testes
- `GET /reports/execution-summary` - Retorna um resumo das execuções de teste

## Estrutura Sugerida de Pastas

A estrutura abaixo representa uma organização recomendada para o projeto:

```text
testflow-api/
+-- src/
¦   +-- controllers/
¦   +-- routes/
¦   +-- services/
¦   +-- middlewares/
¦   +-- models/
¦   +-- docs/
¦   +-- app.js
+-- .env
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

## Como Executar o Projeto

Para iniciar o ambiente de desenvolvimento, utilize:

```bash
npm run dev
```

Caso o projeto utilize script padrão de inicialização, também é possível executar com:

```bash
npm start
```

## Como Acessar o Swagger

Após iniciar a aplicação, a documentação Swagger poderá ser acessada, em geral, no seguinte endereço:

```text
http://localhost:3005/api-docs
```

O caminho pode variar de acordo com a configuração adotada no projeto.

## Possíveis Evoluções Futuras

- Adicionar cadastro de usuários e controle de permissões por perfil
- Implementar testes automatizados para rotas e serviços
- Adicionar paginação, filtros e ordenação nas rotas de listagem
- Melhorar validações e tratamento de erros
- Integrar banco de dados para persistência das informações
- Configurar pipeline de CI/CD

