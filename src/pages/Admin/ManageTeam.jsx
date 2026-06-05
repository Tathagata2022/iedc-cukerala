import React, { useState } from 'react';
import { useTeam } from '../../hooks/useTeam';

const ManageTeam = () => {
  const { leads, inviteLead, revokeLead } = useTeam();
  const [formData, setFormData] = useState({ name: '', role: '', email: '' });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // 1. Save to Firebase as 'pending'
      await inviteLead(formData);

      // 2. Trigger Email (We will connect EmailJS here later!)
      console.log(`✉️ Simulated Email sent to ${formData.email} with setup link.`);
      
      setFormData({ name: '', role: '', email: '' });
      alert("Lead invited successfully!");
    } catch (error) {
      console.error("Error inviting lead:", error);
      alert("Failed to invite lead.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
      {/* Invite Form */}
      <div>
        <h2 className="text-2xl font-bold text-teal-400 mb-4">✉️ Invite New Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" name="name" placeholder="Full Name (e.g., John Doe)" 
            value={formData.name} onChange={handleInputChange} 
            className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required 
          />
          <input 
            type="text" name="role" placeholder="Role (e.g., AI Lead, Web Dev Lead)" 
            value={formData.role} onChange={handleInputChange} 
            className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required 
          />
          <input 
            type="email" name="email" placeholder="Email Address" 
            value={formData.email} onChange={handleInputChange} 
            className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 outline-none" required 
          />
          <button 
            type="submit" disabled={isSending}
            className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-500 transition disabled:opacity-50"
          >
            {isSending ? 'Sending Invite...' : 'Send Setup Invite'}
          </button>
        </form>
      </div>

      {/* Roster & Kill Switch */}
      <div>
        <h2 className="text-2xl font-bold text-teal-400 mb-4">👥 Team Roster</h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {leads.length === 0 ? (
            <p className="text-slate-400">No leads invited yet.</p>
          ) : (
            leads.map(lead => (
              <div key={lead.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center group">
                <div>
                  <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                  <p className="text-sm text-teal-300 font-semibold">{lead.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{lead.email}</p>
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    {lead.status === 'pending' ? (
                      <span className="bg-yellow-900/50 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-700/50">
                        ⏳ Pending Setup
                      </span>
                    ) : (
                      <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded border border-green-700/50">
                        ✅ Active
                      </span>
                    )}
                  </div>
                </div>
                
                {/* The Kill Switch */}
                <button 
                  onClick={() => {
                    if(window.confirm(`Are you sure you want to permanently revoke access for ${lead.name}?`)) {
                      revokeLead(lead.id);
                    }
                  }} 
                  className="bg-red-900/30 text-red-400 px-4 py-2 rounded font-bold border border-red-900/50 hover:bg-red-600 hover:text-white transition opacity-0 group-hover:opacity-100"
                >
                  Revoke
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;