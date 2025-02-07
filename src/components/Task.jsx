import React, { useState } from "react";

const Task = ({ todo }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterCategory, setFilterCategory] = useState("Future Goal");

    const filteredTodo = filterCategory === "Future Goal" ? todo : todo.filter(task => task.type === filterCategory);

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">All Tasks</h2>

            {/* Filter Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-md shadow hover:bg-gray-300 transition"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span className="mr-2">&#x25BC; Filter</span>
                </button>
                {showDropdown && (
                    <div className="absolute right-56 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                        {["Future Goal", "Education", "Finance", "Relationship", "Social Life"].map((category, index) => (
                            <div
                                key={index}
                                className="p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                                onClick={() => {
                                    setFilterCategory(category);
                                    setShowDropdown(false);
                                }}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-200 text-gray-800 font-semibold p-3 rounded-t-lg text-center">
                <div className="col-span-1">Sr. No</div>
                <div className="col-span-6">Task Name</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Status</div>
            </div>

            {/* Task Row */}
            {filteredTodo.map((data, index) => (
                <div key={index} className={`grid grid-cols-12 p-4 border-b text-center`}>
                    <div className="col-span-1">{index + 1}</div>
                    <div className="text-left px-4 col-span-6">{data.task}</div>
                    <div className="col-span-2">{data.Date}</div>
                    <div className={`col-span-3 ${data.completed ? "text-green-700 font-semibold" : "text-red-700"}`}>
                        {data.completed ? "Complete" : "Not Complete"}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Task;