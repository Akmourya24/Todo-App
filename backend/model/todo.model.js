import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
        trim:true,
        minLength:5,

    },
    completed:{
        type:Boolean,
        default:false,

    },
    Date:{
        type:Date,
        default:Date.now,

    },
    category:{
        type:String,
        enum:["Future Goal","Education","Finance","Relationship","Work","Health","Travel","Social Life","Other"],
        default:"Future Goal",
    }

},
 {
        timestamps:true,
    })

    export const Todo = mongoose.model("Todo",todoSchema);