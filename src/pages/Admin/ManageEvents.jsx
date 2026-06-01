import React, { useState } from 'react';
import { useEvents } from '../../hooks/useEvents';

const ManageEvents = () => {
  const { events, addEvent, updateEvent, deleteEvent, loading } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    imageUrl: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        setEditingId(null);
      } else {
        await addEvent(formData);
      }
      setFormData({ title: '', description: '', date: '', time: '', imageUrl: '', category: '' });
    } catch (error) {
      setSubmitError('Error: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      imageUrl: event.imageUrl,
      category: event.category
    });
    setEditingId(event.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(eventId);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', time: '', imageUrl: '', category: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="h-fit">
        <h2 className="text-2xl font-bold gradient-text mb-4">
          {editingId ? '✏️ Edit Event' : '➕ Add New Event'}
        </h2>

        {submitError && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Workshop on AI"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Event details and information"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition min-h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
              required
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <p className="text-xs text-slate-400 mb-2">Preview:</p>
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded border border-slate-700"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Category *</label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Workshop, Seminar, Bootcamp"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 gradient-button text-white font-bold py-3 rounded hover:opacity-90 transition"
            >
              {editingId ? '💾 Update Event' : '✚ Add Event'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="h-fit">
        <h2 className="text-2xl font-bold gradient-text mb-4">
          📋 Events ({events.length})
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="glass-card p-6 rounded-lg text-center">
            <p className="text-slate-400">No events yet. Create your first event!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events.map(event => (
              <div key={event.id} className="bg-slate-800 p-4 rounded border border-slate-700 hover:border-purple-500 transition">
                <h3 className="font-bold text-white mb-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>📅 {event.date}</span>
                  <span>🕐 {event.time}</span>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">{event.category}</span>
                </div>
                <p className="text-sm text-slate-300 mb-3 line-clamp-2">{event.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;