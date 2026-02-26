const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Society", societySchema);