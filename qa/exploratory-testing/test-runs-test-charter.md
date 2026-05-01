# Test Charter - Test Runs

## Contexto

- Relatório de referência: `Relatório de Sessão_Test Charter_Test Runs - TestFlow API.docx`
- Abordagem: teste exploratório inspirado em Session-Based Test Management
- Endpoint explorado: `POST /test-runs`
- Duração da sessão: `30 minutos`

## Charter

**_Explore_** o endpoint `POST /test-runs`  
**_Com_** heurísticas de siga os dados, dados inexistentes, dados duplicados, datas inválidas e abordagem contrária  
**_Para descobrir_** se a API valida corretamente a relação entre projeto, casos de teste e execução.

## Notas da sessão

- (I) O sistema realiza validação com sucesso ao cadastrar um novo test run com dados válidos, retornando `201` no response.
- (I) O sistema realiza validação com sucesso ao tentar cadastrar um novo test run com um projeto inexistente, retornando `404` no response.
- (I) O sistema realiza validação com sucesso ao tentar cadastrar um novo test run com test case duplicado no mesmo projeto, retornando `400` no response.
- (I) O sistema realiza validação com sucesso ao tentar cadastrar um novo test run com as datas de início e fim inválidas, retornando `400` no response.
- (I) O sistema realiza validação com sucesso ao tentar cadastrar um novo test run com a data de início maior do que a data de fim, retornando `400` no response.

## Defeitos identificados

- Nenhum defeito foi registrado nesta sessão.

## Perguntas levantadas

- Nenhuma pergunta foi registrada nesta sessão.
