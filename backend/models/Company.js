import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full Time", "Internship", "Internship + PPO"],
      required: true,
    },

    package: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    applyLink: {
      type: String,
      required: true,
    },

    postedDate: {
      type: Date,
      default: Date.now,
    },

    lastDateToApply: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Latest", "Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);