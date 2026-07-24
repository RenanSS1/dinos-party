# Regras para Agentes de IA — Dino's Party

Este documento define o conjunto permanente de regras que agentes de IA devem seguir ao trabalhar neste projeto.

## Regras Gerais

1. **Preservação da arquitetura existente** — Não alterar a estrutura ou organização do projeto sem necessidade comprovada.

2. **Não alterar funcionalidades existentes sem necessidade** — Manter o comportamento atual do sistema. Alterações funcionais devem ser justificadas pelo objetivo da tarefa.

3. **Não inventar APIs, dependências ou configurações** — Toda API, biblioteca ou configuração utilizada deve estar devidamente documentada ou presente no projeto. Não assumir a existência de recursos não verificados.

4. **Antes de alterar código, entender primeiro o fluxo existente** — Ler e compreender os arquivos envolvidos antes de fazer qualquer modificação.

5. **Fazer alterações mínimas e focadas no objetivo solicitado** — Modificar apenas o estritamente necessário para atender ao requisito.

6. **Não modificar arquivos não relacionados à tarefa** — Alterar exclusivamente os arquivos pertinentes ao objetivo da tarefa em execução.

7. **Não remover código ou funcionalidades sem autorização explícita** — Preservar blocos de código, comentários e funcionalidades existentes, a menos que a remoção seja solicitada.

8. **Não adicionar dependências sem justificar a necessidade** — Toda nova dependência deve ser acompanhada de uma justificativa clara e objetiva.

9. **Sempre considerar compatibilidade com a arquitetura atual** — Garantir que mudanças sejam coerentes com o design e as decisões técnicas já estabelecidas.

10. **Executar validações ou testes disponíveis após alterações** — Rodar testes, linters ou qualquer verificação disponível antes de finalizar a tarefa.

11. **Não modificar arquivos de configuração sensíveis ou credenciais** — Arquivos que contêm senhas, tokens, chaves de API ou configurações de ambiente não devem ser alterados.

12. **Não fazer commit ou push automaticamente sem autorização explícita** — Commits e pushes devem ser autorizados pelo usuário.

13. **Em caso de dúvida sobre requisitos ou comportamento esperado, perguntar antes de implementar** — Não assumir interpretações ambíguas; esclarecer com o usuário previamente.

14. **Ao finalizar uma tarefa, informar quais arquivos foram alterados e resumir as mudanças** — Fornecer um relato claro do que foi modificado e por quê.

## Regras de Contexto e Comportamento

- O `AI_CONTEXT.md` deve ser consultado para compreender a arquitetura antes de tarefas relevantes.
- O código existente é a fonte de verdade sobre o comportamento atual do sistema.
- Não assumir que uma funcionalidade existe apenas porque está descrita na documentação.
- Não reescrever grandes partes do projeto quando uma alteração localizada for suficiente.

---

*Estas regras aplicam-se a todos os agentes de IA que interagem com o repositório, independentemente da ferramenta ou contexto de uso.*