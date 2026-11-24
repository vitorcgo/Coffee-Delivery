# PRD · Coffee Delivery

## Produto

Coffee Delivery é uma cafeteria fictícia com um catálogo de cafés e um fluxo de pedido para entrega. A SPA atende pessoas que querem comparar bebidas, ajustar quantidades e simular uma compra. O desafio acadêmico avalia o fluxo completo, a aderência ao protótipo, a qualidade da implementação e a documentação do uso de IA.

## Requisitos funcionais

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RF01 | Exibir o catálogo | O início exibe as 14 bebidas do protótipo com foto, nome, categorias, descrição e preço. |
| RF02 | Adicionar cafés | O visitante escolhe a quantidade por produto. A adição acumula quantidades e atualiza o contador do cabeçalho. |
| RF03 | Editar o carrinho | O checkout permite aumentar, diminuir e remover itens, com recálculo de subtotal, entrega e total. |
| RF04 | Recuperar o carrinho | Uma recarga preserva os produtos e as quantidades válidas. Abas abertas no mesmo navegador acompanham as alterações no carrinho. |
| RF05 | Validar a entrega | O formulário exige CEP, rua, número, bairro, cidade, UF e forma de pagamento. O campo de CEP aceita colagem com pontuação. Campo inválido recebe uma mensagem específica. |
| RF06 | Escolher o pagamento | O visitante seleciona crédito, débito ou dinheiro. O controle exibe a opção ativa e aceita navegação por teclado. |
| RF07 | Confirmar o pedido | Um carrinho com itens e dados válidos é limpo na confirmação. A tela de sucesso mostra endereço, previsão e pagamento. |
| RF08 | Alternar o tema | O controle do cabeçalho alterna entre claro e escuro. A preferência persiste após a recarga. |

## Requisitos não funcionais

| ID | Requisito | Critério de aceite |
| --- | --- | --- |
| RNF01 | Stack e arquitetura | React, Vite 8, TypeScript, Tailwind CSS, React Router, Context API, `useReducer`, hooks e props. |
| RNF02 | Identidade visual | O tema claro segue a composição, tipografia, paleta e variantes do Style Guide. O cabeçalho e o favicon usam um símbolo original gerado por IA. |
| RNF03 | Responsividade | Catálogo, checkout e confirmação refluem em desktop, tablet e celular. A largura de 320 px continua navegável sem rolagem horizontal. |
| RNF04 | Acessibilidade | Campos e controles têm nomes acessíveis, foco visível e operação por teclado. Erros são associados aos campos. Ao remover um café pelo teclado, o foco permanece no resumo do carrinho. |
| RNF05 | Entrega técnica | O repositório inclui build reproduzível, testes, especificações, instruções para Vercel e histórico de commits semânticos. |
| RNF06 | Uso responsável de IA | A documentação registra as contribuições de IA no planejamento, desenvolvimento, revisão e verificação. As evidências usam dados fictícios. |

## Regras de negócio

- Cada café custa R$ 9,90. A entrega simulada custa R$ 3,50 quando o carrinho contém itens.
- Cada produto aceita de 1 a 99 unidades. Adições do mesmo café compartilham uma linha. O botão Remover exclui essa linha.
- O cabeçalho indica o número total de unidades. O selo aparece quando o total é maior que zero.
- O CEP contém oito dígitos. A UF pertence à lista oficial de siglas brasileiras. O complemento é opcional e o número admite a opção S/N.
- O pagamento é selecionado para a entrega. A simulação não coleta dados de cartão e não gera cobrança.
- O pedido exige pelo menos um item. A previsão exibida é de 20 a 30 minutos.
- Porto Alegre, RS é a localização de referência do cabeçalho. A confirmação exibe a cidade e a UF informadas no formulário.
- O endereço e o pagamento ficam em memória durante a sessão da página. O acesso à confirmação sem um pedido ativo retorna ao catálogo.

## Escopo

A entrega cobre a navegação local, a validação estrutural do endereço e a simulação do pedido. Cadastro de usuários, integração com CEP, servidores, estoque e pagamentos ficam fora do escopo acadêmico.

[Protótipo Coffee Delivery no Figma](https://www.figma.com/design/Q8fX8D6T32ZbVAIPqU9kIF/?node-id=0-1) · [Style Guide](https://www.figma.com/design/Q8fX8D6T32ZbVAIPqU9kIF/?node-id=2-1297)
