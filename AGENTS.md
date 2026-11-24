# Diretrizes para assistentes de IA

## Regras do projeto

- Leia `PRD_SPEC.md`, `TECH_SPEC.md` e `TASKS_SPEC.md` antes de alterar funcionalidades. Atualize os documentos quando um comportamento mudar.
- Preserve React, TypeScript, Tailwind CSS e a major 8 do Vite. Registre mudanças de dependências no lockfile.
- Consulte o Style Guide por meio do MCP do Figma para mudanças visuais. Reutilize tokens, ícones e componentes existentes. Verifique estados de foco, hover, seleção e erro em ambos os temas.
- Preserve o armazenamento compatível do carrinho. Use centavos inteiros para preços e totais e mantenha endereço e pagamento em memória.
- Use dados fictícios em exemplos, imagens e testes. Mantenha chaves, dados pessoais e credenciais fora do código, das capturas e dos prompts.
- Rode os testes e o build para alterações funcionais. Inspecione pelo menos uma largura desktop e uma móvel para mudanças de interface.
- Faça commits semânticos por etapa, com mensagens em português e sem trailer `Co-authored-by`. Separe alterações de escopos diferentes. A publicação é feita pelo responsável na Vercel.

## Registro de uso da IA

| Etapa | Ferramenta | Participação registrada |
| --- | --- | --- |
| Planejamento | Codex e MCP do Figma | Tradução do enunciado em requisitos, critérios de aceite, arquitetura e etapas. Leitura de frames, tokens, estados e referências. |
| Desenvolvimento | Codex e MCP do Figma | Implementação React e Tailwind a partir do guia, integração do fluxo de compra, exportação de assets e documentação. |
| Identidade visual | OpenAI ImageGen | Geração de um copo de café em movimento, violeta, com fundo transparente. A saída foi recortada, convertida para WebP e aplicada no cabeçalho e no favicon. |
| Revisão | Codex | Comparação das telas com o Figma, revisão de validação, cálculo de valores, persistência e responsividade. |
| Testes | Codex, Vitest e Playwright | Escrita e execução de testes, verificação no Chromium e captura das evidências listadas no README. |

O briefing de geração pediu um símbolo original, compacto, em violeta `#8047F8`, com um copo para viagem e linhas de movimento, sem texto, sombra ou moldura. O texto da marca foi composto na interface com a tipografia do projeto.
