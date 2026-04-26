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
