# Test Runs

Este documento consolida as regras de negocio do modulo de execucoes de teste da TestFlow API nesta fase do projeto.

## POST /test-runs

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- `projectId` e obrigatorio.
- `title` e obrigatorio.
- `title` deve ter no minimo 3 caracteres.
- `description` e opcional.
- `testCaseIds` e obrigatorio.
- `testCaseIds` deve ser um array com pelo menos 1 item.
- Todos os `testCaseIds` devem existir.
- Todos os `testCaseIds` devem pertencer ao mesmo `projectId` informado.
- Nao permitir `testCaseIds` duplicados na mesma execucao.
- `status` e opcional.
- `status` aceita apenas `pending`, `in_progress` e `completed`.
- Quando `status` nao for enviado, o valor padrao deve ser `pending`.
- `executedBy` e obrigatorio.
- `executedBy` deve ser string.
- `startedAt` e opcional.
- `finishedAt` e opcional.
- Se `startedAt` for enviado, deve ser uma data valida.
- Se `finishedAt` for enviado, deve ser uma data valida.
- Se `startedAt` e `finishedAt` forem enviados, `finishedAt` nao pode ser menor que `startedAt`.
- Nao permitir duas execucoes com o mesmo `title` dentro do mesmo `projectId`.
- A execucao criada deve retornar:
  - `id`
  - `projectId`
  - `title`
  - `description`
  - `testCaseIds`
  - `status`
  - `executedBy`
  - `startedAt`
  - `finishedAt`
  - `createdAt`
  - `updatedAt`

## GET /test-runs

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Deve retornar status `200`.
- Quando nao existirem execucoes, deve retornar `[]`.
- Deve retornar todas as execucoes cadastradas em memoria.
- Nao implementar filtros, paginacao ou ordenacao nesta etapa.
