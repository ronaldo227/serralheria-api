# Diagrama de Classe: Usuario

```mermaid
classDiagram
    class UsuarioController {
        <<Controller>>
        +login(email, senha)
        +logout()
        +registrar(dados)
    }
```

> Estrutura do controller Usuario. Adicione atributos e métodos conforme evoluir o código.