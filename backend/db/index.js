import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_Name = process.env.DB_NAME;

const connectDB =async ()=> {
    try {
        const connectionDatabase = await mongoose.connect(`${process.env.MONGO_URI}`, {  dbName: DB_Name,
        });
        console.log(`MongoDB connected: ${connectionDatabase.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
        
    }
}

export default connectDB;