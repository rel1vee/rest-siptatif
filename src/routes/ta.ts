import express from 'express';
import controller from '../controllers/ta';
import authenticateJWT from "../middleware";

const router = express.Router();

router.get('/ta', authenticateJWT, controller.getAllTA);
router.get('/ta/id/:id', authenticateJWT, controller.getTAById);
router.get('/ta/nim/:nim', authenticateJWT, controller.getTAByNIM);
router.get('/ta/kategori/:category', authenticateJWT, controller.getTAByCategory);
router.get('/ta/status/:status', authenticateJWT, controller.getTAByStatus);
router.post('/ta', authenticateJWT, controller.postTA);
router.put('/ta', authenticateJWT, controller.putTA);
router.delete('/ta/', authenticateJWT, controller.deleteTA);

export = router;