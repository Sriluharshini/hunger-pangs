import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Api from '../services/api';


export default function DonationForm({ onCreated }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        donorName: '',
        description: '',
        address: '',
        donorPhone: '',
        expiresAt: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await Api.post('/api/donations', {
                donorName: form.donorName,
                description: form.description,
                address: form.address,
                donorPhone: form.donorPhone,
                expiresAt: form.expiresAt
            });
            setForm({ donorName: '', description: '', address: '', donorPhone: '', expiresAt: '' });
            if (onCreated) onCreated();
            navigate('/dashboard'); // optional: redirect after create
        } catch (err) {
            toast.error(err.response?.data?.msg || err.message);
        }
    };

    return (
        <form onSubmit={submit} className="bg-white p-5 rounded-lg shadow-md max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-blue-700">Create Donation</h1>

            <input name="donorName" value={form.donorName} onChange={handleChange} placeholder="Donor name" className="w-full mb-2 p-2 border rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full mb-2 p-2 border rounded" required />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Pickup address" className="w-full mb-2 p-2 border rounded" required />
            <input name="donorPhone" value={form.donorPhone} onChange={handleChange} placeholder="Mobile number" className="w-full mb-2 p-2 border rounded" required />
            <label className="text-sm text-gray-600">Pick By</label>
            <input name="expiresAt" type="datetime-local" value={form.expiresAt} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Donation</button>
        </form>
    );
}
