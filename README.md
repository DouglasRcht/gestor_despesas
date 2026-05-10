# Fluxo Financeiro — Base do Trabalho Pratico TestOps

Aplicacao base para um trabalho pratico de Qualidade de Software, TestOps e deploy controlado por Jenkins. O template usa Next.js 16, React 19, TailwindCSS 4 e Firebase Firestore, mas nao entrega as features avaliadas: ele deixa as tres entregas principais como scaffold com `TODO implement` para que a turma implemente, teste e publique via Jenkins.

A logica central da disciplina e simples: **se a feature nao estiver provada por testes e pela pipeline, ela nao deve chegar ao deploy.**

O trabalho e dividido em tres semanas com ferramentas de teste diferentes — Cypress, Playwright e testRigor — sempre com o Jenkins como gatekeeper do deploy na Vercel.

---

## Mapa de entregas

### Semana 1 — Implementacao com bloqueio de deploy (Cypress + Cucumber)

**Objetivo:** implementar as tres features do scaffold e demonstrar que o Jenkins bloqueia o deploy enquanto os testes falham.

**O que fazer:**

1. Faça fork ou clone o repositório base.
2. Configure o Firebase, o Jenkins e o webhook do GitHub.
3. **Ative os cenários Cypress marcados com `@todo`** antes de concluir a implementação — o Jenkins deve falhar nesse ponto.
4. Capture os logs de falha e os screenshots que o Cypress gera automaticamente em `cypress/screenshots/`.
5. Implemente as features (veja a secao "O que os alunos precisam concluir" abaixo).
6. Faça os testes passarem, faça push e obtenha a pipeline verde com deploy liberado.

**Features a implementar:**

| Feature | Arquivo principal | O que esta faltando |
|---|---|---|
| 01 — Entradas | `src/services/income-entry-service.ts` | `createIncomeEntry()` e `subscribeToIncomeEntries()` |
| 02 — Saidas manuais | `src/services/expense-service.ts` | `createExpense()` |
| 03 — OCR de nota fiscal | `src/app/api/receipt-extraction/route.ts` | Integracao com provedor de OCR e mapeamento do resultado |

**Cenários Cypress prontos (passando):**

```
cypress/e2e/dashboard.feature              — 5 cenários
cypress/e2e/manual-expense-form.feature    — 5 cenários
cypress/e2e/income-entry-form.feature      — 5 cenários
cypress/e2e/receipt-upload-panel.feature   — 5 cenários
cypress/e2e/receipt-extraction-api.feature — 3 cenários (API)
```

**Stubs @todo para os alunos ativarem e completarem:**

```
cypress/e2e/todo-create-expense.feature        — persistencia Firestore (saidas)
cypress/e2e/todo-create-income-entry.feature   — persistencia Firestore (entradas)
cypress/e2e/todo-ocr-extraction.feature        — OCR + salvamento
```

**Evidencias obrigatorias da Semana 1 para o relatorio PDF:**

- Print do Jenkins com pipeline vermelha (teste ativado antes da implementacao).
- Log de erro completo do stage `Unit Tests` ou `E2E Tests` que bloqueou o deploy.
- Screenshots gerados pelo Cypress em `cypress/screenshots/` durante a falha.
- Print do Jenkins com pipeline verde apos a correcao.
- Print do deploy publicado na Vercel acionado pela pipeline verde.
- Commit que ativou o teste e commit que fez o teste passar (rastreabilidade).

**Comandos da Semana 1:**

```bash
npm install
npm run test                  # Jest — testes unitarios
npm run test:e2e              # Cypress + dev server (local)
npm run test:e2e:ci           # Cypress + next start (CI/Jenkins)
npm run cypress:open          # Cypress interativo
```

---

### Semana 2 — BDD com Playwright + Cucumber (Testes Orientados a Comportamento)

**Objetivo:** substituir o Cypress pela dupla Playwright + Cucumber e adotar a abordagem BDD para a feature de OCR — escrevendo o comportamento esperado em Gherkin *antes* de programar a implementacao.

**Por que Playwright + Cucumber nesta fase:**

A feature de OCR possui regras de negocio claras e verificaveis (nome do estabelecimento, valor, categoria sugerida). O BDD serve como ponte entre o requisito do documento e a automacao: a equipe escreve o *o que* antes do *como*, garantindo que todos entendam a regra de negocio antes de integrar o fluxo de leitura de nota fiscal.

**O aprendizado muda de "como testar" para "o que estamos construindo".**

**Exemplo de cenario Gherkin para a feature OCR:**

```gherkin
Feature: Extracao de nota fiscal por OCR

  Scenario: Upload de PDF valido extrai dados e salva despesa
    Given que o usuario esta no painel de upload de nota fiscal
    When ele envia um PDF valido com nome do estabelecimento e valor
    Then o sistema deve extrair o nome do estabelecimento
    And o sistema deve extrair o valor da compra
    And o resultado deve ser salvo como despesa no Firestore
    And o dashboard deve exibir a nova despesa na lista de lancamentos recentes
```

**Como adaptar o pipeline Jenkins:**

1. Remova o stage de Cypress do `Jenkinsfile`.
2. Adicione o stage `E2E Tests (Playwright + Cucumber)`:

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

3. O stage de Playwright **bloqueia o deploy** — pipeline falha se qualquer cenario Gherkin falhar.

**O que muda em relacao ao Cypress:**

| Aspecto | Cypress | Playwright + Cucumber |
|---|---|---|
| Paradigma de teste | Orientado a componente/UI | Orientado a comportamento (BDD) |
| Especificacao | Steps em TypeScript direto | Gherkin legivel por nao-tecnicos |
| Navegadores | Electron/Chrome | Chromium, Firefox, WebKit (multi-browser) |
| Paralelismo | Limitado no plano free | Nativo e configuravel |
| Relatorio | Screenshot/video | HTML report + trace viewer |
| Velocidade | Moderada | Rapido (sem iframe overhead) |
| Curva de aprendizado | Baixa | Media (requer entender BDD + Cucumber) |

**Evidencias obrigatorias da Semana 2 para o relatorio PDF:**

- Cenarios Gherkin escritos *antes* da implementacao da rota de OCR.
- Print do Jenkins com o stage Playwright falhando (feature nao concluida).
- HTML report do Playwright com o trace do cenario que falhou.
- Print da pipeline verde apos concluir a implementacao do OCR.
- Comparacao objetiva entre a abordagem Cypress (Semana 1) e Playwright+Cucumber (Semana 2):
  - O que ficou mais claro para a equipe?
  - Qual ferramenta foi mais expressiva para o requisito de OCR?

---

### Semana 3 — Laboratorio de Tendencias Low-Code (testRigor)

**Objetivo:** experimentar o paradigma de testes em linguagem natural com testRigor e desenvolver senso critico sobre quando usar engenharia tradicional versus ferramentas de IA low-code.

**Importante:** o testRigor **nao e integrado ao Jenkins como criterio de bloqueio de deploy** nesta fase. Ele e usado como atividade comparativa independente — misturar paradigmas de engenharia no mesmo gate diluiria o foco tecnico da pipeline.

**Como funciona:**

O testRigor abstrai completamente o codigo de automacao. A equipe escreve testes em linguagem natural:

```
Open "https://seu-projeto.vercel.app"
Click "Salvar despesa"
Check that page contains "Informe o titulo da despesa."
Type "Mercado semanal" in "Titulo da despesa"
Type "150" in "Valor total"
Click "Salvar despesa"
Check that page contains "Despesa cadastrada com sucesso."
```

**Dinamica da atividade:**

1. Apos implementar o dashboard responsivo e a persistencia manual (Semanas 1 e 2), a equipe valida as interfaces usando testRigor.
2. Escreve os mesmos cenarios cobertos pelo Playwright, agora em linguagem natural.
3. Mede e compara:
   - Tempo para criar o teste (Playwright vs testRigor).
   - Tempo de manutencao quando a UI muda.
   - Legibilidade para membros nao-tecnicos da equipe.
   - Cobertura e confiabilidade (flakiness).

**O que muda em relacao ao Playwright:**

| Aspecto | Playwright + Cucumber | testRigor |
|---|---|---|
| Codigo necessario | TypeScript + Gherkin | Linguagem natural (zero codigo) |
| Manutencao | Manual, por desenvolvedor | Automatica pela IA do testRigor |
| Integracao CI/CD | Nativa (Jenkins, GitHub Actions) | Via API/webhook (mais limitada) |
| Debugging | Trace viewer detalhado | Painel visual simplificado |
| Custo | Open-source | Plataforma SaaS (freemium) |
| Ideal para | Times tecnicos com BDD | Validacao rapida por QAs ou PMs |

**Evidencias obrigatorias da Semana 3 para o relatorio PDF:**

- Print dos testes escritos em linguagem natural no testRigor.
- Print da execucao dos testes no painel do testRigor.
- Tabela comparativa preenchida: Cypress x Playwright x testRigor (tempo, clareza, manutencao, CI/CD).
- Conclusao tecnica: em qual cenario real de projeto cada ferramenta seria a escolha certa?

---

## Relatorio PDF final — estrutura obrigatoria

O relatorio deve cobrir as tres semanas em sequencia e responder a cada mudanca de ferramenta:

```
1. Introducao
   - Contexto do projeto Fluxo Financeiro
   - Diagrama do fluxo: codigo local -> push -> GitHub -> webhook -> Jenkins -> Vercel

2. Semana 1 — Cypress + Cucumber
   - Implementacao das features 01, 02 e 03
   - Evidencia do Jenkins bloqueando o deploy (print + log)
   - Screenshots do Cypress durante a falha
   - Pipeline verde apos correcao
   - Analise de causa raiz (RCA) do teste que falhou

3. Semana 2 — Playwright + Cucumber (BDD)
   - Cenarios Gherkin escritos antes da implementacao do OCR
   - Evidencia do Jenkins bloqueando com Playwright
   - Pipeline verde com Playwright
   - O que mudou: comparacao direta com a abordagem Cypress
   - Diagrama ou print do HTML report do Playwright

4. Semana 3 — testRigor (Low-Code)
   - Testes em linguagem natural escritos para o dashboard
   - Print da execucao no testRigor
   - Tabela comparativa final: Cypress x Playwright x testRigor
   - Conclusao: qual ferramenta para qual cenario

5. Conclusao geral
   - Licoes aprendidas sobre TestOps e CI/CD
   - O que o grupo faria diferente em um projeto real
```

---

## O que ja vem pronto

- Dashboard responsivo com resumo financeiro e lista de despesas.
- Estrutura visual das tres features do trabalho.
- Hook e servicos base para despesas, entradas e leitura de nota fiscal.
- Route Handler de OCR criado como ponto de extensao.
- `Jenkinsfile` com os estagios: Checkout, Install, Unit Tests, Build, E2E Tests, Deploy Vercel.
- **23 cenarios Cypress + Cucumber prontos e passando** para as features ja implementadas.
- Stubs `@todo` com descricao do que testar para cada desafio dos alunos.

## O que os alunos precisam concluir

- Implementar o cadastro de entradas (Feature 01).
- Implementar o cadastro de saidas manuais (Feature 02).
- Finalizar a extracao de nome do estabelecimento e valor a partir da nota fiscal (Feature 03).
- Persistir a saida extraida como despesa no Firestore.
- Completar a integracao Jenkins -> GitHub -> Vercel sem expor secrets.
- Semana 2: migrar de Cypress para Playwright + Cucumber.
- Semana 3: escrever testes equivalentes no testRigor e fazer a analise comparativa.

---

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencher variaveis Firebase
npm run dev                  # servidor de desenvolvimento
npm run test                 # Jest (unit)
npm run test:e2e             # Cypress + dev server
npm run test:e2e:ci          # Cypress + next start (CI)
npm run cypress:open         # Cypress interativo
npm run lint
npm run build
```

---

## Firebase

Variaveis de ambiente esperadas:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

As despesas sao gravadas na colecao `expenses`. A colecao de entradas e a estrategia de sincronizacao devem ser implementadas pela turma.

## Arquivos com `TODO implement`

```
src/services/income-entry-service.ts     — createIncomeEntry, subscribeToIncomeEntries
src/services/expense-service.ts          — createExpense
src/app/api/receipt-extraction/route.ts  — integracao OCR
src/services/receipt-upload.ts           — mapeamento do resultado OCR
Jenkinsfile                              — stage Deploy Vercel (credentials + Vercel CLI)
cypress/e2e/todo-create-expense.feature
cypress/e2e/todo-create-income-entry.feature
cypress/e2e/todo-ocr-extraction.feature
```
