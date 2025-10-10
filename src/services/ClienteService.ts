import ClienteRepository from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';

const ClienteService = {
  async listar(): Promise<Cliente[]> {
    return ClienteRepository.listar();
  },
  async criar(data: Partial<Cliente>): Promise<Cliente> {
    return ClienteRepository.criar(data);
  },
  async buscarPorId(id: number): Promise<Cliente | null> {
    return ClienteRepository.buscarPorId(id);
  }
};

export default ClienteService;
