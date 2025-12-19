# Registro de Ciclos Evolucionários (Modelo Espiral)

Este arquivo serve para documentar cada ciclo de evolução do projeto, seguindo o modelo espiral.

---

## Princípios de Desenvolvimento do Projeto

> **Metodologia:** Desenvolvimento baseado na documentação oficial das tecnologias utilizadas (Node.js, TypeScript, Prisma, Express), seguindo padrões de mercado e boas práticas de engenharia de software. O projeto prioriza arquitetura limpa, código testável e manutenibilidade.

---

## Colograma de Produção Diária

| Data       | Produção 1                | Produção 2                | Produção 3                | Observações                |
|------------|---------------------------|---------------------------|---------------------------|----------------------------|
| 11/10/2025 | Estruturação do painel admin | Atualização do material de apoio | Detalhamento do ciclo 1, colograma e análise/modelagem de sistemas | Push, documentação profissional e versionamento no GitHub |
| 12/10/2025 | Checklist profissional de implementação e organização de prioridades | Aprimoramento da modelagem de permissões, fluxos e documentação | Adição de pasta privada para anotações pessoais e ajustes no .gitignore | Push, versionamento, revisão geral e orientações para evolução até 10/10 |
| 13/10/2025 | Refino e profissionalização do modelo de permissões no banco | Alinhamento do RBAC avançado à modelagem Prisma | Documentação detalhada da estrutura de dados e histórico de permissões | Push das alterações no banco e documentação, garantindo rastreabilidade e versionamento |
| 14/10/2025 |                           |                           |                           |                            |
| 16/10/2025 |  |  |  | Observação: Devido a pequenos erros, foi necessário realizar um rollback para a versão do dia 15/10/2025. |
| 27/10/2025 | Diagrama de classes (Mermaid) criado e documentado no projeto | Sincronização e restauração de arquivos no GitHub | Configuração inicial do Prisma ORM e integração dos arquivos de ambiente | Documentação, QA do diagrama, push dos arquivos restaurados e imagem do diagrama para o repositório |
| 28/10/2025 | Criação do utilitário de conexão Prisma (src/utils/prisma.ts) |  |  |  |
| 29/10/2025 | Modelagem e revisão do schema Prisma para RBAC avançado (Admin, Role, Permissao, AdminRole, RolePermission) | Execução de migrations e geração do client Prisma | Testes de conexão com Neon, ajustes na variável DATABASE_URL e troubleshooting de erro P1001 | Documentação do ciclo, push das migrations e registro dos problemas de conexão |
| 10/11/2025 | Criação do README de modelagem (Mermaid UML) | Correções e padronização dos diagramas de classe (herança, anotações, multiplicidade) | Geração/atualização dos diagramas (Admin/CEO, Cliente, Fornecedor, Material, Pedido, Usuario) | Renderização validada no GitHub; seção de modelagem removida deste arquivo e mantida no README de modelagem; expansão do diagrama Admin/CEO com RBAC completo incluindo métodos privados e encapsulamento |
| em analise | Início do ciclo de produção: painel admin, cadastro de clientes, ajustes no material de apoio | Implementação de rotas e controllers | Testes e documentação | Foco: funcionalidades do painel admin, cadastro/gestão de clientes, versionamento e documentação profissional. Atuação do CEO/Admin: definição de políticas, revisão de permissões e acompanhamento do progresso. |

> Preencha diariamente com os acréscimos, ajustes ou tarefas realizadas. Recomenda-se registrar pelo menos 3 itens por dia para acompanhamento e análise da evolução do projeto.

---

## Observação sobre Escalabilidade e Microsserviços

> Conforme o sistema evoluir e a demanda aumentar, está previsto o planejamento para migração da arquitetura monolítica para microsserviços. Essa transição permitirá maior escalabilidade, independência de domínios, facilidade de manutenção e implantação contínua. O design atual já considera separação de responsabilidades e modularização para facilitar essa evolução futura.

---

## Ciclo 1 - 10/10/2025

**Objetivo:**
  - Estruturar o Painel Administrativo para gestão de administradores, permissões e colaboradores.

**Níveis do Painel Administrativo**

| Nível         | Descrição                                                                 | Escopo / Permissões Típicas                                      |
|--------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| 🏆 CEO        | Controle total do sistema. Define políticas, acessos e aprovações globais. | Acesso a todos os módulos e permissões (FULL_ACCESS)              |
| 💼 Diretor    | Supervisiona departamentos (Financeiro, Produção, Comercial). Pode criar gerentes e revisar relatórios. | GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, VISUALIZAR_RELATORIOS |
| 🧠 Gerente    | Coordena operações do setor e supervisiona equipes.                        | GERENCIAR_EQUIPE, CONTROLAR_PEDIDOS, CONTROLAR_ESTOQUE            |
| 🧰 Encarregado| Supervisiona execução de tarefas e controle de materiais.                  | GERENCIAR_COLABORADORES, ATUALIZAR_STATUS, VISUALIZAR_MATERIAIS   |
| 👷 Colaborador| Executa tarefas operacionais com acesso restrito ao seu escopo.            | -                                                                 |

- **Requisitos:**
  - Cadastro de administradores:
    - Permitir criar, editar, listar e remover administradores.
    - Validar dados obrigatórios (nome, email único, senha forte).
    - Registrar data de criação e último acesso.
  - Definição de níveis de permissão:
    - Criar estrutura de roles (ex: superadmin, admin, gerente, colaborador).
    - Permitir associar múltiplas permissões a cada administrador.
    - Exemplo de permissões: GERENCIAR_CLIENTES, GERENCIAR_PEDIDOS, VISUALIZAR_RELATORIOS.
  - Interface para atribuição de permissões aos colaboradores:
    - Tela ou endpoint para listar permissões disponíveis.
    - Permitir atribuir/remover permissões de cada colaborador/admin.
    - Registrar histórico de alterações de permissões.

- **Riscos/Desafios:**
  - Garantir segurança no controle de acesso:
    - Proteger endpoints sensíveis com autenticação e autorização.
    - Criptografar senhas e tokens.
    - Prevenir escalonamento de privilégios (ex: um admin comum não pode se tornar superadmin).
  - Definir modelo flexível para permissões:
    - Permitir criar novas permissões sem alterar código.
    - Suportar permissões por domínio (ex: permissões só para clientes, só para pedidos).
    - Planejar para crescimento futuro (novos domínios, novos tipos de acesso).

- **Entregas:**
  - Estrutura base do painel admin:
    - Rotas RESTful para admins e permissões.
    - Controllers e services organizados por domínio.
    - Models/migrations para Admin, Permissão, Role.
  - Documentação do fluxo de permissões:
    - Diagrama ou tabela explicando como permissões são atribuídas e validadas.
    - Exemplos de uso (ex: fluxo de cadastro, atribuição e validação de permissão).

- **Validação/Feedback:**
  - Revisão do fluxo por stakeholders:
    - Apresentar protótipo ou documentação para validação dos requisitos.
    - Coletar sugestões de melhoria e ajustar o fluxo.
  - Testes manuais de cadastro e atribuição de permissões:
    - Simular diferentes perfis de usuário.
    - Testar limites (ex: tentar atribuir permissão não permitida, remover permissão crítica).

- **Ajustes para o próximo ciclo:**
  - Implementar autenticação e proteção de rotas:
    - Adicionar login, geração de token, middleware de autorização.
    - Proteger rotas do painel e de permissões.
  - Iniciar integração com domínios operacionais:
    - Permitir que permissões administrem acesso a clientes, pedidos, etc.
    - Testar fluxo completo: admin → atribui permissão → colaborador acessa domínio permitido.

---


---

## Visão de Futuro: Análise SaaS

Quando o projeto estiver bem avançado, com múltiplos domínios implementados e arquitetura consolidada, será o momento ideal para realizar uma análise de viabilidade e evolução para o modelo SaaS (Software as a Service).

- Avaliar a separação de dados por cliente (multi-tenancy), escalabilidade e isolamento de recursos.
- Planejar a gestão de assinaturas, faturamento e onboarding automatizado de novos clientes.
- Adaptar autenticação, autorização e permissões para múltiplos ambientes e organizações.
- Garantir monitoramento, segurança e compliance em escala.
- Documentar requisitos, riscos e oportunidades específicos do modelo SaaS.

Essa análise estratégica permitirá transformar o sistema em uma solução robusta, escalável e pronta para atender múltiplos clientes de forma profissional.
