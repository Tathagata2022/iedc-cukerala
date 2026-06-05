import React, { useState } from 'react';
import { usePastEvents } from '../../hooks/usePastEvents';

const ManagePastEvents = () => {
  const { pastEvents, addPastEvent, updatePastEvent, deletePastEvent, loading } = usePastEvents();
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', coverImageUrl: '', driveLink: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePastEvent(editingId, formData);
      setEditingId(null);
    } else {
      await addPastEvent(formData);
    }
    setFormData({ title: '', description: '', date: '', coverImageUrl: '', driveLink: '' });
  };

  const handleEdit = (event) => {
    setFormData({ ...event });
    setEditingId(event.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-12 border-t border-slate-800">
      {/* Form */}
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          {editingId ? '✏️ Edit Past Event' : '📸 Add Past Event & Gallery'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required />
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required />
          <textarea name="description" placeholder="How was the event? What happened?" value={formData.description} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none min-h-24" required />
          <input type="url" name="coverImageUrl" placeholder="Cover Image URL (e.g. from Imgur)" value={formData.coverImageUrl} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required />
          <input type="url" name="driveLink" placeholder="Google Drive Folder Link (Make sure access is 'Anyone with link')" value={formData.driveLink} onChange={handleInputChange} className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required />
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Past Event' : 'Save Past Event'}
          </button>
        </form>
      </div>

      {/* List */}
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Archive ({pastEvents.length})</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pastEvents.map(event => (
            <div key={event.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white">{event.title}</h3>
                <p className="text-xs text-slate-400">{event.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className="bg-slate-700 text-white px-3 py-1 rounded text-sm hover:bg-slate-600">Edit</button>
                <button onClick={() => deletePastEvent(event.id)} className="bg-red-900/50 text-red-400 px-3 py-1 rounded text-sm hover:bg-red-600 hover:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePastEvents;