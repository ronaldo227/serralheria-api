import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
//mport clientesRoutes from './src/routes/clientes';
//import usuariosRoutes from './src/routes/usuarios';
//mport painelAdmRoutes from './src/routes/painelAdm';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rotas principais
//app.use('/clientes', clientesRoutes);
//app.use('/usuarios', usuariosRoutes);
//app.use('/painel-adm', painelAdmRoutes);

export default app;
