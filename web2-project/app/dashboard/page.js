"use client";
import React from "react";
import EventManagerComponent from "../components/EventManagerComponent";
import { useUserAuth } from "./auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  }

  // Styles
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#F0F4F8", // Soft gray background
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const headingStyle = {
    color: "#102A43", // Dark blue for contrast
    fontSize: "2.4rem",
    margin: "1rem 0",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "4px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer"
  };

  const userInfoStyle = {
    margin: "10px",
    textAlign: "center"
  };

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Upcoming Events</h2>
      <EventManagerComponent />

      {!user && (
        <button onClick={handleSignIn} style={buttonStyle}>Sign In</button>
      )}
      {user && (
        <button onClick={handleSignOut} style={buttonStyle}>Sign Out</button>
      )}

      {user && (
        <div style={userInfoStyle}>
          <p>Logged in as {user.displayName}</p>
          <img src={user.photoURL} alt={user.displayName} style={{ borderRadius: "50%" }} />
        </div>
      )}
    </div>
  );
}
