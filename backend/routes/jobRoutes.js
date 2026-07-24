const express = require("express");
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
} = require("../Controllers/jobController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/internships")
  .get(getInternships)
  .post(protect, adminOnly, createInternship);

router.route("/internships/:id")
  .get(getInternshipById)
  .put(protect, adminOnly, updateInternship)
  .delete(protect, adminOnly, deleteInternship);

router.route("/")
  .get(getJobs)
  .post(protect, adminOnly, createJob);

router.route("/:id")
  .get(getJobById)
  .put(protect, adminOnly, updateJob)
  .delete(protect, adminOnly, deleteJob);

module.exports = router;
