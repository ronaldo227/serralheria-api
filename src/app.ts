
import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routes/main';


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(urlencoded({ extended: true }));
app.use(express.json());


// Main routes



app.use(mainRouter);


export default app;
