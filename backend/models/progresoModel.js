import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    peso: { 
        type: Number,
        required: true,
    },
});

const Progreso = mongoose.model("Progreso", progresoSchema);

export default Progreso;