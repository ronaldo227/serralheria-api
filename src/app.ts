import express from 'express';
import dotenv from 'dotenv';
import clientesRoutes from './routes/clientes';

// ...importar outras rotas

dotenv.config();

const app = express();
app.use(express.json());

// Rotas principais
app.use('/clientes', clientesRoutes);
// app.use('/orcamentos', orcamentosRoutes);
// app.use('/usuarios', usuariosRoutes);
// ...outras rotas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
