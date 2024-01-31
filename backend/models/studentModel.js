import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    career:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

const User=mongoose.model("User",studentSchema);

export default User;
