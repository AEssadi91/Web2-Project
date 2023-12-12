import React, { useState } from "react";
import CountdownComponent from "./CountdownComponent";

export default function EventManagerComponent() {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [showFamousEvents, setShowFamousEvents] = useState(false);

    // Famous events
    const fEvents = [
        { eventName: "Christmas", eventDate: "2023-12-25" },
        { eventName: "Thanksgiving", eventDate: "2023-11-24" },
        { eventName: "New Year's Day", eventDate: "2024-01-01" },
        { eventName: "Independence Day", eventDate: "2023-07-04" },
        { eventName: "Valentine's Day", eventDate: "2023-02-14" },
        { eventName: "Halloween", eventDate: "2023-10-31" },
        { eventName: "Labor Day", eventDate: "2023-09-04" }
    ];

    const addEvent = (e) => {
        e.preventDefault();
        setEvents(prevEvents => [...prevEvents, { eventName, eventDate }]);
        setEventName('');
        setEventDate('');
    };

    const toggleFamousEvents = () => {
        setShowFamousEvents(!showFamousEvents);
    };

    // Modern Styling
    const formStyle = {
        padding: '20px',
        backgroundColor: '#ffffff', // White background
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        margin: '20px auto',
        width: '80%',
        maxWidth: '500px'
    };

    const inputStyle = {
        padding: '8px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: 'calc(100% - 22px)'
    };

    const buttonStyle = {
        padding: '10px 15px',
        margin: '10px 0',
        border: '1px solid #007bff',
        borderRadius: '4px',
        backgroundColor: '#007bff', // Bright blue
        color: 'white',
        cursor: 'pointer',
        width: '100%'
    };

    const toggleButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'lightgray',
        color: 'black',
        marginTop: '20px'
    };

    const countdownContainerStyle = {
        marginTop: '20px',
        width: '80%',
        margin: '0 auto'
    };

    const countdownItemStyle = {
        backgroundColor: '#f0f0f0', // Light grey
        padding: '15px',
        margin: '10px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        borderRadius: '5px',
        textAlign: 'center',
        color: '#333', // Dark grey text for contrast
        width: '100%'
    };

    return (
        <div>
            <form onSubmit={addEvent} style={formStyle}>
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
                <button type="submit" style={buttonStyle}>Add Event</button>
            </form>

            <button onClick={toggleFamousEvents} style={toggleButtonStyle}>Events</button>

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
                    </div>
                ))}
            </div>
        </div>
    );
}
