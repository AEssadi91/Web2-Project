
"use client";
import React, { useEffect, useState } from "react";
import { addEvent, getEvents, deleteEvent } from "../_services/event-service"; // Include deleteEvent
import CountdownComponent from "./CountdownComponent";

export default function EventManagerComponent() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [showFamousEvents, setShowFamousEvents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

  const fEvents = [
    { eventName: "New Year's Day", eventDate: "2024-01-01" },
    { eventName: "Valentine's Day", eventDate: "2024-02-14" },
    { eventName: "St. Patrick's Day", eventDate: "2024-03-17" },
    { eventName: "Easter", eventDate: "2024-04-09" },
    { eventName: "Earth Day", eventDate: "2024-04-22" },
    { eventName: "Independence Day", eventDate: "2024-07-04" },
    { eventName: "Labor Day", eventDate: "2024-09-02" },
    { eventName: "Halloween", eventDate: "2024-10-31" },
    { eventName: "Thanksgiving", eventDate: "2024-11-28" },
    { eventName: "Christmas", eventDate: "2024-12-25" },
    // Add more events as needed
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate submission start
    try {
      const newEvent = { eventName, eventDate };
      const eventId = await addEvent(newEvent);
      setEvents([...events, { ...newEvent, id: eventId }]);
      setEventName("");
      setEventDate("");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
    setIsSubmitting(false); // Indicate submission end
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const toggleFamousEvents = () => setShowFamousEvents(!showFamousEvents);

  // Styling
  const formStyle = {
    padding: "20px",
    backgroundColor: "#ffffff", // White background
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    margin: "20px auto",
    width: "80%",
    maxWidth: "500px",
  };

  const inputStyle = {
    padding: "8px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "calc(100% - 22px)",
  };

  const buttonStyle = {
    padding: "10px 15px",
    margin: "10px 0",
    border: "1px solid #007bff",
    borderRadius: "4px",
    backgroundColor: "#007bff", // Bright blue
    color: "white",
    cursor: "pointer",
    width: "100%",
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "007bff",
    color: "black",
    marginTop: "20px",
  };

  const countdownContainerStyle = {
    marginTop: "20px",
    width: "80%",
    margin: "0 auto",
  };

  const countdownItemStyle = {
    backgroundColor: "#f0f0f0", // Light grey
    padding: "15px",
    margin: "10px 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    textAlign: "center",
    color: "#333", // Dark grey text for contrast
    width: "100%",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Red color for delete button
  };

 return (
  <div>
    <form onSubmit={handleAddEvent} style={formStyle}>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
        style={inputStyle}
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle} disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Event"}
      </button>
    </form>

    <button onClick={toggleFamousEvents} style={toggleButtonStyle}>
      {showFamousEvents ? "Hide Events" : "Show Events"}
    </button>

    <div style={countdownContainerStyle}>
      {showFamousEvents && fEvents.map((event, index) => (
        <div style={countdownItemStyle} key={`famous-${index}`}>
          <CountdownComponent
            eventName={event.eventName}
            eventDate={event.eventDate}
          />
        </div>
      ))}

      {events.map((event, index) => (
        <div style={countdownItemStyle} key={`user-${index}`}>
          <CountdownComponent
            eventName={event.eventName}
            eventDate={event.eventDate}
          />
          <button style={deleteButtonStyle} onClick={() => handleDeleteEvent(event.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
