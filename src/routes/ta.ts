import express from 'express';
import controller from '../controllers/ta';

const router = express.Router();

router.get('/ta', controller.getAllTA);
router.get('/ta/id/:id', controller.getTAById);
router.get('/ta/nim/:nim', controller.getTAByNIM);
router.get('/ta/kategori/:category', controller.getTAByCategory);
router.get('/ta/status/:status', controller.getTAByStatus);
router.post('/ta', controller.postTA);
router.put('/ta', controller.putTA);
router.delete('/ta/', controller.deleteTA);

export = router;