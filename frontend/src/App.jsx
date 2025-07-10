import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Task from './components/Task';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const FilterComponent = ({ setCategory, category }) => {
    return (
        <div className="p-4 mt-3 rounded-lg shadow-md bg-white flex justify-between items-center">
            <select
                className="p-2 text-lg border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-purple-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Future Goal">Future Goal</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Relationship">Relationship</option>
                <option value="Social Life">Work</option>
                <option value="Social Life">Health</option>
                <option value="Social Life">Travel</option>
                <option value="Social Life">Other</option>
            </select>
        </div>
    );
};

const App = () => {
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [category, setCategory] = useState('Future Goal');
    const [notification, setNotification] = useState(null);
    const [displayTask, setDisplayTask] = useState('');
    const [isLoading, setIsLoading] = useState(false);

   

    const taskvalue = (e) => {
        setTask(e.target.value);
    };

    const handleSaveTodo = async () => {
        // Validate input
        if (!task.trim()) {
            getNotification("Please enter a task ❌");
            return;
        }

        setIsLoading(true);
        
        try {
            const todoData = {
                task: task.trim(),
                category: category,
                completed: false,
                date: new Date().toISOString()
            };

             console.log('Sending data to backend:', todoData); // Debug log
            
            const response = await axios.post('/api/todo/create', todoData);
            
            console.log('Backend response:', response.data); // Debug log

            const newTodo = {
                _id: response.data.todo._id || response.data.todo.id,
                task: response.data.todo.task,
                category: response.data.todo.category,
                completed: response.data.todo.completed,
                date: response.data.todo.date,
                createdAt: response.data.todo.createdAt || new Date().toISOString()
            };

            setTodo(prev => [...prev, newTodo]);
            setTask('');
            getNotification("Task added successfully ✅!");
        } catch (error) {
            console.error("Error saving todo:", error);
            getNotification("Failed to add task ❌");
        } finally {
            setIsLoading(false);
        }
    };

    const getNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const completTask = async (index) => {
        const todoItem = todo[index];
        const updatedStatus = !todoItem.completed;

        try {
            await axios.patch(`/api/todo/update/${todoItem._id}`, {
                completed: updatedStatus
            });

            const updatedTodos = todo.map((item, i) =>
                i === index ? { ...item, completed: updatedStatus } : item
            );
            setTodo(updatedTodos);
            
            getNotification(updatedStatus ? "Task completed ✅!" : "Task marked incomplete ↩️");
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (index) => {
        const todoItem = todo[index];

        try {
            await axios.delete(`/api/todo/delete/${todoItem._id}`);
            
            const newTodo = todo.filter((_, i) => i !== index);
            setTodo(newTodo);
            getNotification("Task deleted successfully ✅!");
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const updatedTodos = async (index) => {
        const todoItem = todo[index];        
        try {
            await axios.put(`/api/todo/update/${todo[index]._id}`, {
                task: todoItem.task,
                category: todoItem.category,
                completed: todoItem.completed,
                Date: todoItem.Date
        })
        getNotification("Task updated successfully ✅!");
        setTodo(prev => prev.map((item, i) => (i === index ? todoItem : item)));
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

    const hiddeTask = () => {
        setDisplayTask('hidden');
    };

    const showTask = () => {
        setDisplayTask('block');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveTodo();
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center py-10">
                <Navbar hiddeTask={hiddeTask} showTask={showTask} />

                {notification && (
                    <div className="fixed text-xl w-1/3 top-5 right-5 bg-green-400 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                        {notification}
                    </div>
                )}

                <div className={`w-full mt-10 max-w-2xl bg-white p-6 rounded-xl shadow-lg text-center ${displayTask}`}>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Todo List</h1>

                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            className="w-full md:w-80 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
                            value={task}
                            onChange={taskvalue}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your task"
                            disabled={isLoading}
                        />
                        <button
                            className={`px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-transform transform hover:scale-105 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                            onClick={handleSaveTodo}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Task'}
                        </button>
                    </div>

                    <FilterComponent setCategory={setCategory} category={category} />

                    <div className="mt-8 space-y-4">
                        {todo.length === 0 ? (
                            <div className="text-gray-500 text-lg py-8">
                                No tasks yet. Add your first task above!
                            </div>
                        ) : (
                            todo.map((item, index) => (
                                <div key={item._id || index} className="flex items-center justify-between ml-12 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                                    <FontAwesomeIcon 
                                        icon={item.completed ? faCircleCheck : faCircle}
                                        className='text-3xl -ml-14 cursor-pointer text-purple-500 hover:text-purple-700'
                                        onClick={() => completTask(index)}
                                    />
                                    <div className="flex-1 text-left ml-4">
                                        <span className={`text-lg font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            {item.task}
                                        </span>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {item.category} • {new Date(item.date || item.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer"
                                            onClick={() =>
                                                updatedTodos(index)
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                                            onClick={() => deleteTodo(index)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <Routes>
                    <Route path="/task" element={<Task todo={todo} setCategory={setCategory} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;