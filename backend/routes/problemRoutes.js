const express = require("express");
const { getProblems } = require("../controllers/problemController");

const router = express.Router();

router.get("/", getProblems);

module.exports = router;