import { db } from "../_utils/firebase"; // import Firebase config
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

// Fetch all events
export const getEvents = async () => {
  try {
    const eventsCollectionRef = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollectionRef);
    const mappedEvents = eventsSnapshot.docs.map((eventDoc) => ({
      id: eventDoc.id,
      ...eventDoc.data(),
    }));

    return mappedEvents;
  } catch (error) {
    console.error("Error in getEvents: ", error);
  }
};

// Fetch a single event by id
export const getEvent = async (id) => {
  try {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getEvent: ", error);
  }
};

// Add a new event
export const addEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), eventData);
    return docRef.id;
  } catch (error) {
    console.error("Error in addEvent: ", error);
  }
};

// Update an event
export const updateEvent = async (id, eventData) => {
  try {
    const docRef = doc(db, "events", id);
    await setDoc(docRef, eventData);
  } catch (error) {
    console.error("Error in updateEvent: ", error);
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error in deleteEvent: ", error);
  }
};
