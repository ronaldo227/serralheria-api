import { Request, Response } from 'express';

// Permissões do CEO (exemplo)
const CEO_PERMISSIONS = [
  'FULL_ACCESS',
  'GERENCIAR_DEPARTAMENTO',
  'APROVAR_ORCAMENTOS',
  'VISUALIZAR_RELATORIOS',
  'GERENCIAR_EQUIPE',
  'CONTROLAR_PEDIDOS',
  'CONTROLAR_ESTOQUE',
  'GERENCIAR_COLABORADORES',
  'ATUALIZAR_STATUS',
  'VISUALIZAR_MATERIAIS'
];

// Mock: lista de admins
const admins = [
  {
    id: 1,
    nome: 'CEO',
    email: 'ceo@empresa.com',
    permissoes: CEO_PERMISSIONS
  }
];

export const listarAdmins = (req: Request, res: Response) => {
  res.json(admins);
};

export const criarAdmin = (req: Request, res: Response) => {
  const { nome, email } = req.body;
  const novoAdmin = {
    id: admins.length + 1,
    nome,
    email,
    permissoes: CEO_PERMISSIONS // padrão CEO para exemplo
  };
  admins.push(novoAdmin);
  res.status(201).json(novoAdmin);
};

export const removerAdmin = (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = admins.findIndex(a => a.id === Number(id));
  if (idx === -1) return res.status(404).json({ error: 'Admin não encontrado.' });
  admins.splice(idx, 1);
  res.status(204).send();
};

export const editarAdmin = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const admin = admins.find(a => a.id === Number(id));
  if (!admin) return res.status(404).json({ error: 'Admin não encontrado.' });
  admin.nome = nome || admin.nome;
  admin.email = email || admin.email;
  res.json(admin);
};
