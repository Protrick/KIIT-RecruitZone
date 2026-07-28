const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {

    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: {
      type: String, // URL to logo image
      default: '',
    },
    companyWebsite: {
      type: String,
      trim: true,
    },

    // Role details
    role: {
      type: String,
      required: [true, 'Job role/designation is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    experience: {
      type: String, // display string e.g. "0 - 1 years" (matches frontend)
      default: '0 - 1 years',
    },
    minExperience: {
      type: Number, // numeric shadow field, for filtering
      default: 0,
    },
    type: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract'],
      default: 'Full Time',
    },
    location: {
      type: String, // e.g. "Onsite | Bangalore" (matches frontend)
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },

    // Compensation
    ctc: {
      type: String, // display string e.g. "7 LPA" (matches frontend)
      required: [true, 'CTC is required'],
    },
    ctcValue: {
      type: Number, // numeric shadow field (LPA), for sorting/filtering
    },

    // Eligibility criteria (needed for admin/eligibility features)
    eligibility: {
      minCGPA: { type: Number, default: 0 },
      maxBacklogs: { type: Number, default: 0 },
      branchesAllowed: {
        type: [String],
        required: [true, 'At least one eligible branch is required'],
      },
      batchYears: {
        type: [Number], // e.g. [2026, 2027]
        required: true,
      },
      genderRestriction: {
        type: String,
        enum: ['All', 'Male', 'Female'],
        default: 'All',
      },
    },

    // Important dates
    postedDate: {
      type: Date,
      default: Date.now, 
    },
    registrationDeadline: {
      type: Date,
      required: [true, 'Registration deadline is required'],
    },
    registrationLink: {
      type: String,
      trim: true,
    },

    // Selection process
    selectionProcess: {
      type: [String], // e.g. ["Online Test", "Technical Interview", "HR Round"]
      default: [],
    },

    // Status & tracking
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },

    // Admin/audit
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interestedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: daysLeft (computed, matches frontend "daysLeft" — never goes stale)
jobSchema.virtual('daysLeft').get(function () {
  if (!this.registrationDeadline) return null;
  const diffMs = this.registrationDeadline.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
});

// Virtual: isLatest (posted within the last 7 days, matches frontend "isLatest")
jobSchema.virtual('isLatest').get(function () {
  if (!this.postedDate) return false;
  const diffDays = (Date.now() - this.postedDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
});

// Common query indexes
jobSchema.index({ status: 1, registrationDeadline: 1 });
jobSchema.index({ 'eligibility.branchesAllowed': 1 });
jobSchema.index({ company: 'text', role: 'text' });

module.exports = mongoose.model('Job', jobSchema);