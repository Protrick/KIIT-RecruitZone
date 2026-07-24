const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },
    roles: [
      {
        type: String,
      },
    ],
    ctc: {
      type: Number,
      required: true,
    },
    eligibilityCriteria: {
      minCGPA: {
        type: Number,
        default: 0.0,
      },
      allowedBranches: [
        {
          type: String,
        },
      ],
    },
    driveDate: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Closed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
