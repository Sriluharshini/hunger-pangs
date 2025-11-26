import React, { useEffect, useState } from 'react';
import DonationList from '../components/DonationList';
import Api from '../services/api';

export default function Dashboard() {
    const [donations, setDonations] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchDonations = async () => {
        try {
            const res = await Api.get('/api/donations', {
                params: {
                    status: statusFilter || undefined,
                    sortBy,
                    order,
                    from: fromDate || undefined,
                    to: toDate || undefined
                }
            });
            setDonations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchDonations(); }, [statusFilter, sortBy, order, fromDate, toDate]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Available Donations</h1>

            {/* FILTER UI */}
            <div className="mb-4 space-x-4">
                {/* Status Filter */}
                <select
                    className="border p-2 rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Filter By Status</option>
                    <option value="available">Available</option>
                    <option value="claimed">Claimed</option>
                </select>

                {/* Sort By */}
                <select
                    className="border p-2 rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Filter By Date</option>
                    <option value="createdAt">Date Created</option>
                    <option value="expiryDate">Expiry Date</option>
                </select>

                {/* Sort Order */}
                <select
                    className="border p-2 rounded"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>

                {/* Date Range */}
                <input
                    type="date"
                    placeholder="From date"
                    className="border p-2 rounded"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="To date"
                    className="border p-2 rounded"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <DonationList donations={donations} refresh={fetchDonations} />
        </div>
    );
}


