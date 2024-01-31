import express from "express";
const router=express.Router();
import { getProgreso,createProgreso,calculateWeightedProgress } from "../controllers/progresoController.js";

router.route('/').get(getProgreso).post(createProgreso);
router.route('/calculo').get(calculateWeightedProgress);

export default router;