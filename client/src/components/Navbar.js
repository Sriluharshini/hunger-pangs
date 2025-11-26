import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md py-3 px-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Hunger Pangs
            </Link>

            <div className="flex gap-6 text-gray-700">
                {/* Public Links */}
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <Link to="/about" className="hover:text-blue-600">About</Link>
                <Link to="/contact" className="hover:text-blue-600">Contact</Link>
                {!token ? (
                    <>
                        <Link to="/login" className="hover:text-blue-600">Login</Link>
                        <Link to="/register" className="hover:text-blue-600">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                        <Link to="/create" className="hover:text-blue-600">Donate</Link>
                        <button onClick={logout} className="text-red-500 hover:text-red-600">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
