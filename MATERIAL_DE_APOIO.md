# Material de Apoio: Ciclo de Desenvolvimento com Prisma

## Passos para o Primeiro Ciclo (MVP ou Funcionalidade Inicial)

### 1. Escolha do Domínio ou Funcionalidade Prioritária
- Exemplo: cadastro de clientes, pedidos, etc.
- Escreva as regras de negócio e requisitos desse ciclo.

### 2. Configure o Prisma
- Execute `npx prisma init` para criar a pasta `prisma/` e o arquivo `schema.prisma`.
- Configure a conexão do banco de dados no arquivo `.env`.

### 3. Defina o Modelo Cliente no Prisma
Exemplo de model para adicionar em `prisma/schema.prisma`:

```prisma
model Cliente {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  telefone  String?
  criadoEm  DateTime @default(now())
}
```

### 4. Rode a Migração

> **Atenção:** Este material está em análise e pode ser mudado ou melhorado conforme o projeto evoluir.

- Execute `npx prisma migrate dev --name init` para criar as tabelas no banco.
- O comando também gera o Prisma Client.

### 5. Implemente o Repository usando Prisma Client
Exemplo de uso em `src/repositories/ClienteRepository.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async listar() {
    return prisma.cliente.findMany();
  },
  async criar(data: any) {
    return prisma.cliente.create({ data });
  },
  async buscarPorId(id: number) {
    return prisma.cliente.findUnique({ where: { id } });
  },
  // Adicione métodos para update e delete conforme necessário
};
```

### 6. Implemente o Service
- No service, coloque as regras de negócio e chame o repository.

### 7. Implemente o Controller
- No controller, conecte as rotas ao service, validando e respondendo às requisições.

### 8. Implemente as Rotas
- Adicione as rotas REST em `src/routes/clientes.ts` para expor as operações do domínio.

### 9. Teste Localmente
- Use ferramentas como Postman ou Insomnia para testar os endpoints.
- Exemplo de modelo de teste para o endpoint de clientes:

| Método | Endpoint           | Descrição                | Exemplo de Body/Query         |
|--------|--------------------|--------------------------|-------------------------------|
| GET    | /clientes          | Listar todos os clientes | -                             |
| GET    | /clientes/:id      | Buscar cliente por ID    | -                             |
| POST   | /clientes          | Criar novo cliente       | `{ "nome": "João", "email": "joao@email.com", "telefone": "11999999999" }` |
| PUT    | /clientes/:id      | Atualizar cliente        | `{ "nome": "João Silva" }`  |
| DELETE | /clientes/:id      | Remover cliente          | -                             |

- Teste cada endpoint com dados reais e verifique as respostas e validações.

### 10. Documente e Registre o Ciclo
- Atualize o README e registre o que foi entregue no ciclo.

---

## Dicas e Boas Práticas
- Sempre rode `npx prisma generate` após alterar o schema.
- Use migrations para versionar o banco de dados.
- Valide dados no service antes de salvar no banco.
- Separe bem as responsabilidades: model, repository, service, controller e rotas.
- Utilize variáveis de ambiente para dados sensíveis (ex: conexão do banco).
- Documente endpoints e regras de negócio no README ou em um arquivo de apoio.
- Faça commits frequentes e claros a cada ciclo ou funcionalidade.

---

## Fluxo Sugerido para Cliente
1. Defina o modelo no Prisma.
2. Rode a migração e gere o client.
3. Implemente o repository usando Prisma Client.
4. Implemente o service com as regras de negócio.
5. Implemente o controller.
6. Implemente as rotas.
7. Teste e documente.
