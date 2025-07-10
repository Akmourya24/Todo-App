import { app } from './App.js';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './db/index.js';

dotenv.config({ path: "./.env" });

// ✅ CORS middleware MUST be before routes
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Preflight for OPTIONS
// app.options('*', cors());

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", process.env.PORT || 3000);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});
