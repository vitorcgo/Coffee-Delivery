<h1 align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="./docs/readme/hero-estatico.svg">
    <img src="./docs/readme/hero.svg" width="1120" alt="Coffee Delivery · Projeto final de SPA">
  </picture>
</h1>

<p align="center">
  <strong>Do catálogo à confirmação, um pedido de café em poucos passos.</strong>
</p>

<p align="center">
  Uma cafeteria fictícia com 14 cafés, carrinho persistente e checkout de entrega.<br>
  A interface se adapta a desktop, tablet e celular, com temas claro e escuro.
</p>

<p align="center">
  <img src="./docs/readme/badges/react.svg" height="34" alt="React 19">
  <img src="./docs/readme/badges/vite.svg" height="34" alt="Vite 8.3.8">
  <img src="./docs/readme/badges/typescript.svg" height="34" alt="TypeScript">
  <img src="./docs/readme/badges/tailwind.svg" height="34" alt="Tailwind CSS 4">
  <img src="./docs/readme/badges/router.svg" height="34" alt="React Router">
  <img src="./docs/readme/badges/hook-form.svg" height="34" alt="React Hook Form">
  <img src="./docs/readme/badges/zod.svg" height="34" alt="Zod">
</p>

<p align="center">
  <a href="#demonstração">Demonstração</a> ·
  <a href="#executar-localmente">Executar</a> ·
  <a href="#testes">Testes</a> ·
  <a href="#publicar-na-vercel">Vercel</a> ·
  <a href="#documentação-e-créditos">Documentação</a>
</p>

## Demonstração

[![Página inicial do Coffee Delivery com a apresentação da cafeteria e a primeira fileira de cafés](docs/readme/catalogo-preview.webp)](docs/evidencias/catalogo-desktop.png)

[Ver catálogo completo](docs/evidencias/catalogo-desktop.png)

<details>
<summary><strong>Explorar checkout, confirmação e tema escuro</strong></summary>

### Desktop

<p align="center">
  <a href="./docs/evidencias/checkout-preenchido.png"><img src="./docs/evidencias/checkout-preenchido.png" width="420" alt="Checkout com endereço preenchido e pagamento selecionado"></a>
  <a href="./docs/evidencias/confirmacao.png"><img src="./docs/evidencias/confirmacao.png" width="420" alt="Confirmação do pedido com o resumo da entrega"></a>
</p>

[Checkout antes do preenchimento](docs/evidencias/checkout.png) · [Checkout preenchido](docs/evidencias/checkout-preenchido.png) · [Confirmação](docs/evidencias/confirmacao.png)

### Celular · tema escuro

<p align="center">
  <a href="./docs/evidencias/catalogo-mobile-dark.png"><img src="./docs/evidencias/catalogo-mobile-dark.png" width="260" alt="Início do Coffee Delivery em celular no modo escuro"></a>
  <a href="./docs/evidencias/checkout-mobile-dark.png"><img src="./docs/evidencias/checkout-mobile-dark.png" width="260" alt="Checkout em celular no modo escuro"></a>
</p>

</details>

## Fluxo de compra

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="./docs/readme/fluxo-estatico.svg">
  <img src="./docs/readme/fluxo.svg" width="1120" alt="Fluxo de compra do catálogo ao carrinho, checkout e confirmação">
</picture>

| Etapa | O que é possível fazer |
| --- | --- |
| **Catálogo** | Comparar os 14 cafés, escolher quantidades e adicionar itens. |
| **Carrinho** | Editar ou remover itens. O carrinho permanece após recarregar a página. |
| **Checkout** | Informar o endereço e escolher crédito, débito ou dinheiro para pagamento na entrega. |
| **Confirmação** | Consultar o endereço, a forma de pagamento e a previsão da entrega simulada. |

O carrinho usa Context API, `useReducer` e LocalStorage. O checkout valida os dados com React Hook Form e Zod. A interface usa Baloo 2, Roboto e ícones Phosphor.

## Executar localmente

Use **Node.js 22.12+ na série 22** e npm. O projeto inclui `.nvmrc` e `package-lock.json`.

```bash
npm ci
npm run dev
```

Abra a URL que o Vite imprimir no terminal. Os comandos abaixo geram e servem o build de produção localmente.

```bash
npm run build
npm run preview
```

## Testes

A suíte cobre **8 testes unitários** e **7 cenários no Chromium**, incluindo carrinho em duas abas, armazenamento indisponível, edição de CEP e navegação por teclado.

```bash
npm test
npx playwright install chromium
npm run test:e2e
```

As capturas da galeria usam o build local e dados fictícios.

## Publicar na Vercel

Importe o repositório na Vercel e configure **Vite** e **Node.js 22.x**. O [`vercel.json`](vercel.json) define o comando `npm run build`, a saída `dist` e o fallback para as rotas do React Router. O projeto usa dados locais e dispensa variáveis de ambiente. [Guia da Vercel para Vite](https://vercel.com/docs/frameworks/frontend/vite)

## Documentação e créditos

| Documento | Conteúdo |
| --- | --- |
| [PRD_SPEC.md](PRD_SPEC.md) | Requisitos, regras de negócio e critérios de aceite. |
| [TECH_SPEC.md](TECH_SPEC.md) | Arquitetura, componentes, estado e estratégia de testes. |
| [TASKS_SPEC.md](TASKS_SPEC.md) | Planejamento e acompanhamento da implementação. |
| [AGENTS.md](AGENTS.md) | Diretrizes e registro do uso de Codex, MCP do Figma e ImageGen. |

As fotos de cafés, ilustrações e ícones vieram do protótipo acadêmico. O símbolo da marca, usado na capa, no cabeçalho e no favicon, foi gerado com ImageGen. [Projeto no Figma](https://www.figma.com/design/Q8fX8D6T32ZbVAIPqU9kIF/?node-id=0-1) · [Style Guide](https://www.figma.com/design/Q8fX8D6T32ZbVAIPqU9kIF/?node-id=2-1297)
