

2. Requisitos
3. Casos de Uso
4. Modelagem de Dados
5. Processos
6. Telas e UX/UI
7. API (REST)
8. Testes e Validação
9. Estratégias de Evolução
10. Compliance e Segurança
11. Referências



|--------------|--------------------------------------------------------------------------------------------------|
| 16/10/2025   | Devido a pequenos erros, foi necessário realizar um rollback para a versão do dia 15/10/2025.    |
---

---

# 2. Requisitos

## 2.1 Funcionais
- [Admin] Cadastro, edição, remoção e listagem de administradores.
- [Admin] Definição e atribuição de papéis (roles) e permissões.
- [Cliente] Cadastro, edição, remoção e listagem de clientes.
- [Pedido] Gerenciamento de pedidos, status, histórico e notificações.
- [Relatórios] Geração e consulta de relatórios gerenciais.
- [Auditoria] Registro e rastreabilidade de todas alterações críticas.

## 2.2 Não Funcionais
Segurança: criptografia de senhas, autenticação JWT, proteção de endpoints sensíveis, conformidade LGPD. (Em análise: possível integração futura com login via Google - OAuth 2.0)
- Usabilidade: interfaces intuitivas, responsivas e acessíveis.
- Performance: respostas rápidas, paginadas e escaláveis.
- Disponibilidade: tolerância a falhas, backup automático.
- Escalabilidade: arquitetura modular, RBAC expansível, pronto para multi-tenancy.

- Stack: Node.js, TypeScript, Express, Prisma ORM.
- Banco relacional (PostgreSQL recomendado).
- Integração futura com serviços externos (email, logs, monitoramento).

---

# 3. Casos de Uso

## Exemplos
- **UC01:** Admin cadastra novo colaborador (pré-condição: admin autenticado; pós-condição: colaborador registrado).
- **UC03:** Colaborador acessa funcionalidade permitida (pré-condição: permissão atribuída; pós-condição: ação realizada).
- **UC04:** Admin consulta histórico de permissões (pré-condição: admin autenticado; pós-condição: histórico exibido).

### Diagrama de Casos de Uso (Mermaid)


### 1.1 Requisitos Funcionais
- Cadastro, edição, remoção e listagem de administradores.
- Segurança: criptografia de senhas, autenticação JWT, proteção de endpoints sensíveis.
- Usabilidade: interfaces intuitivas e responsivas para o painel administrativo.
- Banco de dados relacional, gerenciado via Prisma ORM.

## 2. Casos de Uso (Exemplos)
- **UC02:** Admin atribui/remove permissão de um colaborador.
- **UC03:** Colaborador acessa funcionalidade permitida.
- **UC04:** Admin consulta histórico de permissões.


### Fluxos Alternativos e Respostas de Erro (Admin)

- **UC01 - Fluxo alternativo:**
    - Se o email informado já estiver cadastrado, o sistema retorna:
      - Status: 400 Bad Request
      - Body: `{ "error": "Email já cadastrado." }`
- **UC02 - Fluxo alternativo:**
    - Se o colaborador não existir, retorna:
      - Status: 404 Not Found
      - Body: `{ "error": "Colaborador não encontrado." }`
- **UC03 - Fluxo alternativo:**
    - Se o colaborador tentar acessar funcionalidade sem permissão:
      - Status: 403 Forbidden
      - Body: `{ "error": "Permissão insuficiente." }`
- **UC04 - Fluxo alternativo:**

### Validações e Regras de Negócio (Admin)

## 3. Modelagem de Dados (Entidades e Relacionamentos)
### Papéis Organizacionais e Permissões (RBAC Avançado)



| Nível | Papel         | Permissões-Chave |
|-------|---------------|-----------------|
| 🏆    | CEO           | FULL_ACCESS, GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, VISUALIZAR_RELATORIOS, GERENCIAR_EQUIPE, CONTROLAR_PEDIDOS, CONTROLAR_ESTOQUE, GERENCIAR_COLABORADORES, ATUALIZAR_STATUS, VISUALIZAR_MATERIAIS |
| 💼    | Diretor       | GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, VISUALIZAR_RELATORIOS |
| 🧠    | Gerente       | GERENCIAR_EQUIPE, CONTROLAR_PEDIDOS, CONTROLAR_ESTOQUE |
| 🧰    | Encarregado   | GERENCIAR_COLABORADORES, ATUALIZAR_STATUS, VISUALIZAR_MATERIAIS |
| 👷    | Colaborador   | VISUALIZAR_MATERIAIS |


**Permissões detalhadas:**
- `FULL_ACCESS`: Acesso total ao sistema.
- `GERENCIAR_DEPARTAMENTO`: Gerenciar departamentos e responsáveis.
- `APROVAR_ORCAMENTOS`: Aprovar/rejeitar orçamentos.
- `VISUALIZAR_RELATORIOS`: Acessar relatórios gerenciais.
- `GERENCIAR_EQUIPE`: Supervisionar equipes e metas.
- `CONTROLAR_PEDIDOS`: Gerenciar pedidos.
- `CONTROLAR_ESTOQUE`: Gerenciar estoque de materiais.
- `GERENCIAR_COLABORADORES`: Supervisionar colaboradores.
- `ATUALIZAR_STATUS`: Atualizar status de processos.
- `VISUALIZAR_MATERIAIS`: Consultar materiais.

> O modelo RBAC é expansível e auditável, permitindo delegação e controle granular. Toda atribuição/remoção é registrada para rastreabilidade.




```mermaid
erDiagram
  %% RBAC Avançado — Estrutura relacional
  ADMIN ||--o{ ADMINROLE : "possui"
  ROLE  ||--o{ ADMINROLE : "atribuído a"
  ROLE  ||--o{ ROLEPERMISSION : "tem"
  PERMISSAO ||--o{ ROLEPERMISSION : "concedida a"

  ADMIN {
    int id PK
    string nome
    string email
    string senha
    datetime criadoEm
    datetime ultimoAcesso
    string status
  }
  ROLE {
    int id PK
    string nome
    string descricao
  }
  PERMISSAO {
    int id PK
    string nome
    string descricao
  }
  ADMINROLE {
    int id PK
    int adminId FK
    int roleId FK
    datetime atribuidoEm
  }
  ROLEPERMISSION {
    int id PK
    int roleId FK
    int permissaoId FK
    datetime concedidoEm
  }
```


#### Exemplo de Modelagem Prisma (prático)

##### Tabela de Auditoria

```prisma
model AuditLog {
  id         Int      @id @default(autoincrement())
  userId     Int
  action     String
  entity     String
  entityId   Int?
  before     Json?
  after      Json?
  timestamp  DateTime @default(now())
}
```


```prisma
model Admin {
  id            Int           @id @default(autoincrement())
  nome          String
  email         String        @unique
  senha         String
  criadoEm      DateTime      @default(now())
  ultimoAcesso  DateTime?
  status        String
  roles         AdminRole[]
}

model Role {
  id          Int             @id @default(autoincrement())
  nome        String          @unique
  descricao   String?
  admins      AdminRole[]
  permissoes  RolePermission[]
}

model Permissao {
  id          Int             @id @default(autoincrement())
  nome        String          @unique
  descricao   String?
  roles       RolePermission[]
}

model AdminRole {
  id         Int       @id @default(autoincrement())
  admin      Admin     @relation(fields: [adminId], references: [id])
  adminId    Int
  role       Role      @relation(fields: [roleId], references: [id])
  roleId     Int
  atribuidoEm DateTime @default(now())
}

model RolePermission {
  id           Int         @id @default(autoincrement())
  role         Role        @relation(fields: [roleId], references: [id])
  roleId       Int
  permissao    Permissao   @relation(fields: [permissaoId], references: [id])
  permissaoId  Int
  concedidoEm  DateTime    @default(now())
}
```


## 4. Modelagem de Processos (Fluxo de Permissões)




```mermaid
flowchart TD
  A[Admin autenticado] --> B{Ação desejada?}
  B -- "Atribuir permissão" --> C[Seleciona colaborador]
  B -- "Remover permissão" --> C2[Seleciona colaborador]
  B -- "Nenhuma" --> Z[Fim]

  %% Fluxo de atribuição
  C --> D{Colaborador existe?}
  D -- Não --> E1[Erro: Colaborador não encontrado]
  D -- Sim --> E[Escolhe permissão/role]
  E --> F{Permissão já atribuída?}
  F -- Sim --> G1[Erro: Permissão já atribuída]
  F -- Não --> H[Atribui permissão]
  H --> I[Registra atribuição no histórico]
  I --> J[Confirmação para admin]

  %% Fluxo de remoção
  C2 --> D2{Colaborador existe?}
  D2 -- Não --> E2[Erro: Colaborador não encontrado]
  D2 -- Sim --> E3[Escolhe permissão/role]
  E3 --> F2{Permissão está atribuída?}
  F2 -- Não --> G2[Erro: Permissão não atribuída]
  F2 -- Sim --> H2[Remove permissão]
  H2 --> I2[Registra remoção no histórico]
  I2 --> J2[Confirmação de remoção]
```


**Validações e Fluxos Alternativos:**
- Colaborador inexistente: erro 404.
- Permissão já atribuída: erro 400.
- Permissão não atribuída ao remover: erro 400.
- Toda atribuição/remoção é registrada no histórico (auditoria).
- Apenas admins autenticados podem operar.


## 5. Modelagem de Telas (Wireframe simplificado)
- Listagem de administradores
- Cadastro/edição de admin
- Atribuição de permissões (dropdown de permissões, lista de colaboradores)
- Histórico de permissões


## 6. Documentação e Validação

> Este documento serve como referência viva para análise, modelagem e implementação do painel administrativo, e pode ser expandido para outros domínios do sistema conforme a evolução do projeto.

---

**Integração com Prisma:**
O modelo RBAC apresentado está pronto para ser implementado via Prisma ORM, garantindo versionamento, rastreabilidade e fácil manutenção. Consulte o exemplo prático de modelagem Prisma na documentação de apoio.


