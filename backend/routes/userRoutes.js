import express from "express";
const router=express.Router();
import {
    getUsers,
    getUserByID,
    getUserProfile,
    createUser
} from "../controllers/userController.js";



router.route('/').get(getUsers);
router.route('/create').post(createUser);
router.get('/profile',getUserProfile);
router.get('/:id',getUserByID);


export default router;