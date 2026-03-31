# Fluxo Financeiro

Aplicacao base de controle de despesas financeiras criada com Next.js App Router, TailwindCSS e Firebase Firestore. A interface foi organizada para servir como base de aula, com dashboard responsivo, formulario manual, area reservada para escaneamento via camera e testes iniciais com Jest.

## Tecnologias

- Next.js 16 com App Router
- React 19
- TailwindCSS 4
- Firebase Firestore
- Jest + React Testing Library

## Estrutura

```text
src/
  app/
  components/
  services/
  __tests__/
```

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env.local` usando `.env.example` como base e preencha as credenciais do Firebase:

```bash
cp .env.example .env.local
```

3. Rode a aplicacao:

```bash
npm run dev
```

4. Execute lint e testes:

```bash
npm run lint
npm run test
```

## Firebase

O projeto espera as seguintes variaveis de ambiente:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

As despesas sao gravadas na colecao `expenses`.

## Vercel

O projeto esta pronto para deploy na Vercel:

- `vercel.json` define o framework como `nextjs`
- `.env.example` facilita o cadastro das variaveis no painel da Vercel
- Scripts de `build`, `start`, `lint` e `test` ja estao configurados

## Testes incluidos

- Validacao do formulario manual quando os campos obrigatorios estao vazios
- Envio do formulario manual com payload normalizado e limpeza dos campos
- Esqueleto `test.skip` para o fluxo futuro de camera/OCR
