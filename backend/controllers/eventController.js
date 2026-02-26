const Event = require("../models/Event");


// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Increase registered count
    event.registeredCount = (event.registeredCount || 0) + 1;

    await event.save();

    res.status(200).json({
      message: "Successfully registered",
      registeredCount: event.registeredCount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEvents = async (req, res) => {
  const events = await Event.find().populate("society");
  res.json(events);
};

exports.getEventsBySociety = async (req, res) => {
  const events = await Event.find({
    society: req.params.societyId
  }).populate("society");

  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, description, image, date, venue, society } = req.body;

  const event = await Event.create({
    title,
    description,
    image,
    date,
    venue,
    society
  });

  res.status(201).json(event);
};