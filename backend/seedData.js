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
    title: "AI & Machine Learning Bootcamp",
    description: "Hands-on workshop covering ML models, neural networks and real-world AI applications.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    logo: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
    societyName: "Tech Society",
    category: "Technology",
    venue: "Innovation Lab",
    date: "10 April 2026",
    time: "11:00 AM"
  },
  {
    title: "Hackathon 2026",
    description: "24-hour coding challenge to solve real-world problems.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    logo: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
    societyName: "Tech Society",
    category: "Technology",
    venue: "Computer Center",
    date: "15 April 2026",
    time: "9:00 AM"
  },
  {
    title: "Dance Fiesta",
    description: "An electrifying dance competition featuring solo and group performances.",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e",
    logo: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
    societyName: "Cultural Club",
    category: "Cultural",
    venue: "Open Air Theatre",
    date: "18 April 2026",
    time: "6:00 PM"
  },
  {
    title: "Music Night Live",
    description: "Experience live band performances and acoustic sessions.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    logo: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
    societyName: "Music Society",
    category: "Cultural",
    venue: "Main Auditorium",
    date: "22 April 2026",
    time: "7:00 PM"
  },
  {
    title: "Startup Networking Meetup",
    description: "Connect with entrepreneurs and investors to discuss innovative ideas.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    societyName: "Entrepreneurship Cell",
    category: "Business",
    venue: "Seminar Hall 2",
    date: "25 April 2026",
    time: "3:00 PM"
  },
  {
    title: "Finance & Investment Workshop",
    description: "Learn stock market basics and investment strategies.",
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b",
    logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    societyName: "Finance Club",
    category: "Business",
    venue: "Room 301",
    date: "28 April 2026",
    time: "1:00 PM"
  },
  {
    title: "Photography Walk",
    description: "Capture campus life and improve your photography skills.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    logo: "https://cdn-icons-png.flaticon.com/512/3063/3063828.png",
    societyName: "Photography Club",
    category: "Creative",
    venue: "Campus Garden",
    date: "2 May 2026",
    time: "4:00 PM"
  },
  {
    title: "Robotics Competition",
    description: "Build and compete with your own robot in an obstacle challenge.",
    image: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b",
    logo: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
    societyName: "Robotics Society",
    category: "Technology",
    venue: "Engineering Block",
    date: "6 May 2026",
    time: "10:00 AM"
  },
  {
    title: "Drama & Theatre Fest",
    description: "A showcase of dramatic performances by talented students.",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980",
    logo: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
    societyName: "Drama Club",
    category: "Cultural",
    venue: "Auditorium Hall",
    date: "10 May 2026",
    time: "5:30 PM"
  },
  {
    title: "Cybersecurity Awareness Seminar",
    description: "Learn ethical hacking basics and cybersecurity practices.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    logo: "https://cdn-icons-png.flaticon.com/512/2721/2721293.png",
    societyName: "Cyber Security Club",
    category: "Technology",
    venue: "IT Lab",
    date: "15 May 2026",
    time: "12:00 PM"
  }
    ]);

    console.log("Database Seeded Successfully 🚀");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();