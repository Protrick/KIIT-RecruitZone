import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 m-2 w-64">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-500">Organized by: {event.society}</p>
      <p className="text-sm text-gray-500">Date: {event.date}</p>
    </div>
  );
};

export default EventCard;
