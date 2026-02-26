const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventsBySociety,
  createEvent,
  registerForEvent   // 👈 add this
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/society/:societyId", getEventsBySociety);
router.post("/", createEvent);

// ✅ Register for event
router.post("/register/:eventId", registerForEvent);

module.exports = router;