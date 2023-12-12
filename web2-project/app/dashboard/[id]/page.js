"use client";

import { useState, useEffect } from "react";
import { getEvent } from "../_services/event-service"; // Ensure this path is correct for your project

export default function Page({ params }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEvent(params.id); // Assume params.id is the ID of the event
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [params.id]); // Ensure the dependency array is correct for your use case

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <main>
      <h1 className="text-4xl font-bold m-6 text-center">
        {event.eventName}
      </h1>
      <div className="text-xl m-6">
        Event Date: {event.eventDate}
      </div>
    </main>
  );
}
