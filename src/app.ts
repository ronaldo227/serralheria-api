import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';

//import clientesRoutes from './src/routes/clientes';
//import usuariosRoutes from './src/routes/usuarios';
//mport painelAdmRoutes from './src/routes/painelAdm';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(urlencoded({ extended: true }));
app.use(express.json());




// Main routes
//app.use('/clientes', clientesRoutes);
//app.use('/usuarios', usuariosRoutes);
//app.use('/painel-adm', painelAdmRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

//export default app;
