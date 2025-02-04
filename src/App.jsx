import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Task from './components/Task';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const FilterComponent = ({ setCategory }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="p-4 mt-3 rounded-lg shadow-md bg-white flex justify-between items-center">
            {/* Left - Select Dropdown */}
            <select
                className="p-2 text-lg border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Future Goal">Future Goal</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Relationship">Relationship</option>
                <option value="Social Life">Social Life</option>
            </select>
            {/* Right - Filter Button */}
            <div className="relative">
                <button
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-md shadow hover:bg-gray-300 transition"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span className="mr-2">&#x25BC; Filter</span>
                </button>

                {/* Dropdown List */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                        {["Future Goal", "Education", "Finance", "Relationship", "Social Life"].map((category, index) => (
                            <div
                                key={index}
                                className="p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                                onClick={() => {
                                    setCategory(category);
                                    setShowDropdown(false);
                                }}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [category, setCategory] = useState('future goal');
    const [notification, setNotification] = useState(null);
    const [numberOftask, setNumberOftask] = useState(0);
    const [displayTask, setDisplayTask] = useState('')
    // const [hiddenTask, setHiddenTask] = useState('')
    const taskvalue = (e) => {
        setTask(e.target.value);
    };

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || []; // Ensures it's not null
        setTodo(savedTodos);
    }, []);

    // ✅ Save todos to localStorage whenever the todo list changes
    useEffect(() => {
        if (todo.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todo));
        }
    }, [todo]);

    const getNotification = (massage) => {
        setNotification(massage);
        setTimeout(() => {
            setNotification(null);

        }, 2000);
    }

    const addTask = () => {
        let newdate = new Date();
        newdate.getDate();
        setNumberOftask(numberOftask + 1);
        if (task.trim() === "") {
            alert("Enter your todo");
        } else {
            setTodo([...todo, { SrNo: numberOftask, task, type: category, Date: newdate, completed: false }]);
            setTask('');
            console.log(todo)
            getNotification("Task added successfully ✅!");
        }
    };
    const completTask = (index) => {
        const updatedTodos = todo.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setTodo(updatedTodos);

    };
    const deleteTodo = (index) => {
        const newTodo = todo.filter((_, i) => i !== index);
        setTodo(newTodo);
    };
    const hiddeTask = () => {
        setDisplayTask('hidden')
        // setHiddenTask('block')    
    }
    const showTask = () => {
        setDisplayTask('block')
    }
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center py-10">
                <Navbar hiddeTask={hiddeTask} showTask={showTask}/>
                <Routes>
                    <Route path="/task" element={<Task todo={todo} />} />
                </Routes>
                {notification && (
                    <div className="fixed text-xl w-1/3 top-5 right-5 bg-green-400 text-white px-4 py-2 rounded-lg shadow-lg">
                        {notification}
                    </div>
                )}
                <div className={`w-full mt-10 max-w-2xl bg-white p-6 rounded-xl shadow-lg text-center ${displayTask}`}>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Todo List</h1>

                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ">
                        <input
                            className="w-full md:w-80 h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
                            value={task}
                            onChange={taskvalue}
                            placeholder="Enter your task"
                        />
                        <button
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105"
                            onClick={addTask}
                        >
                            Add Task
                        </button>
                    </div>
                    <FilterComponent setCategory={setCategory} />

                    <div className="mt-8 space-y-4">
                        {todo.map((item, index) => (
                            <div key={index} className="flex items-center justify-between ml-12 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                                <FontAwesomeIcon icon={item.completed ? faCircleCheck : faCircle}
                                    className='text-3xl -ml-14'
                                    onClick={() => { completTask(index) }}
                                />
                                <span className={`text-lg font-medium text-gray-800 absolute ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.task}</span>
                                <div className="flex space-x-4">
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer"
                                        onClick={() => console.log("Edit clicked for index:", index)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                                        onClick={() => deleteTodo(index)}
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
