import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';

const ContactApp = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => setSent(true), 1000);
  };

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-green-400 p-6 text-center">
        <Send size={48} className="mb-4" />
        <h2 className="text-xl font-bold">Message Sent</h2>
        <p className="text-sm mt-2 text-gray-400">I will respond to your frequency shortly.</p>
        <button onClick={() => setSent(false)} className="mt-6 text-xs underline">Send another</button>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col font-mono">
      <div className="bg-[#252526] p-2 border-b border-black flex items-center gap-2 text-xs text-gray-400">
        <Mail size={14} /> 
        <span>Compose: New Message</span>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-400">TO:</label>
          <input type="text" value="siddharth.s23@iiits.in" disabled className="bg-black/20 border border-gray-700 p-2 text-sm text-gray-400 rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-blue-400">SUBJECT:</label>
          <input type="text" placeholder="Project Inquiry / Job Opportunity" className="bg-black/20 border border-gray-700 p-2 text-sm text-white rounded focus:border-blue-500 outline-none" required />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-blue-400">MESSAGE:</label>
          <textarea placeholder="Write your message..." className="flex-1 bg-black/20 border border-gray-700 p-2 text-sm text-white rounded focus:border-blue-500 outline-none resize-none" required />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2">
            <Send size={14} /> SEND MAIL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactApp;