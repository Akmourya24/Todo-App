import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:5,

    },
    completed:{
        type:Boolean,
        default:false,

    },
    data:{
        type:Date,
        default:Date.now,

    },
    category:{
        type:String,
        enum:["future goal","work","personal","other"],
        default:"future goal",
    }

},
 {
        timestamps:true,
    })

    export const Todo = mongoose.model("Todo",todoSchema);