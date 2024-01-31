import asyncHandler from "../middleware/asyncHandler.js";
import Grade from "../models/gradeModel.js";

const getGrades = asyncHandler(async (req, res) => {
    const grades = await Grade.find({}).populate('user', 'name');
    res.json(grades);
});


const getGradesById=asyncHandler(async(req,res)=>{
    const grade= await Grade.findById(req.params.id);
    if(grade){
        return res.json(grade);
     }else{
         res.status(404);
         throw new Error('Grade not found');
     }
})

const createGrade = asyncHandler(async (req, res) => {
    const { user, grade, startDate} = req.body;

    const newGrade = new Grade({
        user,
        grade,
        startDate,
    });

    const createdGrade = await newGrade.save();
    res.status(201).json(createdGrade);
});

export {getGrades,getGradesById,createGrade};