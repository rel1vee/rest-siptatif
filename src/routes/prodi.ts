import express from "express";
import controller from "../controllers/prodi";

const router = express.Router();

router.get("/detail-prodi", controller.getAllProdi);

export = router;
