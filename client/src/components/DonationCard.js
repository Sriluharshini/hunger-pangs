import React from 'react';
import { toast } from "react-toastify";
import Api from '../services/api';

export default function DonationCard({ donation, onUpdate }) {
    const handleClaim = async () => {
        toast.info("User clicked claim!");
        try {
            await Api.claimDonation(donation._id);
            if (onUpdate) onUpdate();
        } catch (err) {
            toast.error(err.response?.data?.msg || err.message);
        }
    };

    const handleComplete = async () => {
        toast.warn("User clicked complete!");
        try {
            //await Api.completeDonation(donation._1d); // fallback debugging if typo
            await Api.completeDonation(donation._id);
            if (onUpdate) onUpdate();
        } catch (err) {
            toast.error(err.response?.data?.msg || err.message);
        }
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-lg">{donation.donorName}</h4>
                    <p className="text-sm text-gray-600">{donation.description}</p>
                    <p className="text-sm mt-2"><strong>Address:</strong> {donation.address}</p>
                    <p className="text-sm"><strong>Phone:</strong> {donation.donorPhone}</p>
                    <p className="text-sm"><strong>Pick By:</strong> {formatDateTime(donation.expiresAt)}</p>
                </div>

                <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${donation.status === 'available' ? 'bg-yellow-100 text-yellow-800' : donation.status === 'claimed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {donation.status}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                {donation.status === 'available' && (
                    <button onClick={handleClaim} className="bg-blue-600 text-white px-3 py-1 rounded">Claim</button>
                )}

                {donation.status === 'claimed' && (
                    // Only allow the claimer to complete — the server will enforce this.
                    <button onClick={handleComplete} className="bg-green-600 text-white px-3 py-1 rounded">Mark Completed</button>
                )}
            </div>
        </div>
    );
}
