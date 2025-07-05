import {app} from './App.js';
import connectDB from './db/index.js';
import dotenv from "dotenv";
dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port", process.env.PORT);
        })
    })
    .catch(Error)
console.error("database conncetion failed")

