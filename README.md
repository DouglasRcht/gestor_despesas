# Fluxo Financeiro

Aplicacao base para um trabalho pratico de Qualidade de Software, TestOps e deploy controlado por Jenkins. O template usa Next.js App Router, React 19, TailwindCSS 4 e Firebase Firestore, mas nao entrega as features avaliadas: ele deixa as tres entregas principais como scaffold com `TODO implement` para que a turma implemente, teste e publique via Jenkins.

## O que ja vem pronto

- Dashboard responsivo com resumo financeiro e lista de despesas.
- Estrutura visual das tres features do trabalho.
- Hook e servicos base para despesas, entradas e leitura de nota fiscal.
- Route Handler de OCR por arquivo criado como ponto de extensao.
- Scaffold de `Jenkinsfile` com os estagios obrigatorios do trabalho.
- Testes guia com cenarios `test.skip` para a turma ativar no momento planejado.

## O que os alunos precisam concluir

- Implementar o cadastro de entradas.
- Implementar o cadastro de saidas manuais.
- Finalizar a extracao de `nome do estabelecimento` e `valor` a partir da nota fiscal enviada.
- Persistir a saida extraida como despesa no Firestore.
- Completar a integracao Jenkins -> GitHub -> Vercel sem expor secrets.
- Ativar e fazer passar os testes marcados com `test.skip` no fluxo planejado do trabalho.

## Arquivos com `TODO implement`

- `Jenkinsfile`
- `src/components/income-entry-form.tsx`
- `src/services/income-entry-service.ts`
- `src/services/use-income-entries.ts`
- `src/components/manual-expense-form.tsx`
- `src/services/expense-service.ts`
- `src/components/receipt-upload-panel.tsx`
- `src/services/receipt-upload.ts`
- `src/app/api/receipt-extraction/route.ts`
- `src/__tests__/income-entry-form.test.tsx`
- `src/__tests__/manual-expense-form.test.tsx`
- `src/__tests__/receipt-upload-panel.test.tsx`
- `src/__tests__/receipt-upload.test.ts`
- `docs/TODO_IMPLEMENTATION_MAP.md`

## Estrutura

```text
docs/
src/
  app/
  components/
  services/
  __tests__/
Jenkinsfile
```

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env.local` usando `.env.example` como base:

```bash
cp .env.example .env.local
```

3. Preencha as variaveis do Firebase e, se a sua turma optar por OCR externo, as variaveis server-side do provedor escolhido.

4. Rode a aplicacao:

```bash
npm run dev
```

5. Execute os checks locais:

```bash
npm run lint
npm run test
npm run build
```

## Firebase

O projeto espera as seguintes variaveis de ambiente publicas:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

As despesas sao gravadas na colecao `expenses`.

As entradas ainda nao estao persistidas no template. A colecao e a estrategia de sincronizacao devem ser implementadas pela turma.

## OCR e Upload de Nota

O fluxo de upload aceita PDF e imagens e leva o arquivo ate a rota `src/app/api/receipt-extraction/route.ts`. A base atual prepara a interface, o servico cliente e a rota, mas deixa a extracao real e o salvamento da despesa como atividade dos alunos.

## Jenkins e Vercel

- `Jenkinsfile` ja contem os estagios `Checkout`, `Install`, `Unit Tests`, `Build` e `Deploy Vercel`.
- O bloco de deploy foi mantido como scaffold com `TODO implement` para que a turma configure credentials e a estrategia final de publicacao.
- `vercel.json` ja identifica o projeto como `nextjs`.

## Testes incluidos

- Smoke test do scaffold de entradas.
- Smoke test do scaffold de saida manual.
- Smoke test do scaffold de leitura por arquivo.
- Esqueletos `test.skip` para entradas, saida manual e OCR por upload.
