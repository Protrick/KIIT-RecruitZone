const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: {
      type: String, 
      default: '',
    },
    companyWebsite: {
      type: String,
      trim: true,
    },

   
    role: {
      type: String,
      required: [true, 'Internship role/designation is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: 'Internship', 
    },
    category: {
      type: String, 
      required: [true, 'Category is required'],
      trim: true,
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      default: 'Online',
    },
    location: {
      type: String, 
      trim: true,
    },
    duration: {
      type: String, 
    },
    skills: {
      type: [String],
      default: [],
    },

    
    stipend: {
      type: String, 
      required: [true, 'Stipend is required'],
    },
    stipendAmount: {
      type: Number, 
      required: true,
    },
    ctc: {
      type: String, 
    },

    
    ppoOffered: {
      type: Boolean,
      default: false,
    },
    ppoCTC: {
      min: { type: Number },
      max: { type: Number },
    },

   
    eligibility: {
      minCGPA: { type: Number, default: 0 },
      maxBacklogs: { type: Number, default: 0 },
      branchesAllowed: {
        type: [String],
        required: [true, 'At least one eligible branch is required'],
      },
      batchYears: {
        type: [Number], // e.g. [2027, 2028]
        required: true,
      },
      genderRestriction: {
        type: String,
        enum: ['All', 'Male', 'Female'],
        default: 'All',
      },
    },

   
    postedOn: {
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

// Virtual: isRecent (posted within the last 7 days, matches frontend "isRecent")
internshipSchema.virtual('isRecent').get(function () {
  if (!this.postedOn) return false;
  const diffDays = (Date.now() - this.postedOn.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
});

// Virtual: daysLeft (computed from registrationDeadline, for consistency with Job)
internshipSchema.virtual('daysLeft').get(function () {
  if (!this.registrationDeadline) return null;
  const diffMs = this.registrationDeadline.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
});

// Common query indexes
internshipSchema.index({ status: 1, registrationDeadline: 1 });
internshipSchema.index({ 'eligibility.branchesAllowed': 1 });
internshipSchema.index({ company: 'text', role: 'text', category: 'text' });

module.exports = mongoose.model('Internship', internshipSchema);
