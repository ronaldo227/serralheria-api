# Registro de Ciclos Evolucionários (Modelo Espiral)

Este arquivo serve para documentar cada ciclo de evolução do projeto, seguindo o modelo espiral.

---


## Colograma de Produção Diária

| Data       | Produção 1                | Produção 2                | Produção 3                | Observações                |
|------------|---------------------------|---------------------------|---------------------------|----------------------------|
| 11/10/2025 | Estruturação do painel admin | Atualização do material de apoio | Detalhamento do ciclo 1, colograma e análise/modelagem de sistemas | Push, documentação profissional e versionamento no GitHub |
| 12/10/2025 |                           |                           |                           |                            |
| 14/10/2025 |                           |                           |                           |                            |
| 15/10/2025 |                           |                           |                           |                            |
| 16/10/2025 | Início do ciclo de produção: painel admin, cadastro de clientes, ajustes no material de apoio | Implementação de rotas e controllers | Testes e documentação | Foco: funcionalidades do painel admin, cadastro/gestão de clientes, versionamento e documentação profissional |

> Preencha diariamente com os acréscimos, ajustes ou tarefas realizadas. Recomenda-se registrar pelo menos 3 itens por dia para acompanhamento e análise da evolução do projeto.

---

## Observação sobre Escalabilidade e Microsserviços

> Conforme o sistema evoluir e a demanda aumentar, está previsto o planejamento para migração da arquitetura monolítica para microsserviços. Essa transição permitirá maior escalabilidade, independência de domínios, facilidade de manutenção e implantação contínua. O design atual já considera separação de responsabilidades e modularização para facilitar essa evolução futura.

---

## Ciclo 1 - 10/10/2025

**Objetivo:**
  - Estruturar e documentar a hierarquia corporativa, escopo de acesso e domínios do sistema, com foco em segurança e governança.
  - Implementar e modelar o Painel Administrativo inicial, gestão de permissões, colaboradores e RBAC (Role-Based Access Control).

🧱 **Hierarquia Corporativa e Escopo de Acesso**

| Nível         | Descrição                                                                 | Escopo / Permissões Típicas                                      |
|--------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| 🏆 CEO        | Controle total do sistema. Define políticas, acessos e aprovações globais. | Acesso a todos os módulos e permissões (FULL_ACCESS)              |
| 💼 Diretor    | Supervisiona departamentos (Financeiro, Produção, Comercial). Pode criar gerentes e revisar relatórios. | GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, VISUALIZAR_RELATORIOS |
| 🧠 Gerente    | Coordena operações do setor e supervisiona equipes.                        | GERENCIAR_EQUIPE, CONTROLAR_PEDIDOS, CONTROLAR_ESTOQUE            |
| 🧰 Encarregado| Supervisiona execução de tarefas e controle de materiais.                  | GERENCIAR_COLABORADORES, ATUALIZAR_STATUS, VISUALIZAR_MATERIAIS   |
| 👷 Colaborador| Executa tarefas operacionais com acesso restrito ao seu escopo.            | EXECUTAR_TAREFAS, VISUALIZAR_PRÓPRIOS_PEDIDOS                     |

🧩 **Domínios do Sistema e Responsabilidades**

| Domínio                | Descrição                                                    | Permissões Recomendadas                                  |
|------------------------|--------------------------------------------------------------|----------------------------------------------------------|
| 🧭 Painel Administrativo| Gestão de permissões, colaboradores e configurações gerais.  | GERENCIAR_USUARIOS, GERENCIAR_PERMISSOES, CONFIGURAR_SISTEMA |
| 👥 Clientes             | Cadastro, edição e histórico de clientes.                    | CRIAR_CLIENTE, EDITAR_CLIENTE, VISUALIZAR_CLIENTE, EXCLUIR_CLIENTE |
| 📄 Orçamentos           | Emissão e controle de orçamentos personalizados.             | CRIAR_ORCAMENTO, EDITAR_ORCAMENTO, APROVAR_ORCAMENTO, VISUALIZAR_ORCAMENTO |
| 📦 Pedidos              | Controle de pedidos realizados, status e andamento.          | CRIAR_PEDIDO, EDITAR_PEDIDO, CANCELAR_PEDIDO, VISUALIZAR_PEDIDOS |
| 🏭 Fornecedores         | Cadastro e controle de fornecedores.                         | CRIAR_FORNECEDOR, EDITAR_FORNECEDOR, VISUALIZAR_FORNECEDOR      |
| ⚙️ Materiais            | Gerenciamento de materiais utilizados na produção.           | CRIAR_MATERIAL, EDITAR_MATERIAL, VISUALIZAR_MATERIAL, EXCLUIR_MATERIAL |
| 🏗️ Estoque              | Controle de estoque de materiais e produtos acabados.        | ATUALIZAR_ESTOQUE, VISUALIZAR_ESTOQUE, GERAR_ALERTA_ESTOQUE      |
| 💰 Financeiro           | Controle financeiro, contas a pagar/receber e fluxo de caixa.| LANÇAR_CONTA, APROVAR_PAGAMENTO, VISUALIZAR_RELATORIO_FINANCEIRO |
| 🧮 Cálculos             | Cálculo de materiais, custos e medidas de projetos.          | EXECUTAR_CALCULO, GERAR_ORCAMENTO_AUTOMATICO, EDITAR_PARAMETROS_CALCULO |
| 🗓️ Agenda               | Controle de compromissos e prazos de entrega.               | CRIAR_EVENTO, EDITAR_EVENTO, VISUALIZAR_AGENDA                  |
| 📁 Documentos           | Armazenamento, upload e organização de documentos.           | ENVIAR_DOCUMENTO, VISUALIZAR_DOCUMENTO, EXCLUIR_DOCUMENTO        |
| 📊 Relatórios           | Geração de relatórios gerenciais e operacionais.             | GERAR_RELATORIO, EXPORTAR_RELATORIO, VISUALIZAR_ANALYTICS        |
| 👤 Usuários             | Cadastro e controle de usuários do sistema.                  | CRIAR_USUARIO, EDITAR_USUARIO, DESATIVAR_USUARIO                |
| 🔒 Permissões           | Controle de acesso por roles e permissões individuais.       | CRIAR_ROLE, ATRIBUIR_PERMISSAO, REMOVER_PERMISSAO                |

⚙️ **Modelo RBAC (Role-Based Access Control)**

Modelo de dados sugerido:

🧱 Tabelas Principais

| Tabela          | Descrição                                                        |
|-----------------|------------------------------------------------------------------|
| admins          | Armazena os dados de usuários administrativos e colaboradores.   |
| roles           | Define os cargos hierárquicos (CEO, Diretor, Gerente, etc.).     |
| permissions     | Lista todas as permissões do sistema.                            |
| role_permissions| Relaciona permissões com cargos.                                 |
| admin_roles     | Relaciona administradores com cargos (suporta múltiplas funções).|

🔐 **Regras de Segurança**

- JWT para autenticação e refresh token para sessões seguras.
- bcrypt para criptografia de senhas.
- Middlewares de autorização:
  - verifyRole — valida nível hierárquico.
  - verifyPermission — valida acesso ao domínio.
- Proteção contra escalonamento:
  - Um Gerente não pode promover outro a Diretor.
  - Apenas CEO pode criar ou excluir Diretores.
- Logs de auditoria:
  - Registrar ações de criação, edição, exclusão e atribuição de permissões.

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

> Preencha cada ciclo conforme o projeto evolui. Isso facilita o acompanhamento, aprendizado e adaptação contínua.