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
