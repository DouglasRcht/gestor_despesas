# Fluxo Financeiro — Base do Trabalho Prático TestOps

Aplicação base para um trabalho prático de Qualidade de Software, TestOps e deploy controlado por Jenkins. O template usa Next.js 16, React 19, TailwindCSS 4 e Firebase Firestore, mas não entrega as features avaliadas: ele deixa as três entregas principais como scaffold com `TODO implement` para que a turma implemente, teste e publique via Jenkins.

A lógica central da disciplina é simples: **se a feature não estiver provada por testes e pela pipeline, ela não deve chegar ao deploy.**

O trabalho é dividido em três semanas com ferramentas de teste diferentes — Cypress, Playwright e testRigor — sempre com o Jenkins como gatekeeper do deploy na Vercel.

---

## Mapa de entregas

### Semana 1 — Implementação com bloqueio de deploy (Cypress + Cucumber)

**Objetivo:** implementar as três features do scaffold e demonstrar que o Jenkins bloqueia o deploy enquanto os testes falham.

**O que fazer:**

1. Faça fork ou clone o repositório base.
2. Configure o Firebase, o Jenkins e o webhook do GitHub.
3. **Ative os cenários Cypress marcados com `@todo`** antes de concluir a implementação — o Jenkins deve falhar nesse ponto.
4. Capture os logs de falha e os screenshots que o Cypress gera automaticamente em `cypress/screenshots/`.
5. Implemente as features (veja a seção "O que os alunos precisam concluir" abaixo).
6. Faça os testes passarem, faça push e obtenha a pipeline verde com deploy liberado.

**Features a implementar:**

| Feature | Arquivo principal | O que está faltando |
| --- | --- | --- |
| 01 — Entradas | `src/services/income-entry-service.ts` | `createIncomeEntry()` e `subscribeToIncomeEntries()` |
| 02 — Saídas manuais | `src/services/expense-service.ts` | `createExpense()` |
| 03 — OCR de nota fiscal | `src/app/api/receipt-extraction/route.ts` | Integração com provedor de OCR e mapeamento do resultado |

**Cenários Cypress prontos (passando):**

```text
cypress/e2e/dashboard.feature              — 5 cenários
cypress/e2e/manual-expense-form.feature    — 5 cenários
cypress/e2e/income-entry-form.feature      — 5 cenários
cypress/e2e/receipt-upload-panel.feature   — 5 cenários
cypress/e2e/receipt-extraction-api.feature — 3 cenários (API)
```

**Stubs `@todo` para os alunos ativarem e completarem:**

```text
cypress/e2e/todo-create-expense.feature        — persistência Firestore (saídas)
cypress/e2e/todo-create-income-entry.feature   — persistência Firestore (entradas)
cypress/e2e/todo-ocr-extraction.feature        — OCR + salvamento
```

**Evidências obrigatórias da Semana 1 para o relatório PDF:**

- Print do Jenkins com pipeline vermelha (teste ativado antes da implementação).
- Log de erro completo do stage `Unit Tests` ou `E2E Tests` que bloqueou o deploy.
- Screenshots gerados pelo Cypress em `cypress/screenshots/` durante a falha.
- Print do Jenkins com pipeline verde após a correção.
- Print do deploy publicado na Vercel acionado pela pipeline verde.
- Commit que ativou o teste e commit que fez o teste passar (rastreabilidade).
- Análise de causa raiz (RCA): por que o teste falhou e como isso provou o bloqueio correto.

**Comandos da Semana 1:**

```bash
npm install
npm run test                  # Jest — testes unitários
npm run test:e2e              # Cypress + dev server (local)
npm run test:e2e:ci           # Cypress + next start (CI/Jenkins)
npm run cypress:open          # Cypress interativo
```

---

### Semana 2 — BDD com Playwright + Cucumber (Testes Orientados a Comportamento)

**Objetivo:** substituir o Cypress pela dupla Playwright + Cucumber e adotar a abordagem BDD para a feature de OCR — escrevendo o comportamento esperado em Gherkin *antes* de programar a implementação.

**Por que Playwright + Cucumber nesta fase:**

A feature de OCR possui regras de negócio claras e verificáveis (nome do estabelecimento, valor, categoria sugerida). O BDD serve como ponte entre o requisito do documento e a automação: a equipe escreve o *o que* antes do *como*, garantindo que todos entendam a regra de negócio antes de integrar o fluxo de leitura de nota fiscal.

**O aprendizado muda de "como testar" para "o que estamos construindo".**

**Exemplo de cenário Gherkin para a feature OCR:**

```gherkin
Feature: Extração de nota fiscal por OCR

  Scenario: Upload de PDF válido extrai dados e salva despesa
    Given que o usuário está no painel de upload de nota fiscal
    When ele envia um PDF válido com nome do estabelecimento e valor
    Then o sistema deve extrair o nome do estabelecimento
    And o sistema deve extrair o valor da compra
    And o resultado deve ser salvo como despesa no Firestore
    And o dashboard deve exibir a nova despesa na lista de lançamentos recentes
```

**Como adaptar o pipeline Jenkins:**

Remova o stage de Cypress do `Jenkinsfile` e substitua pelo stage abaixo:

```groovy
stage("E2E Tests (Playwright + Cucumber)") {
  steps {
    sh "npx playwright install --with-deps chromium"
    sh "npm run test:e2e:playwright"
  }
  post {
    always {
      archiveArtifacts artifacts: "playwright-report/**/*", allowEmptyArchive: true
    }
  }
}
```

O stage de Playwright **bloqueia o deploy** — a pipeline falha se qualquer cenário Gherkin falhar.

**O que muda em relação ao Cypress:**

| Aspecto | Cypress | Playwright + Cucumber |
| --- | --- | --- |
| Paradigma de teste | Orientado a componente/UI | Orientado a comportamento (BDD) |
| Especificação | Steps em TypeScript direto | Gherkin legível por não-técnicos |
| Navegadores | Electron/Chrome | Chromium, Firefox, WebKit (multi-browser) |
| Paralelismo | Limitado no plano free | Nativo e configurável |
| Relatório | Screenshot/vídeo | HTML report + trace viewer |
| Velocidade | Moderada | Rápido (sem iframe overhead) |
| Curva de aprendizado | Baixa | Média (requer entender BDD + Cucumber) |

**Evidências obrigatórias da Semana 2 para o relatório PDF:**

- Cenários Gherkin escritos *antes* da implementação da rota de OCR.
- Print do Jenkins com o stage Playwright falhando (feature não concluída).
- HTML report do Playwright com o trace do cenário que falhou.
- Print da pipeline verde após concluir a implementação do OCR.
- Comparação objetiva entre a abordagem Cypress (Semana 1) e Playwright+Cucumber (Semana 2):
  - O que ficou mais claro para a equipe?
  - Qual ferramenta foi mais expressiva para o requisito de OCR?

---

### Semana 3 — Laboratório de Tendências Low-Code (testRigor)

**Objetivo:** experimentar o paradigma de testes em linguagem natural com testRigor e desenvolver senso crítico sobre quando usar engenharia tradicional versus ferramentas de IA low-code.

**Importante:** o testRigor **não é integrado ao Jenkins como critério de bloqueio de deploy** nesta fase. Ele é usado como atividade comparativa independente — misturar paradigmas de engenharia no mesmo gate diluiria o foco técnico da pipeline.

**Como funciona:**

O testRigor abstrai completamente o código de automação. A equipe escreve testes em linguagem natural:

```text
Open "https://seu-projeto.vercel.app"
Click "Salvar despesa"
Check that page contains "Informe o título da despesa."
Type "Mercado semanal" in "Título da despesa"
Type "150" in "Valor total"
Click "Salvar despesa"
Check that page contains "Despesa cadastrada com sucesso."
```

**Dinâmica da atividade:**

1. Após implementar o dashboard responsivo e a persistência manual (Semanas 1 e 2), a equipe valida as interfaces usando testRigor.
2. Escreve os mesmos cenários cobertos pelo Playwright, agora em linguagem natural.
3. Mede e compara:
   - Tempo para criar o teste (Playwright vs testRigor).
   - Tempo de manutenção quando a UI muda.
   - Legibilidade para membros não-técnicos da equipe.
   - Cobertura e confiabilidade (flakiness).

**O que muda em relação ao Playwright:**

| Aspecto | Playwright + Cucumber | testRigor |
| --- | --- | --- |
| Código necessário | TypeScript + Gherkin | Linguagem natural (zero código) |
| Manutenção | Manual, por desenvolvedor | Automática pela IA do testRigor |
| Integração CI/CD | Nativa (Jenkins, GitHub Actions) | Via API/webhook (mais limitada) |
| Debugging | Trace viewer detalhado | Painel visual simplificado |
| Custo | Open-source | Plataforma SaaS (freemium) |
| Ideal para | Times técnicos com BDD | Validação rápida por QAs ou PMs |

**Evidências obrigatórias da Semana 3 para o relatório PDF:**

- Print dos testes escritos em linguagem natural no testRigor.
- Print da execução dos testes no painel do testRigor.
- Tabela comparativa preenchida: Cypress × Playwright × testRigor (tempo, clareza, manutenção, CI/CD).
- Conclusão técnica: em qual cenário real de projeto cada ferramenta seria a escolha certa?

---

## Relatório PDF final — estrutura obrigatória

O relatório deve cobrir as três semanas em sequência e responder a cada mudança de ferramenta:

```text
1. Introdução
   - Contexto do projeto Fluxo Financeiro
   - Diagrama do fluxo: código local → push → GitHub → webhook → Jenkins → Vercel

2. Semana 1 — Cypress + Cucumber
   - Implementação das features 01, 02 e 03
   - Evidência do Jenkins bloqueando o deploy (print + log)
   - Screenshots do Cypress durante a falha
   - Pipeline verde após correção
   - Análise de causa raiz (RCA) do teste que falhou

3. Semana 2 — Playwright + Cucumber (BDD)
   - Cenários Gherkin escritos antes da implementação do OCR
   - Evidência do Jenkins bloqueando com Playwright
   - Pipeline verde com Playwright
   - O que mudou: comparação direta com a abordagem Cypress
   - Diagrama ou print do HTML report do Playwright

4. Semana 3 — testRigor (Low-Code)
   - Testes em linguagem natural escritos para o dashboard
   - Print da execução no testRigor
   - Tabela comparativa final: Cypress × Playwright × testRigor
   - Conclusão: qual ferramenta para qual cenário

5. Conclusão geral
   - Lições aprendidas sobre TestOps e CI/CD
   - O que o grupo faria diferente em um projeto real
```

---

## O que já vem pronto

- Dashboard responsivo com resumo financeiro e lista de despesas.
- Estrutura visual das três features do trabalho.
- Hooks e serviços base para despesas, entradas e leitura de nota fiscal.
- Route Handler de OCR criado como ponto de extensão.
- `Jenkinsfile` com os estágios: Checkout, Install, Unit Tests, Build, E2E Tests, Deploy Vercel.
- **23 cenários Cypress + Cucumber prontos e passando** para as features já implementadas.
- Stubs `@todo` com descrição do que testar para cada desafio dos alunos.

## O que os alunos precisam concluir

- Implementar o cadastro de entradas (Feature 01).
- Implementar o cadastro de saídas manuais (Feature 02).
- Finalizar a extração de nome do estabelecimento e valor a partir da nota fiscal (Feature 03).
- Persistir a saída extraída como despesa no Firestore.
- Completar a integração Jenkins → GitHub → Vercel sem expor secrets.
- Semana 2: migrar de Cypress para Playwright + Cucumber.
- Semana 3: escrever testes equivalentes no testRigor e fazer a análise comparativa.

---

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencher variáveis Firebase
npm run dev                  # servidor de desenvolvimento
npm run test                 # Jest (unitários)
npm run test:e2e             # Cypress + dev server
npm run test:e2e:ci          # Cypress + next start (CI)
npm run cypress:open         # Cypress interativo
npm run lint
npm run build
```

---

## Firebase

Variáveis de ambiente esperadas:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

As despesas são gravadas na coleção `expenses`. A coleção de entradas e a estratégia de sincronização devem ser implementadas pela turma.

## Arquivos com `TODO implement`

```text
src/services/income-entry-service.ts     — createIncomeEntry, subscribeToIncomeEntries
src/services/expense-service.ts          — createExpense
src/app/api/receipt-extraction/route.ts  — integração OCR
src/services/receipt-upload.ts           — mapeamento do resultado OCR
Jenkinsfile                              — stage Deploy Vercel (credentials + Vercel CLI)
cypress/e2e/todo-create-expense.feature
cypress/e2e/todo-create-income-entry.feature
cypress/e2e/todo-ocr-extraction.feature
```
