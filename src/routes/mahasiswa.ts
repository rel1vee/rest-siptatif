import express from 'express';
import controller from '../controllers/mahasiswa';

const router = express.Router();

router.get('/detail-mahasiswa', controller.getAllMahasiswa);

export = router;