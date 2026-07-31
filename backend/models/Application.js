const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student reference is required'],
    },

    // Polymorphic reference: driveType tells Mongoose which model
    // `drive` points to (Job or Internship), so one Application model
    // covers both without duplicating logic.
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

    // Captured directly on the application form (not just pulled from the
    // User profile), since admins need to verify eligibility per-application
    // and these details should stay as a historical snapshot even if the
    // student's profile changes later.
    applicantDetails: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
      },
      rollNumber: {
        type: String,
        required: [true, 'Roll number is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
      },
      class10Marks: {
        type: Number,
        required: [true, 'Class 10 marks/percentage is required'],
        min: 0,
        max: 100,
      },
      class12Marks: {
        type: Number,
        required: [true, 'Class 12 marks/percentage is required'],
        min: 0,
        max: 100,
      },
      collegeName: {
        type: String,
        required: [true, 'College name is required'],
        trim: true,
        default: 'Kalinga Institute of Industrial Technology (KIIT)',
      },
      passingBatch: {
        type: Number,
        required: [true, 'Passing batch/year is required'],
      },
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