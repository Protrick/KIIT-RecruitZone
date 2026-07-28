const Registration = require("../models/Registration");

exports.registerForEvent = async (req, res) => {
  const { userName, email, eventId } = req.body;

  const registration = await Registration.create({
    userName,
    email,
    event: eventId
  });

  res.status(201).json({
    message: "Registered Successfully",
    registration
  });
};