const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student reference is required'],
    },

    driveType: {
      type: String,
      required: [true, 'Drive type is required'],
      enum: ['Job', 'Internship'],
    },
    drive: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Drive reference is required'],
      refPath: 'driveType',
    },

    resume: {
      fileName: { type: String, required: true }, // stored filename on disk
      originalName: { type: String, required: true }, // original filename student uploaded
      filePath: { type: String, required: true }, // relative path, e.g. "uploads/resumes/xyz.pdf"
      mimeType: { type: String, required: true },
      size: { type: Number, required: true }, // bytes
    },

    coverNote: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'],
      default: 'Applied',
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // Admin note when changing status (e.g. rejection reason)
    statusNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// A student can only apply once to the same drive
applicationSchema.index({ student: 1, drive: 1 }, { unique: true });

// Common admin/dashboard queries
applicationSchema.index({ driveType: 1, drive: 1, status: 1 });
applicationSchema.index({ student: 1, status: 1 });

module.exports = mongoose.model('Application', applicationSchema);