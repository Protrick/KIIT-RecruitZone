const Society = require("../models/Society");

exports.getSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSociety = async (req, res) => {
  const { name, description, logo } = req.body;

  const society = await Society.create({
    name,
    description,
    logo
  });

  res.status(201).json(society);
};