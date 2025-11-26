const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Approve donation
router.put('/approve/:id', auth, async (req, res) => {
    try {
        // ensure only admin
        if (!req.user || req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });

        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });
        donation.status = 'approved';
        await donation.save();
        res.json(donation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Assign donation to receiver
router.put('/assign/:id', auth, async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });

        const { receiverId } = req.body;
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });
        donation.assignedTo = receiverId;
        donation.status = 'picked_up';
        await donation.save();
        res.json(donation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
