const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} = require('../controllers/jobController');

const { protect, authorize } = require('../middleware/auth');

// Public / student routes
router.get('/', getAllJobs);
router.get('/stats/dashboard', protect, authorize('admin'), getJobStats);
router.get('/:id', getJobById);

// Admin-only routes
router.post('/', protect, authorize('admin'), createJob);
router.put('/:id', protect, authorize('admin'), updateJob);
router.delete('/:id', protect, authorize('admin'), deleteJob);

module.exports = router;
