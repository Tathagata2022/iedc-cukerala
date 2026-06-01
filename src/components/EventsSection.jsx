import React from 'react';
import { useEvents } from '../hooks/useEvents';

const EventsSection = () => {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <section className="py-20 border-b border-slate-800">
        <h2 className="text-4xl font-bold gradient-text mb-12 text-center">Upcoming Events</h2>
        <div className="text-center text-slate-400">Loading events...</div>
      </section>
    );
  }

  return (
    <section className="py-20 border-b border-slate-800">
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">📅 Upcoming Events</h2>

      {events.length === 0 ? (
        <div className="text-center text-slate-400">
          <p>No upcoming events. Check back soon for exciting opportunities!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="glass-card rounded-lg overflow-hidden hover:border-purple-500 transition group">
              {event.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-xl font-bold text-purple-400 flex-1">{event.title}</h3>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded whitespace-nowrap">
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                  <span>📅 {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                  <span>🕐 {event.time}</span>
                </div>
                <p className="text-slate-300 line-clamp-3">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventsSection;