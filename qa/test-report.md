# Relatorio de Testes - TestFlow API

## Data da execucao

- `2026-05-01`

## Ambiente

- Local

## Total de testes

- `160`

## Aprovados

- `160`

## Falhados

- `0`

## Evidencias

- Relatorio Mochawesome gerado em [`qa/reports/mochawesome-report.html`](./reports/mochawesome-report.html)
- Dados consolidados da execucao disponiveis em [`qa/reports/mochawesome-report.json`](./reports/mochawesome-report.json)
- Execucao automatizada iniciada em `2026-05-01T16:51:59.200Z` e finalizada em `2026-05-01T16:52:02.037Z`, com duracao total de `2837 ms`

## Observacoes

- A execucao automatizada atual validou `160` testes com `100%` de aprovacao, sem falhas ou testes pendentes, cobrindo os modulos `Auth`, `Projects`, `Test Cases`, `Test Runs`, `Bugs` e `Reports`.
- A sessao exploratoria complementou a cobertura automatizada com investigacao direcionada dos modulos `Projects` e `Test Runs`, resultando em `3` defeitos registrados no fluxo de `POST /projects` e nenhum defeito observado na sessao de `POST /test-runs`.

## Testes exploratorios

### Sessoes executadas

- Modulo `Projects`
- Modulo `Test Runs`

### Data da execucao

- `2026-05-01`

### Resumo dos resultados

- A sessao exploratoria do modulo `Projects` confirmou o fluxo valido de criacao de projetos e identificou fragilidades de validacao no campo `name`.
- A sessao exploratoria do modulo `Test Runs` confirmou o comportamento esperado para cenarios validos, projeto inexistente, test case duplicado e validacoes de datas.

### Quantidade de defeitos encontrados

- Modulo `Projects`: `3` defeitos
- Modulo `Test Runs`: `0` defeitos
- Total: `3` defeitos

### Referencias

- [Test Charter - Projects](./exploratory-testing/projects-test-charter.md)
- [Test Charter - Test Runs](./exploratory-testing/test-runs-test-charter.md)
- [Relatorio de Bugs Exploratorios - Projects](./exploratory-testing/projects-bug-report.md)
