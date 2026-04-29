# Projects

Este documento consolida as regras de negocio do modulo de projetos da TestFlow API nesta fase do projeto.

## POST /projects

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- O campo `name` e obrigatorio.
- O campo `name` deve ter no minimo 3 caracteres.
- O campo `description` e opcional.
- O campo `status` aceita apenas `active` e `archived`.
- Quando `status` nao for enviado, o valor padrao deve ser `active`.
- Nao permitir projetos com o mesmo `name`.
- O projeto criado deve retornar:
  - `id`
  - `name`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`
- Nesta fase, o armazenamento e feito em memoria.

## GET /projects

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- Retorna status `200` em caso de sucesso.
- Deve listar todos os projetos cadastrados em memoria.
- Quando nao existirem projetos cadastrados, deve retornar `[]`.
- Deve retornar os campos:
  - `id`
  - `name`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`
- Nao implementar filtros, paginacao ou ordenacao nesta etapa.

## GET /projects/{projectId}

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- Deve buscar um projeto pelo `id`.
- Quando o projeto existir, deve retornar status `200`.
- Quando o projeto nao existir, deve retornar status `404`.
- A resposta deve conter:
  - `id`
  - `name`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`

## PATCH /projects/{projectId}

- Endpoint protegido por JWT.
- Exige `Authorization: Bearer <token>`.
- Token ausente retorna `401`.
- Token invalido retorna `401`.
- Deve buscar o projeto pelo `id`.
- Quando o projeto nao existir, deve retornar `404`.
- Deve permitir atualizacao parcial apenas dos campos:
  - `name`
  - `description`
  - `status`
- Nao permitir alteracao dos campos:
  - `id`
  - `createdAt`
- Quando `name` for enviado, deve ter no minimo 3 caracteres.
- Quando `status` for enviado, deve aceitar apenas `active` e `archived`.
- Nao permitir atualizar para um `name` ja existente em outro projeto.
- Deve atualizar o campo `updatedAt`.
- Quando a atualizacao for concluida com sucesso, deve retornar status `200`.
- A resposta deve conter:
  - `id`
  - `name`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`
