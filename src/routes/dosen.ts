import express from "express";
import controller from "../controllers/dosen";
import authenticateJWT from "../middleware";

const router = express.Router();

router.get("/dosen", authenticateJWT, controller.getAllDosen);
router.get("/dosen/nip/:nip", authenticateJWT, controller.getDosenByNIP);
router.get("/dosen/jenis-kelamin/:gender", authenticateJWT, controller.getDosenByGender);
router.post("/dosen", authenticateJWT, controller.postDosen);
router.put("/dosen", authenticateJWT, controller.putDosen);
router.delete("/dosen", authenticateJWT, controller.deleteDosen);

export = router;
