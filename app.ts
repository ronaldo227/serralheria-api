import express from 'express';
//mport clientesRoutes from './src/routes/clientes';
//import usuariosRoutes from './src/routes/usuarios';
//mport painelAdmRoutes from './src/routes/painelAdm';

const app = express();
app.use(express.json());

// Rotas principais
//app.use('/clientes', clientesRoutes);
//app.use('/usuarios', usuariosRoutes);
//app.use('/painel-adm', painelAdmRoutes);

export default app;
