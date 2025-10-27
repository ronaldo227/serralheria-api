# Serralheria API

**AVISO DE USO RESTRITO:**
Este projeto está em desenvolvimento. O uso, cópia, modificação ou distribuição é permitido apenas para fins de estudo e análise. Para qualquer outro uso, entre em contato com o proprietário.

> **Nota:** Baixar o código de um repositório público é tecnicamente possível. Enquanto o projeto está em desenvolvimento, o uso é permitido apenas para fins de estudo e análise. Para uso comercial ou distribuição, é necessária autorização expressa do autor.

Sistema completo para gestão de serralherias, desenvolvido em Node.js com TypeScript e Express, seguindo boas práticas de arquitetura modular.

## Como Executar


# Serralheria API

<p align="center">
  <b>API profissional para gestão de serralherias</b><br>
  <i>Node.js • TypeScript • Express</i>
</p>

---

## ⚠️ AVISO DE USO RESTRITO
Este projeto é proprietário. O uso, cópia, modificação ou distribuição só é permitido mediante autorização expressa do autor. Para obter permissão, entre em contato com o proprietário.

> **Nota:** Baixar o código de um repositório público é tecnicamente possível, mas qualquer uso comercial, modificação ou distribuição sem permissão é proibido e sujeito a providências legais.



## 📑 Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Domínios](#domínios)
- [Exemplo de Uso](#exemplo-de-uso)
- [Tecnologias](#tecnologias)
- [Contato](#contato)



## Sobre o Projeto
Sistema completo para gestão de serralherias, desenvolvido em Node.js com TypeScript e Express, seguindo boas práticas de arquitetura modular e segurança.

---

## Como Executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute em modo desenvolvimento:
   ```bash
   npm run dev
   ```
3. Para build e produção:
   ```bash
   npm run build
   npm start
   ```

---

## Estrutura do Projeto
```text
serralheria-api/
├── src/
   
│   ├── controllers/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   ├── middlewares/
│   ├── utils/
│   └── config/
├── package.json
├── tsconfig.json
└── README.md
```

---


## Domínios
- Painel Administrativo: Gestão de permissões, colaboradores e configurações do sistema.
- Clientes: Gerenciamento de informações dos clientes.
- Orçamentos: Controle e emissão de orçamentos personalizados.
- Pedidos: Gestão dos pedidos realizados.
- Fornecedores: Cadastro e controle de fornecedores.
- Materiais: Gerenciamento de materiais utilizados na produção.
- Estoque: Controle de estoque de materiais e produtos.
- Financeiro: Gestão financeira, contas a pagar e receber.
- Cálculos: Sistema de cálculo de materiais, custos e medidas para projetos.
- Agenda: Controle de compromissos, agendamentos e prazos.
- Documentos: Armazenamento e organização de documentos.
- Relatórios: Geração de relatórios gerenciais e operacionais.
- Usuários: Gerenciamento de usuários do sistema.
- Permissões: Controle de acesso e permissões dos usuários.

---

## Ciclos Evolutivos
O projeto segue ciclos evolutivos documentados em [`CICLOS_EVOLUCIONARIOS.md`](./CICLOS_EVOLUCIONARIOS.md).

---

## Gestão Ágil e Kanban
Utilize o quadro Kanban para acompanhar o progresso das tarefas. Veja sugestões e exemplos em [`FLUXO_SCRUM_KANBAN.md`](./FLUXO_SCRUM_KANBAN.md).

---


## Segurança e Middleware

Para garantir segurança e integração com frontends, utilize os seguintes middlewares no Express:

### CORS
Permite requisições de outros domínios (Cross-Origin Resource Sharing).

Instalação:
```bash
npm install cors
```
Uso básico:
```typescript
import cors from 'cors';
app.use(cors());
```
Configuração de origem específica:
```typescript
app.use(cors({ origin: 'http://seu-frontend.com' }));
```

### Helmet
Adiciona headers HTTP para proteger contra vulnerabilidades comuns.

Instalação:
```bash
npm install helmet
```
Uso:
```typescript
import helmet from 'helmet';
app.use(helmet());
```

---

## Roadmap
- [x] Estrutura base do projeto
- [x] Documentação inicial
- [ ] Painel administrativo (em andamento)
- [ ] Permissões e controle de acesso
- [ ] Domínios operacionais (clientes, pedidos, etc)
- [ ] Testes automatizados
- [ ] Deploy e monitoramento

---

## Licença
Consulte [`LICENSE.txt`](./LICENSE.txt) e [`LICENCA_ANALISE.txt`](./LICENCA_ANALISE.txt) para detalhes sobre uso e restrições.

---

## Exemplo de Uso
Requisição para cadastrar um cliente:

```http
POST /clientes
Content-Type: application/json

{
  "nome": "João da Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999"
}
```

---


---


## Contato


Para solicitações de uso, dúvidas ou propostas profissionais:

- 📧 Email: seuemail@exemplo.com
- 💼 LinkedIn:
- 📱 WhatsApp: (11) 98321-1422

<!--
Ou, se preferir, preencha o formulário de solicitação de uso:
👉 [Solicitar Permissão de Uso](https://forms.gle/seu-formulario)
-->

---

