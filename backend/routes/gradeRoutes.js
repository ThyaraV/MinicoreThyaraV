import express from "express";
const router=express.Router();
import { getGrades,getGradesById,createGrade } from "../controllers/gradeController.js";

router.route('/').get(getGrades).post(createGrade);;
router.route('/:id').get(getGradesById);

export default router;