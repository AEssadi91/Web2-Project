"use client";
import React from "react";
import EventManagerComponent from "./components/EventManagerComponent";
import { useUserAuth } from "./_utils/auth-context";


export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

  // Styles
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#F0F4F8",
    fontFamily: "Segoe UI",
    color: "#333",
    padding: "20px",
  };

  const headingStyle = {
    color: "#102A43",
    fontSize: "2.4rem",
    margin: "20px 0",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "10px",
    fontWeight: "bold",
  };

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    margin: "20px",
    color: "#333",
  };

  const userImageStyle = {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
  };

  return (
    <div style={pageStyle}>
      <h1>Welcome to TickTock Countdown</h1>
      {user ? (
        <div style={userInfoStyle}>
          <p>Welcome back, {user.displayName}!</p>
          <img src={user.photoURL} alt={user.displayName} style={userImageStyle} />
          <h2 style={headingStyle}>Upcoming Events</h2>
          <EventManagerComponent />
          <button style={{ ...buttonStyle, backgroundColor: "#f44336" }} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>Please sign in to manage your events.</p>
          <button style={buttonStyle} onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
