import React from "react";


const Task = ({ todo }) => {
    // console.log(hiddenTask)

    return (
        <div className=" w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">All Tasks</h2>

            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-200 text-gray-800 font-semibold p-3 rounded-t-lg text-center">
                <div>Sr. No</div>
                <div>Task Name</div>
                <div>Date</div>
                <div>Status</div>
            </div>

            {/* Task Row */}

            {todo.map((data, SrNo) => (
                <div key={SrNo} className={`grid grid-cols-4 p-4 border-b text-center`}>
                    <div>{data.SrNo}</div>
                    <div className="text-left px-4">{data.task}</div>
                    <div>03/02/2024</div>
                    <div className={`${data.completed ? "text-red-700" : " text-green-700 font-semibold"}`}>{data.completed ? "Not Complete" : "Complete"}</div>
                </div>
            ))}
        </div>
    );
};

export default Task;
