import e, { Router } from "express";
import { saveTodo } from "../controllers/opartion.controller.js";

const router =Router()

router.route("/create").post(saveTodo)

export default router;