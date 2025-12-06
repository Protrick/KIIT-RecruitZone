import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import eventsData from "./data/events.json";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  return (
    <div className="p-6 flex flex-wrap">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default Events;
