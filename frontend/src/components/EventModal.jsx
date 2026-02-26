import { useEffect } from "react";
import { registerForEvent } from "../api/societyApi";


const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRegister = async () => {
  try {
    const response = await registerForEvent(event._id);
    alert("Registered Successfully 🎉");
    onClose();
  } catch (error) {
    console.error(error);
    alert("Registration Failed ❌");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-[95%] md:w-[600px] z-50">

        {/* Image */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-3xl"
          />

          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* ✅ Society Logo + Name Added */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
              <img
                src={event.logo}
                alt={event.societyName}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#1FAA59] font-semibold uppercase tracking-wide">
              {event.societyName}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {event.title}
          </h2>

          {/* Event Info */}
          <div className="bg-[#1FAA59]/10 rounded-xl p-4 mb-5 text-sm text-gray-700 space-y-2">
            <p><strong>Date:</strong> Oct 25, 2024</p>
            <p><strong>Time:</strong> 10:00 - 16:00</p>
            <p><strong>Venue:</strong> Engineering Hall</p>
            <p><strong>Organizer:</strong> Dr. S. Jenkins</p>
          </div>

          {/* About */}
          <h3 className="font-semibold text-gray-800 mb-2">
            About the Event
          </h3>

          <p className="text-gray-600 text-sm mb-5">
            {event.description} This event brings together brilliant minds
            to explore innovation, robotics, AI and entrepreneurship.
          </p>

          {/* Highlights */}
          <h3 className="font-semibold text-gray-800 mb-2">
            Event Highlights
          </h3>

          <ul className="text-gray-600 text-sm space-y-2 mb-6">
            <li>✔ Keynote session by industry leaders</li>
            <li>✔ Live demonstrations</li>
            <li>✔ Networking opportunities</li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 border border-[#1FAA59] text-[#1FAA59] py-2 rounded-xl font-medium hover:bg-[#1FAA59] hover:text-white transition"
            >
              Close
            </button>

            <button onClick={handleRegister} className="flex-1 bg-gradient-to-r from-[#1FAA59] to-[#178f4a] text-white py-2 rounded-xl font-medium shadow-lg shadow-[#1FAA59]/25 hover:opacity-90 transition">
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventModal;