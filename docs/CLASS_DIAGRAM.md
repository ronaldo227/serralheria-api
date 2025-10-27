# Class Diagram — Serralheria API

This file contains a high-level class diagram (Mermaid) with the main domain entities and services.

[old_code]
classDiagram
  %% ======================
  %% ENTIDADES
  %% ======================

  class Admin {
    -Int id
    +String nome
    +String email
    -String senha
    +DateTime criadoEm
    +DateTime ultimoAcesso
    +String status
  }

  class Role {
    +Int id
    +String nome
    +String descricao
  }

  class Permissao {
    +Int id
    +String nome
    +String descricao
  }

  class AdminRole {
    +Int id
    +Int adminId
    +Int roleId
    +DateTime atribuidoEm
  }

  class RolePermission {
    +Int id
    +Int roleId
    +Int permissaoId
    +DateTime concedidoEm
  }

  class Cliente {
    -Int id
    +String nome
    +String email
    +String telefone
    +String endereco
  }

  class Pedido {
    -Int id
    +Int clienteId
    +String status
    +DateTime criadoEm
  }

  %% ======================
  %% SERVIÇOS
  %% ======================

  class AuthService {
    +login(email: String, senha: String) : Token
    +verificarToken(token: String) : Boolean
  }

  class PedidoService {
    +listar() : List<Pedido>
    +criar(data: Pedido) : Pedido
    +buscarPorId(id: Int) : Pedido
  }

  %% ======================
  %% RELACIONAMENTOS
  %% ======================

  Admin "1" --> "0..*" AdminRole : possui
  Role "1" --> "0..*" AdminRole : atribuído_a
  Role "1" --> "0..*" RolePermission : contém
  Permissao "1" --> "0..*" RolePermission : vinculada_a
  Cliente "1" --> "0..*" Pedido : realiza

  %% ======================
  %% DEPENDÊNCIAS CONCEITUAIS
  %% ======================

  AuthService ..> Admin : autentica
  PedidoService ..> Pedido : gerencia

```

Notes:
- This is a high-level diagram intended for documentation; implementation details (relations, constraints, cascade rules) must be defined in the Prisma schema and application code.
- If you want the diagram added to `ANALISE_MODELAGEM.md` instead, I can insert the same Mermaid block under the Data Modeling section.
