# Diagrama de Classe: Fornecedor

```mermaid
classDiagram
    class FornecedorController {
        <<Controller>>
        +listar()
        +criar(dados)
        +atualizar(id, dados)
        +remover(id)
    }
```

> Estrutura do controller Fornecedor. Adicione atributos e métodos conforme evoluir o código.