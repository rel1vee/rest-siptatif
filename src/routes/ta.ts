import express from 'express';
import controller from '../controllers/ta';

const router = express.Router();

router.get('/detail-ta', controller.getAllTA);

export = router;