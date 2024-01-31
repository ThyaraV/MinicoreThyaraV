import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/studentModel.js';

//@desc Get users
//@route GET/api/users
//@access Private/Admin
const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({});
    res.status(200).json(users);
});

//@desc Get user
//@route GET/api/user/:id
//@access Private/Admin
const getUserByID=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

const createUser=asyncHandler(async(req,res)=>{
    const{name,career}=req.body; 
    const user=new User({
        name: name,
        career:career,
    });
    if(user){
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    }else{
        res.status(400);
        throw new Error('Datos del usuario inválidos')
    }
});

export {getUsers,getUserByID,getUserProfile,createUser}
