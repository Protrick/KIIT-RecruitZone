const express = require('express');
const router = express.Router();

const {
  getAllInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipStats,
} = require('../Controllers/internshipController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public / student routes
router.get('/', getAllInternships);
router.get('/stats/dashboard', protect, adminOnly, getInternshipStats);
router.get('/:id', getInternshipById);

// Admin-only routes
router.post('/', protect, adminOnly, createInternship);
router.put('/:id', protect, adminOnly, updateInternship);
router.delete('/:id', protect, adminOnly, deleteInternship);

module.exports = router;