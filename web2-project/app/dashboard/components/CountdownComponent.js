"use client";

import React, { useState, useEffect } from 'react';

export default function CountdownComponent({ eventName, eventDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventTime = new Date(eventDate);
      const difference = eventTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Event has passed");
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately on component mount

    return () => clearInterval(interval);
  }, [eventDate]);
  
  return (
    <div>
      <h3>{eventName}</h3>
      <p>{timeLeft}</p>
    </div>
  );
}
