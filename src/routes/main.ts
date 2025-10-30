
import { Router } from 'express';
import * as authController from '../controllers/auth';
import adminsRouter from './admins';

export const mainRouter = Router();

mainRouter.post('/auth/signup', authController.signup);
mainRouter.use('/admins', adminsRouter);

