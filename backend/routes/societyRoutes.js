const express = require("express");
const router = express.Router();
const { getSocieties, createSociety } = require("../controllers/societyController");

router.get("/", getSocieties);
router.post("/", createSociety);

module.exports = router;