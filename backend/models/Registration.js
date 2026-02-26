const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userName: String,
  email: String,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);