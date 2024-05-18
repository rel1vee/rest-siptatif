import express from "express";
import controller from "../controllers/dosen";

const router = express.Router();

router.get("/dosen", controller.getAllDosen);
router.get("/dosen/nip/:nip", controller.getDosenByNIP);
router.get("/dosen/jenis-kelamin/:gender", controller.getDosenByGender);
router.post("/dosen", controller.postDosen);
router.put("/dosen", controller.putDosen);
router.delete("/dosen", controller.deleteDosen);

export = router;
