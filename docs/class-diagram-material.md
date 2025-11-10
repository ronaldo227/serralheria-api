# Diagrama de Classe: Material

```mermaid
classDiagram
    class MaterialController {
        <<Controller>>
        +listar()
        +criar(dados)
        +atualizar(id, dados)
        +remover(id)
    }
```

> Estrutura do controller Material. Adicione atributos e métodos conforme evoluir o código.