import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();

// Listar todos os admins
router.get('/', adminController.listarAdmins);

// Criar novo admin
router.post('/', adminController.criarAdmin);

// Editar admin
router.put('/:id', adminController.editarAdmin);

// Remover admin
router.delete('/:id', adminController.removerAdmin);

export default router;
