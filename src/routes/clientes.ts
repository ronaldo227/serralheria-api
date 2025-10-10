import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';
const router = Router();

router.get('/', ClienteController.listar);
router.post('/', ClienteController.criar);
router.get('/:id', ClienteController.buscarPorId);

export default router;
