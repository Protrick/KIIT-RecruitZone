const express = require('express');
const router = express.Router();

const {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipStats,
} = require('../controllers/internshipController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Public / student routes
router.get('/', getAllInternships);
router.get('/stats/dashboard', protect, authorize('admin'), getInternshipStats);
router.get('/:id', getInternshipById);

// Admin-only routes
router.post('/', protect, authorize('admin'), createInternship);
router.put('/:id', protect, authorize('admin'), updateInternship);
router.delete('/:id', protect, authorize('admin'), deleteInternship);

module.exports = router;