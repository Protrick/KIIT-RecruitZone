const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },

    societyName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Technology", "Cultural", "Business", "Sports", "Other"],
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);