import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import grades from './data/grade.js';
import users from './data/student.js';

import gradeRoutes from './routes/gradeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import progresoRoutes from './routes/progresoRoutes.js';

import { notFound,errorHandler } from './middleware/errorMiddleware.js';


const port=process.env.PORT ||5000;

connectDB();

const app=express();

app.use(express.json());


app.use('/api/grades',gradeRoutes);
app.use('/api/users',userRoutes);
app.use('/api/progresos',progresoRoutes);

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/',(req,res)=>
    res.end('API is running....'));
}

app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>console.log(`Server running on port ${port}`));