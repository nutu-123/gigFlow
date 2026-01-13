import express from 'express';
import mongoose from 'mongoose';
import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bids
// @desc    Create a bid
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'This gig is no longer accepting bids' });
    }

    // Check if user is trying to bid on their own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot bid on your own gig' });
    }

    // Check if user already bid on this gig
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id
    });

    if (existingBid) {
      return res.status(400).json({ message: 'You have already placed a bid on this gig' });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price
    });

    const populatedBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email');

    res.status(201).json(populatedBid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bids/:gigId
// @desc    Get all bids for a gig
// @access  Private (Owner only)
router.get('/:gigId', protect, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Check if user is the owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view these bids' });
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/bids/:bidId/hire
// @desc    Hire a freelancer (with transaction)
// @access  Private
router.patch('/:bidId/hire', protect, async (req, res) => {
  try {
    // Find the bid
    const bid = await Bid.findById(req.params.bidId).populate('gigId');

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Get the gig
    const gig = await Gig.findById(bid.gigId._id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Check if user is the owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to hire for this gig' });
    }

    // Check if gig is still open
    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'This gig has already been assigned' });
    }

    // Update gig status to assigned
    gig.status = 'assigned';
    await gig.save();

    // Update hired bid to hired
    bid.status = 'hired';
    await bid.save();

    // Update all other bids to rejected
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id }
      },
      { status: 'rejected' }
    );

    const updatedBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email')
      .populate('gigId');

    res.json({
      message: 'Freelancer hired successfully',
      bid: updatedBid
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bids/my/bids
// @desc    Get user's bids
// @access  Private
router.get('/my/bids', protect, async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate('gigId')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;