import express from 'express';
import clientesRoutes from './src/routes/clientes';
import usuariosRoutes from './src/routes/usuarios';
import painelAdmRoutes from './src/routes/painelAdm';

const app = express();
app.use(express.json());

// Rotas principais
app.use('/clientes', clientesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/painel-adm', painelAdmRoutes);

export default app;
