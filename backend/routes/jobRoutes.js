const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} = require('../Controllers/jobController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public / student routes
router.get('/', getAllJobs);
router.get('/stats/dashboard', protect, adminOnly, getJobStats);
router.get('/:id', getJobById);

// Admin-only routes
router.post('/', protect, adminOnly, createJob);
router.put('/:id', protect, adminOnly, updateJob);
router.delete('/:id', protect, adminOnly, deleteJob);

module.exports = router;
