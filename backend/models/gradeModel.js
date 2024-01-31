import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    grade: { // Asumiendo que 'grade' representa la calificación del estudiante
        type: Number,
        required: true,
        min: 0,  // Puedes ajustar el mínimo según sea necesario
        max: 10 // Asume una escala de 0 a 10, ajusta según sea necesario
    },
    startDate: {
        type: Date,
        required: true
    },
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;

