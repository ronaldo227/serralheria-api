import { Request, Response } from 'express';
import ClienteService from '../services/ClienteService';

const ClienteController = {
  async listar(req: Request, res: Response) {
    const clientes = await ClienteService.listar();
    res.json(clientes);
  },
  async criar(req: Request, res: Response) {
    const cliente = await ClienteService.criar(req.body);
    res.status(201).json(cliente);
  },
  async buscarPorId(req: Request, res: Response) {
    const cliente = await ClienteService.buscarPorId(Number(req.params.id));
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
  }
};

export default ClienteController;
