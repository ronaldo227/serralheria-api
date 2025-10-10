import { Cliente } from '../models/Cliente';

// Mock temporário (substituir por integração com banco de dados)
const clientes: Cliente[] = [];

const ClienteRepository = {
  async listar(): Promise<Cliente[]> {
    return clientes;
  },
  async criar(data: Partial<Cliente>): Promise<Cliente> {
    const novo: Cliente = { id: clientes.length + 1, ...data } as Cliente;
    clientes.push(novo);
    return novo;
  },
  async buscarPorId(id: number): Promise<Cliente | null> {
    return clientes.find(c => c.id === id) || null;
  }
};

export default ClienteRepository;
