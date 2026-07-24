import Problem from "../models/Problem.js";

// GET problems with filters
exports.getProblems = async (req, res) => {
  try {
    const { category, difficulty, topic, company, search } = req.query;

    let filter = {};

    if (category && category !== "") {
      filter.category = category;
    }

    if (difficulty && difficulty !== "") {
      filter.difficulty = difficulty;
    }

    if (topic && topic !== "") {
      filter.topic = topic;
    }

    if (company && company !== "") {
      filter.company = company;
    }

    if (search && search !== "") {
      filter.title = { $regex: search, $options: "i" };
    }

    // ✅ Correct model usage
    const problems = await Problem.find(filter);

    res.status(200).json(problems);
  } catch (error) {
    console.error("Error in getProblems:", error);
    res.status(500).json({ message: "Server Error" });
  }
};