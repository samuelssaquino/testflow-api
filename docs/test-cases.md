# Test Cases

Este documento consolida as regras de negocio do modulo de casos de teste da TestFlow API nesta fase do projeto.

## POST /test-cases

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- `projectId` e obrigatorio.
- `title` e obrigatorio.
- `title` deve ter no minimo 3 caracteres.
- `description` e opcional.
- `preconditions` e opcional.
- `steps` e obrigatorio.
- `steps` deve ser um array com pelo menos 1 item.
- `expectedResult` e obrigatorio.
- `priority` e obrigatoria.
- `priority` aceita apenas `low`, `medium`, `high` e `critical`.
- `status` e opcional.
- `status` aceita apenas `draft`, `ready` e `deprecated`.
- Quando `status` nao for enviado, o valor padrao deve ser `draft`.
- `projectId` deve existir na lista de projetos em memoria.
- Nao permitir dois casos de teste com o mesmo `title` dentro do mesmo `projectId`.
- O caso de teste criado deve retornar:
  - `id`
  - `projectId`
  - `title`
  - `description`
  - `preconditions`
  - `steps`
  - `expectedResult`
  - `priority`
  - `status`
  - `createdAt`
  - `updatedAt`

## GET /test-cases

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Deve retornar status `200`.
- Quando nao existirem casos de teste, deve retornar `[]`.
- Deve retornar todos os casos de teste cadastrados em memoria.
- Nao implementar filtros, paginacao ou ordenacao nesta etapa.

## PATCH /test-cases/{testCaseId}

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- `testCaseId` e obrigatorio no path.
- Deve permitir atualizacao parcial de:
  - `title`
  - `description`
  - `preconditions`
  - `steps`
  - `expectedResult`
  - `priority`
  - `status`
- Nao permitir atualizacao de:
  - `id`
  - `projectId`
  - `createdAt`
- Se `title` for enviado, deve ter no minimo 3 caracteres.
- Se `steps` for enviado, deve ser array com pelo menos 1 item.
- Se `priority` for enviada, deve aceitar apenas `low`, `medium`, `high` e `critical`.
- Se `status` for enviado, deve aceitar apenas `draft`, `ready` e `deprecated`.
- Se o `testCaseId` nao existir, deve retornar `404`.
- Se o novo `title` ja existir em outro caso de teste do mesmo `projectId`, deve retornar `409`.
- O campo `updatedAt` deve ser atualizado.
- O endpoint deve retornar o caso de teste atualizado.

## DELETE /test-cases/{testCaseId}

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- `testCaseId` e obrigatorio no path.
- Deve buscar o caso de teste pelo `id` informado.
- Se o caso de teste nao existir, deve retornar `404`.
- Se o caso de teste existir, deve ser removido do armazenamento em memoria.
- Apos removido, o caso de teste nao deve aparecer em `GET /test-cases`.
- Apos removido, o caso de teste nao deve poder ser usado em novas execucoes de teste.
- A operacao nao deve alterar projetos existentes.
- A operacao nao deve alterar test runs ja existentes.
- A operacao nao deve alterar bugs ja existentes.
- Quando a exclusao for concluida com sucesso, deve retornar status `200`.
- A resposta de sucesso deve retornar:
  - `message: "Test case deleted successfully"`
