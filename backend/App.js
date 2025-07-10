import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));

// ✅ This route should respond correctly
app.get('/check-cors', (req, res) => {
  res.send("CORS works!");
});

// Your route setup
import userRouter from "./routes/opartion.routes.js";
app.use("/api/todo", userRouter);

export { app };
