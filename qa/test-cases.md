# Casos de Teste - POST /login

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| AUTH-001 | Login com credenciais validas | API disponivel e `JWT_SECRET` configurado | `user: samuel.aquino`, `password: 123456` | Enviar `POST /login` com credenciais validas | Retornar `200`, mensagem de sucesso e token JWT | Alta |
| AUTH-002 | Login com user contendo espacos | API disponivel e `JWT_SECRET` configurado | `user: "  samuel.aquino  "`, `password: 123456` | Enviar `POST /login` com espacos antes e depois do user | Retornar `200` e autenticar com sucesso | Alta |
| AUTH-003 | Login sem user | API disponivel | `password: 123456` | Enviar `POST /login` sem o campo `user` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| AUTH-004 | Login sem password | API disponivel | `user: samuel.aquino` | Enviar `POST /login` sem o campo `password` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| AUTH-005 | Login com user vazio | API disponivel | `user: ""`, `password: 123456` | Enviar `POST /login` com `user` vazio | Retornar `400` com mensagem de campo vazio | Alta |
| AUTH-006 | Login com password vazio | API disponivel | `user: samuel.aquino`, `password: ""` | Enviar `POST /login` com `password` vazio | Retornar `400` com mensagem de campo vazio | Alta |
| AUTH-007 | Login com user nao string | API disponivel | `user: 123`, `password: 123456` | Enviar `POST /login` com `user` numerico | Retornar `400` com mensagem de tipo invalido | Alta |
| AUTH-008 | Login com password nao string | API disponivel | `user: samuel.aquino`, `password: 123456` numerico | Enviar `POST /login` com `password` numerica | Retornar `400` com mensagem de tipo invalido | Alta |
| AUTH-009 | Login com user incorreto | API disponivel | `user: wrong.user`, `password: 123456` | Enviar `POST /login` com usuario incorreto | Retornar `401` com mensagem generica | Alta |
| AUTH-010 | Login com password incorreta | API disponivel | `user: samuel.aquino`, `password: wrong-password` | Enviar `POST /login` com senha incorreta | Retornar `401` com mensagem generica | Alta |
| AUTH-011 | Validar que erro nao diferencia user e password | API disponivel | Usuario invalido e senha invalida em cenarios separados | Executar cenarios de credenciais invalidas | Ambas as respostas retornam a mesma mensagem `Invalid credentials` | Alta |
| AUTH-012 | Validar ausencia de password na resposta | API disponivel | Credenciais validas e invalidas | Executar login com sucesso e erro | Nenhuma resposta retorna o campo `password` | Alta |
| AUTH-013 | Validar payload do token JWT | API disponivel e `JWT_SECRET` configurado | Credenciais validas | Executar login e decodificar token | Token contem `user`, `role`, `iat` e `exp` | Alta |

# Casos de Teste - Projects

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| PROJ-001 | Criar projeto com token valido | API disponivel e token JWT valido | `name`, `description` e `status` validos | Enviar `POST /projects` com Bearer Token | Retornar `201` com `id`, `name`, `description`, `status`, `createdAt` e `updatedAt` | Alta |
| PROJ-002 | Criar projeto sem status | API disponivel e token JWT valido | `name` e `description` validos | Enviar `POST /projects` sem o campo `status` | Retornar `201` com `status: active` | Alta |
| PROJ-003 | Criar projeto sem token | API disponivel | Payload valido | Enviar `POST /projects` sem header `Authorization` | Retornar `401` com mensagem de token obrigatorio | Alta |
| PROJ-004 | Criar projeto com token invalido | API disponivel | Payload valido e token invalido | Enviar `POST /projects` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| PROJ-005 | Criar projeto sem name | API disponivel e token JWT valido | `description` e `status` validos | Enviar `POST /projects` sem o campo `name` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| PROJ-006 | Criar projeto com name menor que 3 caracteres | API disponivel e token JWT valido | `name: "AB"` | Enviar `POST /projects` com nome invalido | Retornar `400` com mensagem de tamanho minimo | Alta |
| PROJ-007 | Criar projeto com status invalido | API disponivel e token JWT valido | `status: inactive` | Enviar `POST /projects` com status invalido | Retornar `400` com mensagem de status permitido | Alta |
| PROJ-008 | Criar projeto duplicado | API disponivel e token JWT valido | Mesmo `name` em duas requisicoes | Executar duas criacoes com o mesmo nome | Segunda resposta retorna `409` | Alta |
| PROJ-009 | Validar ausencia de dados sensiveis no projeto criado | API disponivel e token JWT valido | Payload valido | Criar projeto com sucesso | Resposta nao retorna `password` nem `token` | Media |
| PROJ-010 | Listar projetos com token valido | API disponivel e token JWT valido | Pelo menos um projeto criado | Enviar `GET /projects` com Bearer Token | Retornar `200` e array de projetos | Alta |
| PROJ-011 | Listar projetos sem token | API disponivel | Nenhuma massa especifica | Enviar `GET /projects` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| PROJ-012 | Listar projetos com token invalido | API disponivel | Token invalido | Enviar `GET /projects` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| PROJ-013 | Buscar projeto existente por id | API disponivel, token JWT valido e projeto criado | `projectId` valido | Enviar `GET /projects/{projectId}` | Retornar `200` com os dados do projeto | Alta |
| PROJ-014 | Buscar projeto inexistente por id | API disponivel e token JWT valido | `projectId` inexistente | Enviar `GET /projects/{projectId}` | Retornar `404` com mensagem `Project not found` | Alta |
| PROJ-015 | Buscar projeto por id sem token | API disponivel | `projectId` qualquer | Enviar `GET /projects/{projectId}` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| PROJ-016 | Buscar projeto por id com token invalido | API disponivel | `projectId` qualquer e token invalido | Enviar `GET /projects/{projectId}` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |

# Casos de Teste - Test Cases

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Criar caso de teste com token valido | API disponivel, token JWT valido e projeto existente | Payload valido com `projectId` existente | Enviar `POST /test-cases` com Bearer Token | Retornar `201` com os campos do test case | Alta |
| TC-002 | Criar caso de teste sem status | API disponivel, token JWT valido e projeto existente | Payload valido sem `status` | Enviar `POST /test-cases` sem o campo `status` | Retornar `201` com `status: draft` | Alta |
| TC-003 | Criar caso de teste sem token | API disponivel e projeto existente | Payload valido | Enviar `POST /test-cases` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| TC-004 | Criar caso de teste com token invalido | API disponivel e projeto existente | Payload valido e token invalido | Enviar `POST /test-cases` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| TC-005 | Criar caso de teste sem projectId | API disponivel e token JWT valido | Payload sem `projectId` | Enviar `POST /test-cases` sem `projectId` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TC-006 | Criar caso de teste com projectId inexistente | API disponivel e token JWT valido | `projectId` inexistente | Enviar `POST /test-cases` com projeto invalido | Retornar `404` com mensagem `Project not found` | Alta |
| TC-007 | Criar caso de teste sem title | API disponivel, token JWT valido e projeto existente | Payload sem `title` | Enviar `POST /test-cases` sem `title` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TC-008 | Criar caso de teste com title menor que 3 caracteres | API disponivel, token JWT valido e projeto existente | `title: "AB"` | Enviar `POST /test-cases` com titulo invalido | Retornar `400` com mensagem de tamanho minimo | Alta |
| TC-009 | Criar caso de teste sem steps | API disponivel, token JWT valido e projeto existente | Payload sem `steps` | Enviar `POST /test-cases` sem `steps` | Retornar `400` com mensagem de array obrigatorio | Alta |
| TC-010 | Criar caso de teste com steps nao array | API disponivel, token JWT valido e projeto existente | `steps` como texto | Enviar `POST /test-cases` com `steps` invalido | Retornar `400` com mensagem de array invalido | Alta |
| TC-011 | Criar caso de teste com steps vazio | API disponivel, token JWT valido e projeto existente | `steps: []` | Enviar `POST /test-cases` com array vazio | Retornar `400` com mensagem de array invalido | Alta |
| TC-012 | Criar caso de teste sem expectedResult | API disponivel, token JWT valido e projeto existente | Payload sem `expectedResult` | Enviar `POST /test-cases` sem `expectedResult` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TC-013 | Criar caso de teste com priority invalida | API disponivel, token JWT valido e projeto existente | `priority: urgent` | Enviar `POST /test-cases` com prioridade invalida | Retornar `400` com mensagem de prioridade permitida | Alta |
| TC-014 | Criar caso de teste com status invalido | API disponivel, token JWT valido e projeto existente | `status: active` | Enviar `POST /test-cases` com status invalido | Retornar `400` com mensagem de status permitido | Alta |
| TC-015 | Criar caso de teste duplicado no mesmo projeto | API disponivel, token JWT valido e projeto existente | Mesmo `title` no mesmo `projectId` | Executar duas criacoes com o mesmo titulo no mesmo projeto | Segunda resposta retorna `409` | Alta |
| TC-016 | Listar casos de teste com token valido | API disponivel e token JWT valido | Pelo menos um test case criado | Enviar `GET /test-cases` com Bearer Token | Retornar `200` e array de test cases | Alta |
| TC-017 | Listar casos de teste sem token | API disponivel | Nenhuma massa especifica | Enviar `GET /test-cases` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| TC-018 | Listar casos de teste com token invalido | API disponivel | Token invalido | Enviar `GET /test-cases` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| TC-019 | Atualizar parcialmente um caso de teste | API disponivel, token JWT valido, projeto existente e test case criado | Payload parcial valido | Enviar `PATCH /test-cases/{testCaseId}` | Retornar `200` com campos atualizados | Alta |
| TC-020 | Atualizar priority com valor valido | API disponivel, token JWT valido e test case criado | `priority: critical` | Enviar `PATCH /test-cases/{testCaseId}` com nova prioridade | Retornar `200` com prioridade atualizada | Alta |
| TC-021 | Atualizar status com valor valido | API disponivel, token JWT valido e test case criado | `status: deprecated` | Enviar `PATCH /test-cases/{testCaseId}` com novo status | Retornar `200` com status atualizado | Alta |
| TC-022 | Atualizar updatedAt | API disponivel, token JWT valido e test case criado | Atualizacao parcial valida | Enviar `PATCH /test-cases/{testCaseId}` | Retornar `200` com `updatedAt` atualizado | Media |
| TC-023 | Atualizar test case inexistente | API disponivel e token JWT valido | `testCaseId` inexistente | Enviar `PATCH /test-cases/{testCaseId}` com id invalido | Retornar `404` com mensagem `Test case not found` | Alta |
| TC-024 | Atualizar test case sem token | API disponivel e test case criado | Payload parcial valido | Enviar `PATCH /test-cases/{testCaseId}` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| TC-025 | Atualizar test case com token invalido | API disponivel e test case criado | Payload parcial valido e token invalido | Enviar `PATCH /test-cases/{testCaseId}` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| TC-026 | Atualizar title com menos de 3 caracteres | API disponivel, token JWT valido e test case criado | `title: "AB"` | Enviar `PATCH /test-cases/{testCaseId}` com titulo invalido | Retornar `400` com mensagem de tamanho minimo | Alta |
| TC-027 | Atualizar steps com valor nao array | API disponivel, token JWT valido e test case criado | `steps` como texto | Enviar `PATCH /test-cases/{testCaseId}` com `steps` invalido | Retornar `400` com mensagem de array invalido | Alta |
| TC-028 | Atualizar steps com array vazio | API disponivel, token JWT valido e test case criado | `steps: []` | Enviar `PATCH /test-cases/{testCaseId}` com array vazio | Retornar `400` com mensagem de array invalido | Alta |
| TC-029 | Atualizar priority com valor invalido | API disponivel, token JWT valido e test case criado | `priority: urgent` | Enviar `PATCH /test-cases/{testCaseId}` com prioridade invalida | Retornar `400` com mensagem de prioridade permitida | Alta |
| TC-030 | Atualizar status com valor invalido | API disponivel, token JWT valido e test case criado | `status: active` | Enviar `PATCH /test-cases/{testCaseId}` com status invalido | Retornar `400` com mensagem de status permitido | Alta |
| TC-031 | Atualizar para title duplicado no mesmo projeto | API disponivel, token JWT valido e dois test cases criados no mesmo projeto | `title` de outro test case do mesmo projeto | Enviar `PATCH /test-cases/{testCaseId}` com titulo duplicado | Retornar `409` | Alta |
| TC-032 | Bloquear alteracao de id, projectId e createdAt | API disponivel, token JWT valido e test case criado | Payload com campos protegidos | Enviar `PATCH /test-cases/{testCaseId}` com campos proibidos | Retornar `400` e bloquear a alteracao | Alta |

# Casos de Teste - Test Runs

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| TR-001 | Criar execucao de teste com token valido | API disponivel, token JWT valido, projeto e test case existentes | Payload valido com `projectId` e `testCaseIds` validos | Enviar `POST /test-runs` com Bearer Token | Retornar `201` com os campos da execucao | Alta |
| TR-002 | Criar execucao sem status | API disponivel, token JWT valido, projeto e test case existentes | Payload valido sem `status` | Enviar `POST /test-runs` sem o campo `status` | Retornar `201` com `status: pending` | Alta |
| TR-003 | Criar execucao sem token | API disponivel e dados previos existentes | Payload valido | Enviar `POST /test-runs` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| TR-004 | Criar execucao com token invalido | API disponivel e dados previos existentes | Payload valido e token invalido | Enviar `POST /test-runs` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| TR-005 | Criar execucao sem projectId | API disponivel, token JWT valido e dados previos existentes | Payload sem `projectId` | Enviar `POST /test-runs` sem `projectId` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TR-006 | Criar execucao sem title | API disponivel, token JWT valido e dados previos existentes | Payload sem `title` | Enviar `POST /test-runs` sem `title` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TR-007 | Criar execucao com title menor que 3 caracteres | API disponivel, token JWT valido e dados previos existentes | `title: "AB"` | Enviar `POST /test-runs` com titulo invalido | Retornar `400` com mensagem de tamanho minimo | Alta |
| TR-008 | Criar execucao sem testCaseIds | API disponivel, token JWT valido e dados previos existentes | Payload sem `testCaseIds` | Enviar `POST /test-runs` sem `testCaseIds` | Retornar `400` com mensagem de array obrigatorio | Alta |
| TR-009 | Criar execucao com testCaseIds nao array | API disponivel, token JWT valido e dados previos existentes | `testCaseIds` como texto | Enviar `POST /test-runs` com `testCaseIds` invalido | Retornar `400` com mensagem de array invalido | Alta |
| TR-010 | Criar execucao com testCaseIds vazio | API disponivel, token JWT valido e dados previos existentes | `testCaseIds: []` | Enviar `POST /test-runs` com array vazio | Retornar `400` com mensagem de array invalido | Alta |
| TR-011 | Criar execucao com testCaseIds duplicados | API disponivel, token JWT valido e dados previos existentes | Mesmo `testCaseId` repetido no array | Enviar `POST /test-runs` com IDs duplicados | Retornar `400` com mensagem de duplicidade | Alta |
| TR-012 | Criar execucao com status invalido | API disponivel, token JWT valido e dados previos existentes | `status: active` | Enviar `POST /test-runs` com status invalido | Retornar `400` com mensagem de status permitido | Alta |
| TR-013 | Criar execucao sem executedBy | API disponivel, token JWT valido e dados previos existentes | Payload sem `executedBy` | Enviar `POST /test-runs` sem `executedBy` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| TR-014 | Criar execucao com executedBy nao string | API disponivel, token JWT valido e dados previos existentes | `executedBy: 123` | Enviar `POST /test-runs` com `executedBy` invalido | Retornar `400` com mensagem de tipo invalido | Alta |
| TR-015 | Criar execucao com startedAt invalido | API disponivel, token JWT valido e dados previos existentes | `startedAt: invalid-date` | Enviar `POST /test-runs` com data invalida | Retornar `400` com mensagem de data invalida | Alta |
| TR-016 | Criar execucao com finishedAt invalido | API disponivel, token JWT valido e dados previos existentes | `finishedAt: invalid-date` | Enviar `POST /test-runs` com data invalida | Retornar `400` com mensagem de data invalida | Alta |
| TR-017 | Criar execucao com finishedAt menor que startedAt | API disponivel, token JWT valido e dados previos existentes | `startedAt` maior que `finishedAt` | Enviar `POST /test-runs` com ordem de datas invalida | Retornar `400` com mensagem de validacao | Alta |
| TR-018 | Criar execucao com projectId inexistente | API disponivel, token JWT valido e dados previos existentes | `projectId` inexistente | Enviar `POST /test-runs` com projeto invalido | Retornar `404` com mensagem `Project not found` | Alta |
| TR-019 | Criar execucao com testCaseId inexistente | API disponivel, token JWT valido e dados previos existentes | `testCaseId` inexistente no array | Enviar `POST /test-runs` com caso de teste invalido | Retornar `404` com mensagem `Test case not found` | Alta |
| TR-020 | Criar execucao com testCaseId de outro projeto | API disponivel, token JWT valido e dados previos existentes | `testCaseId` valido de outro projeto | Enviar `POST /test-runs` com associacao invalida | Retornar `400` conforme padrao atual da API | Alta |
| TR-021 | Criar execucao duplicada no mesmo projeto | API disponivel, token JWT valido e dados previos existentes | Mesmo `title` no mesmo `projectId` | Executar duas criacoes com o mesmo titulo | Segunda resposta retorna `409` | Alta |
| TR-022 | Listar execucoes com token valido | API disponivel e token JWT valido | Pelo menos uma execucao criada | Enviar `GET /test-runs` com Bearer Token | Retornar `200` e array de execucoes | Alta |
| TR-023 | Listar execucoes sem token | API disponivel | Nenhuma massa especifica | Enviar `GET /test-runs` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| TR-024 | Listar execucoes com token invalido | API disponivel | Token invalido | Enviar `GET /test-runs` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |

# Casos de Teste - Bugs

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| BUG-001 | Criar bug com token valido | API disponivel, token JWT valido, projeto, test case e test run existentes | Payload valido com `testRunId` e `testCaseId` validos | Enviar `POST /bugs` com Bearer Token | Retornar `201` com os campos do bug | Alta |
| BUG-002 | Criar bug sem status | API disponivel, token JWT valido, projeto, test case e test run existentes | Payload valido sem `status` | Enviar `POST /bugs` sem o campo `status` | Retornar `201` com `status: open` | Alta |
| BUG-003 | Criar bug sem token | API disponivel e dados previos existentes | Payload valido | Enviar `POST /bugs` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| BUG-004 | Criar bug com token invalido | API disponivel e dados previos existentes | Payload valido e token invalido | Enviar `POST /bugs` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| BUG-005 | Criar bug sem testRunId | API disponivel, token JWT valido e dados previos existentes | Payload sem `testRunId` | Enviar `POST /bugs` sem `testRunId` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| BUG-006 | Criar bug sem testCaseId | API disponivel, token JWT valido e dados previos existentes | Payload sem `testCaseId` | Enviar `POST /bugs` sem `testCaseId` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| BUG-007 | Criar bug sem title | API disponivel, token JWT valido e dados previos existentes | Payload sem `title` | Enviar `POST /bugs` sem `title` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| BUG-008 | Criar bug com title menor que 3 caracteres | API disponivel, token JWT valido e dados previos existentes | `title: "AB"` | Enviar `POST /bugs` com titulo invalido | Retornar `400` com mensagem de tamanho minimo | Alta |
| BUG-009 | Criar bug sem description | API disponivel, token JWT valido e dados previos existentes | Payload sem `description` | Enviar `POST /bugs` sem `description` | Retornar `400` com mensagem de obrigatoriedade | Alta |
| BUG-010 | Criar bug com severity invalida | API disponivel, token JWT valido e dados previos existentes | `severity: urgent` | Enviar `POST /bugs` com severidade invalida | Retornar `400` com mensagem de severidade permitida | Alta |
| BUG-011 | Criar bug com priority invalida | API disponivel, token JWT valido e dados previos existentes | `priority: urgent` | Enviar `POST /bugs` com prioridade invalida | Retornar `400` com mensagem de prioridade permitida | Alta |
| BUG-012 | Criar bug com status invalido | API disponivel, token JWT valido e dados previos existentes | `status: active` | Enviar `POST /bugs` com status invalido | Retornar `400` com mensagem de status permitido | Alta |
| BUG-013 | Criar bug com testRunId inexistente | API disponivel, token JWT valido e dados previos existentes | `testRunId` inexistente | Enviar `POST /bugs` com execucao invalida | Retornar `404` com mensagem `Test run not found` | Alta |
| BUG-014 | Criar bug com testCaseId inexistente | API disponivel, token JWT valido e dados previos existentes | `testCaseId` inexistente | Enviar `POST /bugs` com caso de teste invalido | Retornar `404` com mensagem `Test case not found` | Alta |
| BUG-015 | Criar bug duplicado para o mesmo testRunId e testCaseId | API disponivel, token JWT valido e dados previos existentes | Mesmo `title`, `testRunId` e `testCaseId` em duas requisicoes | Executar duas criacoes com o mesmo bug | Segunda resposta retorna `409` | Alta |

# Casos de Teste - Reports

| ID | Titulo | Pre-condicoes | Massa de dados | Passos | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| REP-001 | Consultar resumo de execucao com token valido | API disponivel e token JWT valido | Nenhuma massa adicional | Enviar `GET /reports/execution-summary` com Bearer Token | Retornar `200` com estrutura completa do resumo | Alta |
| REP-002 | Consultar resumo de execucao sem token | API disponivel | Nenhuma massa especifica | Enviar `GET /reports/execution-summary` sem token | Retornar `401` com mensagem de token obrigatorio | Alta |
| REP-003 | Consultar resumo de execucao com token invalido | API disponivel | Token invalido | Enviar `GET /reports/execution-summary` com token invalido | Retornar `401` com mensagem `Invalid token` | Alta |
| REP-004 | Validar metricas principais do resumo | API disponivel, token JWT valido e dados previos criados | Projetos, test cases, test runs e bugs criados em memoria | Consultar o endpoint de resumo | Retornar `totalProjects`, `totalTestCases`, `totalTestRuns` e `totalBugs` com valores corretos | Alta |
| REP-005 | Validar agrupamentos por status de casos de teste | API disponivel, token JWT valido e dados previos criados | Test cases nos status `draft`, `ready` e `deprecated` | Consultar o endpoint de resumo | Retornar `testCasesByStatus` com contagens corretas | Alta |
| REP-006 | Validar agrupamentos por status de execucoes | API disponivel, token JWT valido e dados previos criados | Test runs nos status `pending`, `in_progress` e `completed` | Consultar o endpoint de resumo | Retornar `testRunsByStatus` com contagens corretas | Alta |
| REP-007 | Validar agrupamentos por status de bugs | API disponivel, token JWT valido e dados previos criados | Bugs nos status `open`, `in_progress`, `resolved` e `closed` | Consultar o endpoint de resumo | Retornar `bugsByStatus` com contagens corretas | Alta |
| REP-008 | Validar agrupamentos por severidade dos bugs | API disponivel, token JWT valido e dados previos criados | Bugs com severidades `low`, `medium`, `high` e `critical` | Consultar o endpoint de resumo | Retornar `bugsBySeverity` com contagens corretas | Alta |
| REP-009 | Validar agrupamentos por prioridade dos bugs | API disponivel, token JWT valido e dados previos criados | Bugs com prioridades `low`, `medium`, `high` e `critical` | Consultar o endpoint de resumo | Retornar `bugsByPriority` com contagens corretas | Alta |
| REP-010 | Validar tipos numericos das metricas principais | API disponivel, token JWT valido e dados previos criados | Dados previos em memoria | Consultar o endpoint de resumo | Retornar metricas principais como valores numericos | Media |
| REP-011 | Validar que a consulta do relatorio nao altera os dados existentes | API disponivel, token JWT valido e dados previos criados | Projetos, test cases, test runs e bugs criados em memoria | Consultar o endpoint duas vezes seguidas | Retornar o mesmo resumo sem alterar as contagens existentes | Alta |
