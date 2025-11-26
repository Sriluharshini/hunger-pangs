const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Create donation (protected)
router.post('/', auth, async (req, res) => {
    try {
        const { donorName, description, address, donorPhone, expiresAt } = req.body;
        if (!donorName || !description || !address || !donorPhone || !expiresAt) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const donation = new Donation({
            donorName,
            description,
            address,
            donorPhone,
            expiresAt,
            createdBy: req.user.id
        });

        await donation.save();
        // return populated createdBy if you want:
        await donation.populate('createdBy', 'name email');
        res.status(201).json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const { sortBy, order, status, from, to } = req.query;

        const filter = {};

        // Filter by status (e.g., "available", "claimed")
        if (status) filter.status = status;

        // Filter by date range
        if (from || to) {
            filter.createdAt = {};
            if (from) filter.createdAt.$gte = new Date(from);
            if (to) filter.createdAt.$lte = new Date(to);
        }

        // Sorting direction
        const sortOrder = order === "asc" ? 1 : -1;

        const donations = await Donation.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(200)
            .populate('createdBy', 'name email')
            .populate('claimedBy', 'name email');

        res.json(donations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Get single donation
router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate('createdBy', 'name email').populate('claimedBy', 'name email');
        if (!donation) return res.status(404).json({ msg: 'Not found' });
        res.json(donation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Claim a donation (protected) -> set status = claimed, set claimedBy
router.put('/:id/claim', auth, async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });

        if (donation.status !== 'available') {
            return res.status(400).json({ msg: 'Donation is not available to claim' });
        }

        donation.status = 'claimed';
        donation.claimedBy = req.user.id;
        await donation.save();
        await donation.populate('claimedBy', 'name email');
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Complete a claimed donation (protected) -> only claimer can mark completed
router.put('/:id/complete', auth, async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ msg: 'Donation not found' });

        if (donation.status !== 'claimed') {
            return res.status(400).json({ msg: 'Donation is not in claimed state' });
        }

        // only the user who claimed can mark it completed
        if (!donation.claimedBy || donation.claimedBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Only the user who claimed this donation can mark it completed' });
        }

        donation.status = 'completed';
        await donation.save();
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
