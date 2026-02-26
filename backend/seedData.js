const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

const seedEvents = async () => {
  try {
    await Event.deleteMany();

    await Event.insertMany([
      {
        title: "Tech Symposium 2026",
        description:
          "Join us for an exciting tech symposium featuring AI, Web3 and Cybersecurity.",
        image:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
        logo:
          "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
        societyName: "Tech Society",
        category: "Technology",
        venue: "Main Auditorium",
        date: "12 March 2026",
        time: "10:00 AM",
      },
      {
        title: "Cultural Fest 2026",
        description:
          "Celebrate diversity through dance, music, drama and art.",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        logo:
          "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
        societyName: "Cultural Club",
        category: "Cultural",
        venue: "Open Ground",
        date: "20 March 2026",
        time: "5:00 PM",
      },
      {
        title: "Startup Pitch Day",
        description:
          "Pitch your innovative startup ideas to industry mentors.",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        logo:
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        societyName: "Entrepreneurship Cell",
        category: "Business",
        venue: "Seminar Hall",
        date: "25 March 2026",
        time: "2:00 PM",
      },
    ]);

    console.log("Database Seeded Successfully 🚀");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();