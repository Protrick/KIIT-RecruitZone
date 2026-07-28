const Problem = require("../models/Problem");

// GET problems with filters
const getProblems = async (req, res) => {
  try {
    const { category, difficulty, topic, company, search } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (company) filter.company = company;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const problems = await Problem.find(filter);

    res.status(200).json(problems);
  } catch (error) {
    console.error("Error in getProblems:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProblems,
};