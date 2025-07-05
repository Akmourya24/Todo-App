import express from "express";
import cors from "cors";


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

import  userRouter from "express";
app.use("/api/todo", userRouter);

export { app };