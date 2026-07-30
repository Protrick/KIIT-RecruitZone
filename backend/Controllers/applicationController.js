const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Application = require('../models/Application');


const DRIVE_MODELS = ['Job', 'Internship'];

const deleteResumeFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  fs.unlink(absolutePath, (err) => {
    if (err) console.error(`Failed to delete resume file: ${absolutePath}`, err.message);
  });
};

/**
 * @desc    Apply to a job or internship drive (with resume upload)
 * @route   POST /api/applications
 * @access  Student
 * @body    driveType ('Job' | 'Internship'), drive (ObjectId), coverNote (optional)
 * @file    resume (handled by middleware/resumeUpload.js)
 */
exports.createApplication = async (req, res) => {
  try {
    const { driveType, drive, coverNote } = req.body;

    if (!DRIVE_MODELS.includes(driveType)) {
      if (req.file) deleteResumeFile(path.join('uploads', 'resumes', req.file.filename));
      return res.status(400).json({
        success: false,
        message: `driveType must be one of: ${DRIVE_MODELS.join(', ')}`,
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required' });
    }

    // Confirm the drive actually exists and hasn't closed
    const DriveModel = mongoose.model(driveType);
    const driveDoc = await DriveModel.findById(drive);

    if (!driveDoc) {
      deleteResumeFile(path.join('uploads', 'resumes', req.file.filename));
      return res.status(404).json({ success: false, message: `${driveType} not found` });
    }

    if (driveDoc.registrationDeadline && driveDoc.registrationDeadline < new Date()) {
      deleteResumeFile(path.join('uploads', 'resumes', req.file.filename));
      return res.status(400).json({
        success: false,
        message: 'Registration deadline for this drive has already passed',
      });
    }

    const application = await Application.create({
      student: req.user._id,
      driveType,
      drive,
      coverNote,
      resume: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: path.join('uploads', 'resumes', req.file.filename),
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

    // Keep the drive's interest counter roughly in sync (best-effort, non-blocking)
    DriveModel.findByIdAndUpdate(drive, { $inc: { interestedCount: 1 } }).catch(() => {});

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    if (req.file) deleteResumeFile(path.join('uploads', 'resumes', req.file.filename));

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied to this drive',
      });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid drive ID' });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: err.message,
    });
  }
};

/**
 * @desc    Get the logged-in student's own applications
 * @route   GET /api/applications/me
 * @access  Student
 */
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('drive')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your applications',
      error: err.message,
    });
  }
};

/**
 * @desc    Get a single application (owner student or admin only)
 * @route   GET /api/applications/:id
 * @access  Student (own) / Admin
 */
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('drive')
      .populate('student', 'name email branch batchYear rollNumber');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const isOwner = application.student._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this application' });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: err.message,
    });
  }
};

/**
 * @desc    Get all applications for a specific drive (admin dashboard)
 * @route   GET /api/applications/drive/:driveType/:driveId
 * @access  Admin
 */
exports.getApplicationsForDrive = async (req, res) => {
  try {
    const { driveType, driveId } = req.params;
    const { status } = req.query;

    if (!DRIVE_MODELS.includes(driveType)) {
      return res.status(400).json({
        success: false,
        message: `driveType must be one of: ${DRIVE_MODELS.join(', ')}`,
      });
    }

    const filter = { driveType, drive: driveId };
    if (status) filter.status = status;

    const applications = await Application.find(filter)
      .populate('student', 'name email branch batchYear rollNumber cgpa')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications for drive',
      error: err.message,
    });
  }
};

/**
 * @desc    Update application status (shortlist/reject/select)
 * @route   PUT /api/applications/:id/status
 * @access  Admin
 * @body    status, statusNote (optional)
 */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, statusNote } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, statusNote },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: err.message,
    });
  }
};

/**
 * @desc    Withdraw / delete an application (owner student, or admin)
 * @route   DELETE /api/applications/:id
 * @access  Student (own) / Admin
 */
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const isOwner = application.student.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to withdraw this application' });
    }

    await application.deleteOne();
    deleteResumeFile(application.resume.filePath);

    res.status(200).json({ success: true, message: 'Application withdrawn successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to withdraw application',
      error: err.message,
    });
  }
};