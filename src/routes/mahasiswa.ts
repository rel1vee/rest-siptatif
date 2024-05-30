import express from "express";
import controller from "../controllers/mahasiswa";
import authenticateJWT from "../middleware";

const router = express.Router();

router.get("/mahasiswa", authenticateJWT, controller.getAllMahasiswa);
router.get("/mahasiswa/nim/:nim", authenticateJWT, controller.getMahasiswaByNIM);
router.get("/mahasiswa/jenis-kelamin/:gender", authenticateJWT, controller.getMahasiswaByGender);
router.post("/mahasiswa", authenticateJWT, controller.postMahasiswa);
router.put("/mahasiswa", authenticateJWT, controller.putMahasiswa);
router.delete("/mahasiswa", authenticateJWT, controller.deleteMahasiswa);

export = router;
