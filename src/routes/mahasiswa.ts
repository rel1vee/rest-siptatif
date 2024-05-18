import express from "express";
import controller from "../controllers/mahasiswa";

const router = express.Router();

router.get("/mahasiswa", controller.getAllMahasiswa);
router.get("/mahasiswa/nim/:nim", controller.getMahasiswaByNIM);
router.get("/mahasiswa/jenis-kelamin/:gender", controller.getMahasiswaByGender);
router.post("/mahasiswa", controller.postMahasiswa);
router.put("/mahasiswa", controller.putMahasiswa);
router.delete("/mahasiswa", controller.deleteMahasiswa);

export = router;
