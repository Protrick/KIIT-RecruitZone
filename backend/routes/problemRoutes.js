const express = require("express");
const { getProblems } = require("../Controllers/problemController");

const router = express.Router();

router.get("/", getProblems);

module.exports = router;