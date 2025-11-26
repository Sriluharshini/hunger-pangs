import React from 'react';
import DonationCard from './DonationCard';

export default function DonationList({ donations = [], refresh }) {
    if (!donations.length) return <div className="text-center py-8">No donations available.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donations.map(d => (
                <DonationCard key={d._id} donation={d} onUpdate={refresh} />
            ))}
        </div>
    );
}
