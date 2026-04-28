---
name: testflow-api-test-automation-skill
description: Create, maintain, or evolve automated tests for the TestFlow API using JavaScript, Mocha, Chai, Supertest, Mochawesome, and dotenv. Use when work involves functional API test coverage, negative and positive scenarios, reusable test helpers, fixtures, auth setup, environment configuration, test reports, README updates related to testing, or QA documentation under /qa for the TestFlow API project.
---

# TestFlow API Test Automation Skill

Use this skill whenever the task is to create, maintain, organize, or expand automated tests for the TestFlow API.

## Stack

- `JavaScript`
- `Mocha`
- `Chai`
- `Supertest`
- `Mochawesome`
- `dotenv`

## Workflow

1. Entender o endpoint e suas regras de negocio.
2. Criar ou atualizar a estrutura de testes.
3. Criar testes positivos e negativos.
4. Validar `status code`.
5. Validar headers quando aplicavel.
6. Validar o `response body`.
7. Validar a estrutura e o conteudo do corpo da resposta.
8. Validar as regras de negocio.
9. Garantir que dados sensiveis, como `password`, nao sejam retornados.
10. Criar ou atualizar variaveis de ambiente quando necessario.
11. Criar ou atualizar `helpers` quando necessario.
12. Criar ou atualizar `fixtures` quando necessario.
13. Utilizar hooks como `before`, `beforeEach` e `after` quando fizer sentido.
14. Reutilizar autenticacao e massa de dados sempre que possivel.
15. Configurar e manter o relatorio com `Mochawesome`.
16. Atualizar o `README.md` quando necessario.
17. Atualizar ou criar documentacao em `/qa`.
18. Nao executar `git add`, `git commit` ou `git push` sem aprovacao explicita do usuario.
19. Mostrar arquivos alterados, resumo da implementacao, diff e `git status`.

## Regras Obrigatorias

- Nao alterar a API sem necessidade.
- Criar testes claros, organizados e reutilizaveis.
- Todos os nomes dos testes automatizados devem estar em portugues do Brasil. Isso inclui os textos dentro de `describe(...)` e `it(...)`. Nao usar ingles nos titulos dos testes.
- Manter documentacao em portugues do Brasil.
- Preferir reutilizacao em vez de duplicacao.
- Usar `fixtures` para massas de dados estaticas.
- Usar `helpers` para autenticacao, setup e utilitarios.
- Usar variaveis de ambiente para `BASE_URL`, credenciais e dados configuraveis.
- Validar sempre o corpo da resposta, nao apenas o `status code`.
- Validar mensagens de erro, estrutura JSON e campos esperados.

## Padroes de Implementacao

- Reaproveitar autenticacao entre suites sempre que possivel.
- Centralizar criacao de massa de dados repetitiva em `helpers` ou `fixtures`.
- Separar claramente cenarios de sucesso e erro.
- Cobrir respostas `2xx`, `4xx` e outros comportamentos relevantes do endpoint.
- Validar campos obrigatorios, tipos, mensagens e regras de integridade.
- Atualizar `README` apenas quando houver impacto real na forma de executar ou entender os testes.
- Colocar detalhes funcionais e operacionais de QA em `/qa`, mantendo o `README` enxuto.

## Entrega Esperada

- Suite de testes consistente com o padrao do projeto.
- Cobertura funcional clara para cenarios positivos e negativos.
- Reuso de autenticacao, `helpers` e `fixtures` sempre que fizer sentido.
- Documentacao de QA atualizada quando necessario.
- Resumo final pronto para revisao antes de qualquer acao de versionamento.
