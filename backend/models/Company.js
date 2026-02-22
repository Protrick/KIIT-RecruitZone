const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  name: String,
  role: String,
  ctc: String,
  eligibility: String,
  branches: [String],
  driveDate: Date,
  description: String
}, { timestamps: true });
module.exports = mongoose.model("Company", companySchema);