# Plano de Testes - TestFlow API

## Objetivo

Definir a abordagem inicial de testes automatizados funcionais da TestFlow API, começando pela cobertura do endpoint `POST /login`.

## Escopo

- Validação funcional do endpoint `POST /login`
- Estrutura inicial de automação com `Mocha`, `Chai`, `Supertest`, `Mochawesome` e `dotenv`
- Organização inicial de `helpers`, `fixtures` e documentação de QA

## Fora de escopo

- Testes automatizados dos demais endpoints nesta etapa
- Testes de performance
- Testes de carga
- Testes de segurança aprofundados
- Integração com pipeline CI/CD

## Abordagem

- Executar testes funcionais de API cobrindo cenários positivos e negativos
- Validar `status code`, headers relevantes e corpo da resposta
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
- Endpoint `POST /login` implementado e funcional

## Critérios de saída

- Suite inicial de login executando com sucesso
- Casos positivos e negativos cobertos
- Relatório de execução gerado
- Documentação inicial de QA criada em `/qa`

## Riscos

- Mudanças no contrato do endpoint sem atualização da suite
- Divergência entre credenciais configuradas e credenciais reais da API
- Falta de isolamento de dados em futuras suites com armazenamento em memória
- Diferenças de ambiente quando usar `BASE_URL` externo

## Endpoints cobertos inicialmente

- `POST /login`
