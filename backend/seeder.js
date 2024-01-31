import mongoose from "mongoose";
import colors from 'colors';
import dotenv from 'dotenv';
import users from './data/student.js';
import grades from './data/grade.js';
import User from "./models/studentModel.js";
import Grade from "./models/gradeModel.js";
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData=async()=>{
    try{

        await Grade.deleteMany();
        await User.deleteMany();

        const createdUsers=await User.insertMany(users);
        
        const adminUser=createdUsers[0]._id;

        const sampleGrades=grades.map((grade)=>{
            return{...grade, user: adminUser};
        })

        await Grade.insertMany(sampleGrades);
        console.log('Data Imported'.green.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);        
    }
}

const destroyData=async()=>{
    try{
        
        await Grade.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.green.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1); 
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}