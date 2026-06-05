import React, { useState } from 'react';
import { usePastEvents } from '../hooks/usePastEvents';

const PastEventsSection = () => {
  const { pastEvents, loading } = usePastEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) return null; // Don't show anything while loading
  if (pastEvents.length === 0) return null; // Hide section if no past events

  return (
    <section className="py-20 border-b border-slate-800">
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">📸 Past Events & Gallery</h2>

      {/* CHANGED: Made the grid 2 columns max (lg:grid-cols-2) and increased the gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {pastEvents.map(event => (
          <div 
            key={event.id} 
            onClick={() => setSelectedEvent(event)}
            className="glass-card rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition group relative shadow-lg"
          >
            {/* CHANGED: Increased image height to h-72 (much taller!) */}
            <div className="h-72 overflow-hidden">
              <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              {/* CHANGED: Made the text larger (text-2xl) */}
              <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-base text-blue-300 font-semibold">📅 {event.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- POPUP MODAL (Kept exactly the same) --- */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div 
            className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()} 
          >
            <img src={selectedEvent.coverImageUrl} alt="Cover" className="w-full h-72 object-cover" />
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
              <p className="text-slate-400 mb-6">📅 Conducted on: {selectedEvent.date}</p>
              <p className="text-slate-300 mb-8 whitespace-pre-line leading-relaxed">{selectedEvent.description}</p>
              
              <div className="flex gap-4">
                <a 
                  href={selectedEvent.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center font-bold py-3 rounded-lg hover:bg-blue-500 transition shadow-lg"
                >
                  📸 View Full Photo Gallery
                </a>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 bg-slate-800 text-slate-300 font-bold rounded-lg hover:bg-slate-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PastEventsSection;