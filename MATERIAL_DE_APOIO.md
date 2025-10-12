# Análise e Modelagem de Sistemas

> O projeto adota práticas profissionais de análise e modelagem de sistemas para garantir clareza, rastreabilidade e evolução contínua. Consulte o arquivo `ANALISE_MODELAGEM.md` para requisitos, casos de uso, modelagem de dados, fluxos e wireframes do painel admin e demais domínios.

---
## Observação sobre Escalabilidade

> O sistema foi planejado para ser modular e escalável. Caso a demanda cresça, está prevista a migração para arquitetura de microsserviços, facilitando manutenção, evolução e implantação contínua.

---
# Apoio Prático: Painel Administrativo e Permissões

## Checklist para o Ciclo do Painel Admin
- [ ] Definir requisitos do painel (ex: cadastro de admins, atribuição de permissões)
- [ ] Modelar entidades: Admin, Colaborador, Permissão
- [ ] Criar migrations/models no Prisma
- [ ] Implementar rotas base no painel (`src/routes/painelAdm.ts`)
- [ ] Criar controllers e services para admins e permissões
- [ ] Planejar níveis de acesso (ex: admin, gerente, colaborador)

- [ ] Documentar fluxo de permissões e exemplos de uso

### Níveis do Painel Administrativo

| Nível         | Descrição                                                                 | Escopo / Permissões Típicas                                      |
|--------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| 🏆 CEO        | Controle total do sistema. Define políticas, acessos e aprovações globais. | Acesso a todos os módulos e permissões (FULL_ACCESS)              |
| 💼 Diretor    | Supervisiona departamentos (Financeiro, Produção, Comercial). Pode criar gerentes e revisar relatórios. | GERENCIAR_DEPARTAMENTO, APROVAR_ORCAMENTOS, VISUALIZAR_RELATORIOS |
| 🧠 Gerente    | Coordena operações do setor e supervisiona equipes.                        | GERENCIAR_EQUIPE, CONTROLAR_PEDIDOS, CONTROLAR_ESTOQUE            |
| 🧰 Encarregado| Supervisiona execução de tarefas e controle de materiais.                  | GERENCIAR_COLABORADORES, ATUALIZAR_STATUS, VISUALIZAR_MATERIAIS   |
| 👷 Colaborador| Executa tarefas operacionais com acesso restrito ao seu escopo.            | -                                                                 |

## Exemplo de Modelagem de Permissões (Prisma)
```prisma
model Admin {
  id       Int      @id @default(autoincrement())
  nome     String
  email    String   @unique
  senha    String
  roles    AdminRole[]
}

model Role {
  id          Int           @id @default(autoincrement())
  nome        String        @unique
  permissions RolePermission[]
  admins      AdminRole[]
}

model Permission {
  id    Int    @id @default(autoincrement())
  nome  String @unique
  roles RolePermission[]
}

model RolePermission {
  id           Int         @id @default(autoincrement())
  roleId       Int
  permissionId Int
  role         Role        @relation(fields: [roleId], references: [id])
  permission   Permission  @relation(fields: [permissionId], references: [id])
}

model AdminRole {
  id      Int   @id @default(autoincrement())
  adminId Int
  roleId  Int
  admin   Admin @relation(fields: [adminId], references: [id])
  role    Role  @relation(fields: [roleId], references: [id])
}
## Roteiro Prático para o Painel Admin
1. **Planeje as regras de negócio:**
  - Quem pode criar/editar permissões?
  - Quais ações cada permissão libera?
2. **Implemente as migrations:**
  - Use o exemplo acima para criar as tabelas.
3. **Implemente os endpoints:**
  - Cadastro de admin, login, atribuição de permissões.
4. **Proteja as rotas:**
  - Use middlewares para garantir que só admins autorizados acessem o painel.
5. **Teste o fluxo:**
  - Simule diferentes níveis de acesso e revise a segurança.

> Dica: Documente exemplos de uso e fluxos de permissão para facilitar a manutenção e onboarding de novos colaboradores.
# Material de Apoio: Ciclo de Desenvolvimento com Prisma

## Passos para o Primeiro Ciclo (MVP ou Funcionalidade Inicial)
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

- O comando também gera o Prisma Client.

Exemplo de uso em `src/repositories/ClienteRepository.ts`:

import { PrismaClient } from '@prisma/client';


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
No service:
- Implemente as regras de negócio (validações, cálculos, lógica de autorização, etc.).
- Realize validações de dados antes de chamar o repository.
- Centralize o tratamento de exceções e mensagens de erro.
- Chame o repository apenas após garantir que os dados estão corretos.
- Retorne objetos claros e padronizados para o controller.

### 7. Implemente o Controller
No controller:
- Receba e valide os dados das requisições (body, params, query).
- Chame os métodos do service para executar as operações de negócio.
- Trate erros e envie respostas HTTP padronizadas (status, mensagens, payload).
- Nunca implemente lógica de negócio no controller, apenas orquestre as chamadas.

### 8. Implemente as Rotas
Nas rotas:
- Defina endpoints RESTful claros e semânticos.
- Utilize middlewares para autenticação, autorização e validação de dados.
- Mantenha as rotas organizadas por domínio (ex: clientes, painel admin, pedidos).
- Documente cada rota com exemplos de request/response.

Use ferramentas como Postman ou Insomnia para testar todos os endpoints, incluindo o painel administrativo.
> **Atenção:** Os exemplos de endpoints e fluxos de teste podem ser mudados ou melhorados em outros ciclos, conforme o projeto evoluir.


#### Exemplo de modelo de teste para o Painel Admin (Administradores)

| Método | Endpoint     | Descrição                       | Exemplo de Body/Query                                                                 |
|:-------|:-------------|:---------------------------------|:--------------------------------------------------------------------------------------|
| GET    | /admins      | Listar todos os administradores  | Query: `?page=1&limit=10`<br>Resposta: `200 OK`, array de admins                     |
| GET    | /admins/:id  | Buscar admin por ID              | Parâmetro: `id` na URL<br>Resposta: `200 OK`, admin ou `404 Not Found`            |
| POST   | /admins      | Criar novo admin                 | Body: `{ "nome": "Maria Admin", "email": "maria@email.com", "senha": "segura123" }`<br>Resposta: `201 Created`, admin criado |
| PUT    | /admins/:id  | Atualizar admin                  | Body: `{ "nome": "Maria Silva" }`<br>Resposta: `200 OK`, admin atualizado                |
| DELETE | /admins/:id  | Remover admin                    | Parâmetro: `id` na URL<br>Resposta: `204 No Content`                              |

- Teste cada endpoint com dados reais, diferentes níveis de permissão e verifique as respostas, validações e restrições de acesso.

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
