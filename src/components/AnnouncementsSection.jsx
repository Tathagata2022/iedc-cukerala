import React from 'react';
import { useAnnouncements } from '../hooks/useAnnouncements';

const AnnouncementsSection = () => {
  const { announcements, loading } = useAnnouncements();

  if (loading) {
    return (
      <section className="py-20 border-b border-slate-800">
        <h2 className="text-4xl font-bold gradient-text mb-12 text-center">Announcements</h2>
        <div className="text-center text-slate-400">Loading announcements...</div>
      </section>
    );
  }

  return (
    <section className="py-20 border-b border-slate-800">
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">📢 Announcements</h2>

      {announcements.length === 0 ? (
        <div className="text-center text-slate-400">
          <p>No announcements at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map(announcement => (
            <div key={announcement.id} className="glass-card p-6 rounded-lg hover:border-purple-500 transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-purple-400 flex-1">{announcement.title}</h3>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                📅 {new Date(announcement.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-slate-300 leading-relaxed">{announcement.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AnnouncementsSection;