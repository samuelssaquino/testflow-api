# Reports

Este documento consolida as regras de negocio do modulo de relatorios da TestFlow API nesta fase do projeto.

## GET /reports/execution-summary

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Deve retornar status `200` quando o token for valido.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- Deve calcular os dados a partir das estruturas em memoria existentes.
- Nao deve alterar os dados existentes, apenas consultar.
- Quando nao existirem dados cadastrados, deve retornar metricas zeradas.
- O relatorio deve retornar:
  - `totalProjects`
  - `totalTestCases`
  - `totalTestRuns`
  - `totalBugs`
  - `testCasesByStatus`
  - `testRunsByStatus`
  - `bugsByStatus`
  - `bugsBySeverity`
  - `bugsByPriority`
- O agrupamento de `testCasesByStatus` deve conter:
  - `draft`
  - `ready`
  - `deprecated`
- O agrupamento de `testRunsByStatus` deve conter:
  - `pending`
  - `in_progress`
  - `completed`
- O agrupamento de `bugsByStatus` deve conter:
  - `open`
  - `in_progress`
  - `resolved`
  - `closed`
- O agrupamento de `bugsBySeverity` deve conter:
  - `low`
  - `medium`
  - `high`
  - `critical`
- O agrupamento de `bugsByPriority` deve conter:
  - `low`
  - `medium`
  - `high`
  - `critical`
