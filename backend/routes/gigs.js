import express from 'express';
import Gig from '../models/Gig.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/gigs
// @desc    Get all open gigs with search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = { status: 'open' };
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const gigs = await Gig.find(query)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/gigs/my-gigs
// @desc    Get user's gigs
// @access  Private
router.get('/my-gigs', protect, async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/gigs
// @desc    Create new gig
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id
    });

    const populatedGig = await Gig.findById(gig._id)
      .populate('ownerId', 'name email');

    res.status(201).json(populatedGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;