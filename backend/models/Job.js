const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "Remote",
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    experienceRequired: {
      type: String,
      required: true,
    },
    skillsRequired: [
      {
        type: String,
      },
    ],
    applyUrl: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
