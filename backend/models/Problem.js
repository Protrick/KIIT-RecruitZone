const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["dsa", "reasoning", "quantitative"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);