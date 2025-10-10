import { Router } from 'express';
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

// Exemplo de rota protegida
router.get("/", authMiddleware, (req, res) => {
	res.json({ msg: "Acesso autorizado para usuários", user: (req as any).user });
});

export default router;
