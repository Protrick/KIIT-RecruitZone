const Society = require("../models/Society");

exports.getSocieties = async (req, res) => {
  const societies = await Society.find();
  res.json(societies);
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