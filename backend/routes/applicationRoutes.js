const express = require('express');
const router = express.Router();

const {
  createApplication,
  getMyApplications,
  getApplicationById,
  getApplicationsForDrive,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/applicationController');

const { protect, authorize } = require('../middleware/authMiddleware');
const resumeUpload = require('../middleware/resumeUpload');

// Student routes
router.post('/', protect, authorize('student'), resumeUpload, createApplication);
router.get('/me', protect, authorize('student'), getMyApplications);

// Shared (owner student or admin — checked inside the controller)
router.get('/:id', protect, getApplicationById);
router.delete('/:id', protect, deleteApplication);

// Admin routes
router.get('/drive/:driveType/:driveId', protect, authorize('admin'), getApplicationsForDrive);
router.put('/:id/status', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;