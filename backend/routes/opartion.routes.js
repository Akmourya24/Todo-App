import  { Router } from "express";
import { saveTodo,
    updateTodo,
    getAllTodos
 } from "../controller/opration.controller.js";

const router = Router();

router.route("/create").post(saveTodo);
router.route("/update").put(updateTodo);
router.route("/getAll").get(getAllTodos);

export default router;