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
