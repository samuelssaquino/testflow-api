# Plano de Testes - TestFlow API

## Objetivo

Definir a abordagem inicial de testes automatizados funcionais da TestFlow API, começando pela cobertura do endpoint `POST /login` e pela cobertura inicial do módulo `Projects`.

## Escopo

- Validação funcional do endpoint `POST /login`
- Validação funcional dos endpoints `POST /projects`, `GET /projects` e `GET /projects/{projectId}`
- Estrutura inicial de automação com `Mocha`, `Chai`, `Supertest`, `Mochawesome` e `dotenv`
- Organização inicial de `helpers`, `fixtures` e documentação de QA

## Fora de escopo

- Testes automatizados dos demais endpoints além de `POST /login`, `POST /projects`, `GET /projects` e `GET /projects/{projectId}` nesta etapa
- Testes de performance
- Testes de carga
- Testes de segurança aprofundados
- Integração com pipeline CI/CD

## Abordagem

- Executar testes funcionais de API cobrindo cenários positivos e negativos
- Validar autenticação JWT, `status code`, headers relevantes e corpo da resposta
- Validar regras de negócio dos endpoints cobertos
- Reutilizar `helpers` e `fixtures` para evitar duplicação
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
- Endpoints `POST /login`, `POST /projects`, `GET /projects` e `GET /projects/{projectId}` implementados e funcionais

## Critérios de saída

- Suíte inicial de `Auth` e `Projects` executando com sucesso
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
