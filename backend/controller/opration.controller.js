import { Todo } from "../model/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";


const saveTodo = asyncHandler(async (req, res) => {

    const { name, date, category, completed } = req.body;

    if (!name) {

        return res.status(400).json({ message: "Todo name is required" });
    }
    const existingTodo = await Todo.findOne(
        {
            $or: [{ name }, { category }]
        }
    );

    if (existingTodo) {
        return res.status(409).json({ message: "Todo already exists" });
    }

    const todo = await Todo.create({
        name,
        date,
        category,
        completed
    })
    const createdTodo = await Todo.findById(todo._id).select("-__v -createdAt -updatedAt");

    if (!createdTodo) {
        return res.status(404).json({ message: "Todo not created" });

    } 
    else {
        return res.status(201).json({
            message: "Todo created successfully",
        });
    }
})

export { saveTodo };