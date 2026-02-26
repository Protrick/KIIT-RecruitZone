const express = require("express");
const router = express.Router();
const { getProblems } = require("../Controllers/problemController");

router.get("/", getProblems);

module.exports = router;