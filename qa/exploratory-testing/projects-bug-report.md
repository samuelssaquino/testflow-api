# Relatório de Bugs Exploratórios - Projects

## Contexto

Este documento consolida os bugs identificados durante a sessão de testes exploratórios do endpoint `POST /projects`.

## Bugs registrados

### SCRUM-32 - POST /projects permite cadastrar projeto com caracteres especiais no campo name

**Summary**  
POST /projects permite cadastrar projeto com caracteres especiais no campo name

**Description**  
Durante a execução do Test Charter do módulo Projects, foi identificado que o endpoint `POST /projects` permite cadastrar um projeto com caracteres especiais no campo `name`.

**Input utilizado**

```json
{
  "name": "Projeto *** ??? ///",
  "description": "Projeto com caracteres especiais",
  "status": "active"
}
```

**Resultado atual**  
A API permite o cadastro do projeto.

**Resultado esperado**  
A API deveria validar o campo `name` e rejeitar caracteres especiais indevidos, retornando erro de validação.

**Impacto**  
Pode comprometer a qualidade dos dados cadastrados e permitir nomes inválidos ou inconsistentes.

**Referência no Jira**  
[SCRUM-32](https://samaquino.atlassian.net/browse/SCRUM-32)

### SCRUM-33 - POST /projects permite cadastrar possível payload de SQL Injection no campo name

**Summary**  
POST /projects permite cadastrar possível payload de SQL Injection no campo name

**Description**  
Durante a execução do Test Charter do módulo Projects, foi identificado que o endpoint `POST /projects` permite cadastrar um projeto utilizando uma possível combinação de SQL Injection no campo `name`.

**Input utilizado**

```json
{
  "name": "' OR 1=1 --",
  "description": "Teste de possível injeção",
  "status": "active"
}
```

**Resultado atual**  
A API permite o cadastro do projeto.

**Resultado esperado**  
A API deveria bloquear ou sanitizar entradas com padrões suspeitos de SQL Injection.

**Impacto**  
Mesmo usando armazenamento em memória nesta fase, o comportamento representa risco futuro caso a API evolua para banco de dados sem validações adequadas.

**Referência no Jira**  
[SCRUM-33](https://samaquino.atlassian.net/browse/SCRUM-33)

### SCRUM-34 - POST /projects permite cadastrar projeto com name contendo 256 caracteres

**Summary**  
POST /projects permite cadastrar projeto com name contendo 256 caracteres

**Description**  
Durante a execução do Test Charter do módulo Projects, foi identificado que o endpoint `POST /projects` permite cadastrar um projeto com `name` contendo `256` caracteres.

**Input utilizado**

```json
{
  "name": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "description": "Nome com 256 caracteres",
  "status": "active"
}
```

**Resultado atual**  
A API permite o cadastro do projeto.

**Resultado esperado**  
A API deveria definir e aplicar um limite máximo para o campo `name`, rejeitando valores excessivamente longos.

**Impacto**  
Pode gerar inconsistência, problemas de usabilidade, dificuldade de leitura e risco futuro de incompatibilidade com banco de dados.

**Referência no Jira**  
[SCRUM-34](https://samaquino.atlassian.net/browse/SCRUM-34)
