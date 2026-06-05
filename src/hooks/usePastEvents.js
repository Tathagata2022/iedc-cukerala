import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const usePastEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We still ask Firebase to sort it first
    const q = query(collection(db, 'pastEvents'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      // FORCE REACT TO DOUBLE-CHECK THE SORTING (Newest First)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); 

      setPastEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPastEvent = async (eventData) => {
    await addDoc(collection(db, 'pastEvents'), eventData);
  };

  const updatePastEvent = async (id, eventData) => {
    const eventRef = doc(db, 'pastEvents', id);
    await updateDoc(eventRef, eventData);
  };

  const deletePastEvent = async (id) => {
    const eventRef = doc(db, 'pastEvents', id);
    await deleteDoc(eventRef);
  };

  return { pastEvents, addPastEvent, updatePastEvent, deletePastEvent, loading };
};