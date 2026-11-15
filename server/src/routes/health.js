import { Router } from 'express';
const router = Router();// GET /api/health — anyone can call it. Render wakes the API with this before a demo.
router.get('/', (req, res) => { 
    res.json({ ok: true });
});
export default router;