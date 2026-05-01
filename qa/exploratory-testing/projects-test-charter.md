# Test Charter - Projects

## Contexto

- Relatório de referência: `Relatório de Sessão_Test Charter_Projects - TestFlow API.docx`
- Abordagem: teste exploratório inspirado em Session-Based Test Management
- Endpoint explorado: `POST /projects`
- Duração da sessão: `30 minutos`

## Charter

**_Explore_** o endpoint `POST /projects`  
**_Com_** heurísticas de nome longo, nome já existente, caracteres especiais e strings acentuadas  
**_Para descobrir_** se a API mantém a integridade dos projetos e valida corretamente o campo `name`.

## Notas da sessão

- (I) O sistema realiza validação com sucesso ao cadastrar um novo projeto com dados válidos, retornando `201` no response.
- (I) O sistema realiza validação com sucesso ao tentar cadastrar dois projetos com o mesmo nome, retornando `409` com a mensagem `Project name already exists`.
- (R) Foi possível cadastrar um projeto indevidamente com caracteres especiais no campo `name`.
- (R) Foi possível cadastrar um projeto com uma possível combinação de injeção SQL no campo `name`: `' OR 1=1 --`.
- (R) Foi possível cadastrar um projeto cujo `name` possui `256` caracteres.

## Defeitos identificados

- O sistema permite cadastrar projeto com caracteres especiais.
- O sistema permite cadastrar projeto com uma possível injeção SQL.
- O sistema permite cadastrar projeto com um nome com `256` caracteres.

## Perguntas levantadas

- É possível que haja uma injeção SQL caso ocorra a inserção de um nome com o input `' OR 1=1 --`?
