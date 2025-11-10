# Diagrama de Classe: Admin (CEO)

```mermaid
classDiagram
    class Admin {
        +int id
        +string nome
        +string email
        +string senha
        +Date criadoEm
        +Date ultimoAcesso
        +boolean ativo
        +listarAdmins() Admin[]
        +criarAdmin(dados) Admin
        +atualizarAdmin(id, dados) Admin
        +removerAdmin(id) boolean
        +atribuirPermissoes(adminId, permissoes) boolean
        +revogarPermissoes(adminId, permissoes) boolean
    }
    class Role {
        +int id
        +string nome
        +string descricao
        +int nivelHierarquico
        +criarRole(dados) Role
        +atualizarRole(id, dados) Role
        +listarRoles() Role[]
    }
    class Permissao {
        +int id
        +string codigo
        +string descricao
        +string modulo
        +criarPermissao(dados) Permissao
        +listarPermissoes() Permissao[]
    }
    class AdminRole {
        +int adminId
        +int roleId
        +Date atribuidoEm
        +int atribuidoPor
    }
    class RolePermissao {
        +int roleId
        +int permissaoId
    }
    class HistoricoPermissoes {
        +int id
        +int adminId
        +string acao
        +string detalhes
        +Date dataHora
        +int executadoPor
    }
    Admin "1" --> "*" AdminRole : possui
    Role "1" --> "*" AdminRole : atribuido
    Role "1" --> "*" RolePermissao : contem
    Permissao "1" --> "*" RolePermissao : incluida
    Admin "1" --> "*" HistoricoPermissoes : registra
    
    note for Admin "Representa usuários administrativos do sistema com diferentes níveis de acesso"
    note for Role "Define papéis: CEO, Diretor, Gerente, Encarregado"
    note for Permissao "Granularidade de acesso: FULL_ACCESS, GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, etc"
```

> Diagrama completo da estrutura RBAC (Role-Based Access Control) do painel administrativo, incluindo relacionamentos entre Admin, Roles, Permissões e histórico de alterações.
