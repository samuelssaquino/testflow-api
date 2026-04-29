# Bugs

Este documento consolida as regras de negocio do modulo de bugs da TestFlow API nesta fase do projeto.

## POST /bugs

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Campos obrigatorios:
  - `testRunId`
  - `testCaseId`
  - `title`
  - `description`
  - `severity`
  - `priority`
- Campos opcionais:
  - `status`
  - `evidence`
  - `stepsToReproduce`
- `title` deve ter no minimo 3 caracteres.
- `severity` aceita apenas `low`, `medium`, `high` e `critical`.
- `priority` aceita apenas `low`, `medium`, `high` e `critical`.
- `status` aceita apenas `open`, `in_progress`, `resolved` e `closed`.
- Quando `status` nao for enviado, o valor padrao deve ser `open`.
- `testRunId` deve existir.
- `testCaseId` deve existir.
- `testCaseId` deve pertencer ao `testRunId` informado.
- Nao permitir bug duplicado com mesmo `title` para o mesmo `testRunId` e `testCaseId`.
- O bug criado deve retornar:
  - `id`
  - `testRunId`
  - `testCaseId`
  - `title`
  - `description`
  - `severity`
  - `priority`
  - `status`
  - `evidence`
  - `stepsToReproduce`
  - `createdAt`
  - `updatedAt`

## PATCH /bugs/{bugId}

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- Deve buscar o bug pelo `id`.
- Quando o bug nao existir, deve retornar `404`.
- Deve permitir atualizacao parcial apenas dos campos:
  - `title`
  - `description`
  - `severity`
  - `priority`
  - `status`
  - `evidence`
  - `stepsToReproduce`
- Nao permitir alteracao dos campos:
  - `id`
  - `testRunId`
  - `testCaseId`
  - `createdAt`
- Quando houver tentativa de alterar `id`, `testRunId`, `testCaseId` ou `createdAt`, deve retornar `400`.
- Quando `title` for enviado, deve ter no minimo 3 caracteres.
- Quando `description` for enviada, nao pode ser vazia.
- Quando `severity` for enviada, deve aceitar apenas `low`, `medium`, `high` e `critical`.
- Quando `priority` for enviada, deve aceitar apenas `low`, `medium`, `high` e `critical`.
- Quando `status` for enviado, deve aceitar apenas `open`, `in_progress`, `resolved` e `closed`.
- Nao permitir atualizar para um `title` ja existente no mesmo `testRunId` e `testCaseId`.
- Quando existir bug duplicado no mesmo `testRunId` e `testCaseId`, deve retornar `409`.
- Deve atualizar o campo `updatedAt`.
- Quando a atualizacao for concluida com sucesso, deve retornar status `200` com o bug atualizado.
