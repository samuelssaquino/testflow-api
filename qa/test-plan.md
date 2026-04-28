# Plano de Testes - TestFlow API

## Objetivo

Definir a abordagem inicial de testes automatizados funcionais da TestFlow API, cobrindo os módulos `Auth`, `Projects`, `Test Cases`, `Test Runs`, `Bugs` e `Reports`.

## Escopo

- Validação funcional do endpoint `POST /login`
- Validação funcional dos endpoints `POST /projects`, `GET /projects` e `GET /projects/{projectId}`
- Validação funcional dos endpoints `POST /test-cases`, `GET /test-cases` e `PATCH /test-cases/{testCaseId}`
- Validação funcional dos endpoints `POST /test-runs` e `GET /test-runs`
- Validação funcional do endpoint `POST /bugs`
- Validação funcional do endpoint `GET /reports/execution-summary`
- Estrutura inicial de automação com `Mocha`, `Chai`, `Supertest`, `Mochawesome` e `dotenv`
- Organização inicial de `helpers`, `fixtures` e documentação de QA

## Fora de escopo

- Testes automatizados dos demais endpoints além de `POST /login`, `POST /projects`, `GET /projects`, `GET /projects/{projectId}`, `POST /test-cases`, `GET /test-cases`, `PATCH /test-cases/{testCaseId}`, `POST /test-runs`, `GET /test-runs`, `POST /bugs` e `GET /reports/execution-summary` nesta etapa
- Testes de performance
- Testes de carga
- Testes de segurança aprofundados
- Integração com pipeline CI/CD

## Abordagem

- Executar testes funcionais de API cobrindo cenários positivos e negativos
- Validar autenticação JWT, `status code`, headers relevantes e corpo da resposta
- Validar regras de negócio dos endpoints cobertos
- Reutilizar `helpers` e `fixtures` para evitar duplicação
- Reutilizar autenticação e criação de dados de apoio sempre que possível
- Gerar relatório em `Mochawesome` para apoiar evidências de execução

## Tipos de teste

- Testes funcionais de API
- Testes de contrato básico da resposta
- Testes de validação de regras de negócio
- Testes negativos de validação

## Ferramentas

- `JavaScript`
- `Mocha`
- `Chai`
- `Supertest`
- `Mochawesome`
- `dotenv`

## Ambiente

- API TestFlow em ambiente local
- Execução contra `app` local ou via `BASE_URL`, quando configurado
- Variáveis de ambiente definidas em `.env`

## Critérios de entrada

- Dependências instaladas
- `JWT_SECRET` configurado
- Credenciais de teste disponíveis
- Endpoints `POST /login`, `POST /projects`, `GET /projects`, `GET /projects/{projectId}`, `POST /test-cases`, `GET /test-cases`, `PATCH /test-cases/{testCaseId}`, `POST /test-runs`, `GET /test-runs`, `POST /bugs` e `GET /reports/execution-summary` implementados e funcionais

## Critérios de saída

- Suíte inicial de `Auth`, `Projects`, `Test Cases`, `Test Runs`, `Bugs` e `Reports` executando com sucesso
- Casos positivos e negativos cobertos
- Relatório de execução gerado
- Documentação inicial de QA criada em `/qa`

## Riscos

- Mudanças no contrato dos endpoints sem atualização da suíte
- Divergência entre credenciais configuradas e credenciais reais da API
- Falta de isolamento de dados em futuras suítes com armazenamento em memória
- Diferenças de ambiente quando usar `BASE_URL` externo

## Endpoints cobertos inicialmente

- `POST /login`
- `POST /projects`
- `GET /projects`
- `GET /projects/{projectId}`
- `POST /test-cases`
- `GET /test-cases`
- `PATCH /test-cases/{testCaseId}`
- `POST /test-runs`
- `GET /test-runs`
- `POST /bugs`
- `GET /reports/execution-summary`
