import express from "express";
import controller from "../controllers/dosen";

const router = express.Router();

router.get("/detail-dosen", controller.getAllDosen);

export = router;
