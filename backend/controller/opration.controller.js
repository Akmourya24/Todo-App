import { Todo } from "../model/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";


const saveTodo = asyncHandler(async (req, res) => {
    const { task, Date, category, completed } = req.body;
    console.log("Received data:", req.body);

    if (!task || task.trim() === "") {
        return res.status(400).json({ message: "Todo name is required" });
    }

    const existingTodo = await Todo.findOne({ task }); // simpler check

    if (existingTodo) {
        return res.status(409).json({ message: "Todo already exists" });
    }

    const todo = await Todo.create({
        task,
        Date,
        category,
        completed
    });

    const createdTodo = await Todo.findById(todo._id).select("-__v -createdAt -updatedAt");

    if (!createdTodo) {
        return res.status(404).json({ message: "Todo not created" });
    } else {
        return res.status(201).json({
            message: "Todo created successfully",
            todo: createdTodo  // ✅ important!
        });
    }
});

const updateTodo = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { task, category } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Todo ID is required" });
    }
    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    existingTodo.task = task;
    existingTodo.category = category;


    await existingTodo.save();

    const updatedTodo = await Todo.findById(existingTodo._id).select("-__v -createdAt -updatedAt");
    if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not updated" });
    } else {
        return res.status(200).json({
            message: "Todo updated successfully",
        })
    }
})

const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().select("-__v -createdAt -updatedAt");
   if (!todos || todos.length ===0){
    return res.status(404).json({message:"No todos found"});
   }
   return res.status(200).json({
       message: "Todos retrieved successfully",
       todos
   });
});

export {
    saveTodo,
    updateTodo,
    getAllTodos 
};