import React, { useState } from 'react';
import { useAnnouncements } from '../../hooks/useAnnouncements';

const ManageAnnouncements = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, loading } = useAnnouncements();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
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
        await updateAnnouncement(editingId, formData);
        setEditingId(null);
      } else {
        await addAnnouncement(formData);
      }
      setFormData({ title: '', description: '', date: '' });
    } catch (error) {
      setSubmitError('Error: ' + error.message);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      description: announcement.description,
      date: announcement.date
    });
    setEditingId(announcement.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await deleteAnnouncement(announcementId);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', date: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="h-fit">
        <h2 className="text-2xl font-bold gradient-text mb-4">
          {editingId ? '✏️ Edit Announcement' : '➕ Add New Announcement'}
        </h2>

        {submitError && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Announcement Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., New Partnership Announcement"
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
              placeholder="Announcement details and information"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-purple-500 outline-none transition min-h-24"
              required
            />
          </div>

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

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 gradient-button text-white font-bold py-3 rounded hover:opacity-90 transition"
            >
              {editingId ? '💾 Update Announcement' : '✚ Add Announcement'}
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

      {/* Announcements List */}
      <div className="h-fit">
        <h2 className="text-2xl font-bold gradient-text mb-4">
          📢 Announcements ({announcements.length})
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="glass-card p-6 rounded-lg text-center">
            <p className="text-slate-400">No announcements yet. Create your first one!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {announcements.map(announcement => (
              <div key={announcement.id} className="bg-slate-800 p-4 rounded border border-slate-700 hover:border-purple-500 transition">
                <h3 className="font-bold text-white mb-1">{announcement.title}</h3>
                <p className="text-xs text-slate-400 mb-2">📅 {announcement.date}</p>
                <p className="text-sm text-slate-300 mb-3 line-clamp-2">{announcement.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
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

export default ManageAnnouncements;