const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    donorPhone: { type: String, required: true },
    expiresAt: { type: Date, required: true },

    // donation status: available → claimed → completed
    status: {
        type: String,
        enum: ["available", "claimed", "completed"],
        default: "available"
    },

    // user who created the donation
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // NEW FIELD: user who claimed the donation
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
