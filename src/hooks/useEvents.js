import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new event
  const addEvent = async (eventData) => {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: new Date(),
      });
      await fetchEvents(); // Refresh list
      return docRef.id;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  // Update event
  const updateEvent = async (eventId, eventData) => {
    try {
      await updateDoc(doc(db, 'events', eventId), eventData);
      await fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      await fetchEvents(); // Refresh list
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, addEvent, updateEvent, deleteEvent, fetchEvents };
};