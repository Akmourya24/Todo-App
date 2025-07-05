import mongoose from "mongoose";


const DB_Name = process.env.DB_NAME;

const connectDB = async () => {
    try {
        const connectionDatabase = await mongoose.connect(`${process.env.MONGO_URI}`, {
            dbName: DB_Name,
        });
        console.log(`MongoDB connected successfully: ${connectionDatabase.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure

    }
}

export default connectDB;