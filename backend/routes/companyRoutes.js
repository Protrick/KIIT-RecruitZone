const express = require("express");
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../Controllers/companyController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getCompanies)
  .post(protect, adminOnly, createCompany);

router.route("/:id")
  .get(getCompanyById)
  .put(protect, adminOnly, updateCompany)
  .delete(protect, adminOnly, deleteCompany);

module.exports = router;
