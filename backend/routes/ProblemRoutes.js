const express = require("express");
const router = express.Router();
const { getProblems } = require("../controllers/ProblemController");

router.get("/", getProblems);

module.exports = router;