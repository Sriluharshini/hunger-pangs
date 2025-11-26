import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        await API.post("/api/auth/register", form);
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Register</h2>

            <form onSubmit={submit}>
                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                    Register
                </button>
            </form>
        </div>
    );
}
