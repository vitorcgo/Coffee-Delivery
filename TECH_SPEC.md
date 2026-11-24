# Especificação técnica · Coffee Delivery

## Arquitetura

A aplicação roda inteiramente no navegador. O Vite 8 produz um diretório estático `dist/`. O React Router usa o histórico do navegador e a configuração da Vercel direciona acessos diretos a rotas da SPA para o HTML de entrada.

| Rota | Componente | Responsabilidade |
| --- | --- | --- |
| `/` | `Home` | Apresentação, catálogo e seleção da quantidade. |
| `/checkout` | `Checkout` | Endereço, método de pagamento e resumo. |
| `/success` | `Success` | Confirmação de um pedido ativo. |

## Tecnologias e componentes

- React 19 e TypeScript com verificação estrita. O Vite fica fixado em `8.3.8` no manifesto e no lockfile.
- Tailwind CSS 4 e CSS com tokens para tipografia, cores e superfícies. Baloo 2 e Roboto são servidas com a aplicação.
- React Hook Form controla o formulário. O resolver Zod valida e normaliza os dados entregues ao reducer.
- `Button` tem variantes primária, secundária e de ícone. `DesignIcon` renderiza os SVGs exportados do Figma.
- `Header` compõe a marca, o tema, a localização e o carrinho com selo condicional.
- `QuantityInput` recebe quantidade, limites e callback por props. `CatalogCard` e `CartSummary` reutilizam esse controle e `CoffeeImage`.
- `AddressField` reúne rótulo, entrada, indicação opcional e erro. `CheckoutForm` usa um grupo de radios nativos com a aparência do Select do guia.
- `FeatureIcon` padroniza os ícones circulares da introdução e da confirmação.

## Estado e persistência

| Informação | Onde vive | Comportamento |
| --- | --- | --- |
| Itens do carrinho | `CartProvider`, via Context API e `useReducer` | O reducer adiciona, altera, remove e limpa itens. Um efeito grava o array em `coffee-delivery:cart:v1`. A hidratação descarta entradas inválidas e consolida produtos repetidos. |
| Pedido confirmado | `CartProvider` | Uma transição registra endereço e pagamento em memória e esvazia o carrinho. |
| Quantidade antes de adicionar | `CatalogCard`, via `useState` | Reinicia em uma unidade depois de adicionar. O máximo respeita as unidades já presentes no carrinho. |
| Campos de entrega | `CheckoutForm`, via `useForm` | O formulário valida na confirmação e trata CEP, UF e complemento junto com o método de pagamento. |
| Tema | `ThemeToggle`, via `useState` e `useLayoutEffect` | Aplica `data-theme` no HTML e grava `coffee-delivery:theme`. Começa em tema claro sem preferência registrada. |

O catálogo é imutável por convenção e identifica cada produto por ID. Os valores são calculados em centavos inteiros. O armazenamento do navegador contém apenas as quantidades do carrinho e o tema. Se o armazenamento estiver indisponível, o fluxo funciona em memória.

## Implementação do Figma

As telas e as variantes foram lidas pelo MCP do Figma na cópia fornecida para o trabalho. Fotos, ícones e ilustrações exportados estão em `public/design/`. O layout usa a coluna útil de 1120 px do protótipo desktop e reordena os blocos quando o espaço diminui.

O cabeçalho usa a nova logo de IA e acrescenta o controle de tema. O Dark Mode, o layout responsivo, as mensagens de erro e o estado do carrinho vazio são extensões necessárias para o projeto.

| Componente do guia | Referência | Implementação |
| --- | --- | --- |
| Button | `220:1392` | `Button` |
| Cart | `13027:780` | `Header` |
| Select | `222:754` | Grupo de pagamento em `CheckoutForm` |
| Input Text | `222:490` | `AddressField` |
| Input Number | `220:3167` | `QuantityInput` |
| Coffee Card | `13027:850` | `CatalogCard` e linhas de `CartSummary` |

## Estratégia de testes

- Vitest cobre transições do carrinho, limites, dados persistidos, totais e validação do checkout.
- Playwright em Chromium cobre catálogo, persistência, edição, remoção, formulário inválido, finalização, rotas e tema. Os testes verificam largura sem overflow em 320 e 768 px.
- `npm run build` combina a verificação de tipos com o empacotamento de produção.
- A conferência visual usa o protótipo desktop de 1440 px e capturas do produto no navegador. As imagens do README mostram a execução com dados fictícios.
