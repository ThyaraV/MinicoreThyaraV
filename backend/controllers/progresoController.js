import asyncHandler from "../middleware/asyncHandler.js";
import Progreso from "../models/progresoModel.js";
import Grade from "../models/gradeModel.js";
import User from "../models/studentModel.js";

const getProgreso=asyncHandler(async(req,res)=>{
    const progresos=await Progreso.find({}).populate('user', 'name');;
    res.json(progresos);
});

const createProgreso = asyncHandler(async (req, res) => {
    const { name, startDate, endDate, peso } = req.body;

    const newProgreso = new Progreso({
        name,
        startDate,
        endDate,
        peso
    });

    const createdProgreso = await newProgreso.save();
    res.status(201).json(createdProgreso);
});

const calculateWeightedProgress = asyncHandler(async (req, res) => {
    // Obtener todos los progresos
    const progresos = await Progreso.find({});

    // Preparar un array para guardar los resultados
    let userProgress = [];

    // Para cada progreso, encuentra las calificaciones correspondientes y calcula
    for (const progreso of progresos) {
        const gradesInRange = await Grade.find({
            startDate: { $gte: progreso.startDate,
                $lte: progreso.endDate },
        }).populate('user', 'name');

        // Calcular el promedio para cada usuario
        let userAverages = {};
        gradesInRange.forEach(grade => {
            if (!userAverages[grade.user._id]) {
                userAverages[grade.user._id] = {
                    name: grade.user.name,
                    total: 0,
                    count: 0,
                    weightedAverage: 0
                };
            }
            userAverages[grade.user._id].total += grade.grade;
            userAverages[grade.user._id].count += 1;
        });

        // Calcular el promedio ponderado para cada usuario
        for (const userId in userAverages) {
            const user = userAverages[userId];
            user.weightedAverage = (user.total / user.count) * progreso.peso;
            userProgress.push({
                name: user.name,
                [`Progreso ${progreso.name}`]: user.weightedAverage
            });
        }
    }

    res.json(userProgress);
});


export {getProgreso,createProgreso,calculateWeightedProgress}