---
name: testflow-api-endpoint-development-skill
description: Create, maintain, or evolve endpoints of the TestFlow API using JavaScript, Express, JWT, Swagger, and in-memory storage. Use when work involves implementing or changing routes, controllers, services, middlewares, validation rules, protected endpoints, Swagger documentation, README updates in Portuguese, functional documentation under /docs, or Jira stories related to API endpoint development in the TestFlow project.
---

# TestFlow API Endpoint Development Skill

Use this skill whenever the task is to create, maintain, document, or evolve endpoints of the TestFlow API.

## Stack

- `JavaScript`
- `Node.js`
- `Express`
- `JWT`
- `Swagger`

## Workflow

1. Entender o endpoint solicitado e suas regras de negocio.
2. Criar ou atualizar `routes`.
3. Criar ou atualizar `controllers`.
4. Criar ou atualizar `services`.
5. Criar ou atualizar `middlewares` quando necessario.
6. Validar as regras de negocio.
7. Validar entradas obrigatorias, tipos e valores permitidos.
8. Proteger endpoints com JWT quando aplicavel.
9. Retornar codigos HTTP corretos.
10. Validar o corpo da resposta.
11. Atualizar o Swagger.
12. Atualizar o `README.md` mantendo portugues do Brasil.
13. Atualizar a documentacao funcional em `/docs`.
14. Criar ou atualizar stories no Jira quando solicitado.
15. Nao criar endpoints extras sem autorizacao.
16. Nao implementar banco de dados sem autorizacao.
17. Nao executar `git add`, `git commit` ou `git push` sem aprovacao explicita do usuario.
18. Mostrar arquivos alterados.
19. Mostrar resumo da implementacao.
20. Mostrar instrucoes de teste no Swagger.
21. Mostrar `diff`.
22. Mostrar `git status`.

## Regras Gerais

- Usar `JavaScript`.
- Usar `Express`.
- Usar `JWT` para endpoints protegidos.
- Usar `Swagger` para documentacao.
- Manter o `README.md` em portugues do Brasil.
- Manter documentacao detalhada em `/docs`, nao no `README`.
- Usar armazenamento em memoria enquanto nao houver banco de dados.
- Manter codigo simples, limpo e organizado.
- Seguir o padrao atual do projeto.
- Nao alterar endpoints existentes sem necessidade.
- Nao executar `commit` ou `push` sem aprovacao do usuario.

## Padroes de Implementacao

- Reaproveitar o padrao atual de `routes`, `controllers` e `services`.
- Centralizar validacoes de negocio no ponto mais coerente com a estrutura atual do projeto.
- Cobrir respostas de sucesso e erro conforme as regras do endpoint.
- Documentar autenticacao `Bearer Token` no Swagger quando aplicavel.
- Manter o `README` enxuto e direcionar regras detalhadas para `/docs`.
- Atualizar somente os arquivos necessarios para a entrega solicitada.

## Entrega Esperada

- Endpoint implementado ou ajustado no padrao atual da TestFlow API.
- Validacoes de entrada e regras de negocio coerentes com o escopo pedido.
- Swagger atualizado.
- `README.md` atualizado quando necessario.
- Documentacao funcional em `/docs` atualizada quando necessario.
- Resumo final pronto para revisao antes de qualquer acao de versionamento.
