import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({hiddeTask,showTask}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-purple-700 text-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-3xl font-bold">Todo App</h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-lg font-medium">
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer"onClick={showTask}>Home</li></Link >
                    <Link to='/task'><li className="hover:text-gray-300 cursor-pointer"onClick={hiddeTask}>Tasks</li></Link >
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer">Categories</li></Link >
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer">About</li></Link >
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col items-center bg-purple-800 py-4 space-y-4 w-full absolute left-0">
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer">Home</li></Link >
                    <Link to='/task'><li className="hover:text-gray-300 cursor-pointer" onClick={hiddeTask}>Tasks</li></Link >
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer">Categories</li></Link >
                    <Link to='/'><li className="hover:text-gray-300 cursor-pointer">About</li></Link >
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
