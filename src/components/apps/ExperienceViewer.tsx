import React from 'react';
import { Calendar, Briefcase, ChevronRight, Hash, MapPin } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Software Developer Intern",
    company: "Onlearn.app",
    location: "Remote",
    date: "Jan 2026 - Present",
    desc: [
      "Driving product growth and user engagement strategies through scalable full-stack development.",
      "Optimizing platform performance and implementing new features to enhance user retention and reduce latency."
    ],
    tech: ["Next.js", "Full-Stack", "Optimization"]
  },
  {
    id: 2,
    role: "SDE Intern",
    company: "Qbtrix Innovations",
    location: "Remote",
    date: "July 2024 - Aug 2024",
    desc: [
      "Developed Interacly, an interactive LLM-based platform, utilizing full-stack technologies.",
      "Optimized backend API performance and integrated generative AI models for real-time, context-aware responses."
    ],
    tech: ["Generative AI", "Backend API", "LLMs"]
  }
];

const ExperienceViewer = () => {
  return (
    <div className="h-full bg-[#1e1e1e] text-gray-300 font-mono p-6 overflow-y-auto selection:bg-blue-500 selection:text-white">
      <div className="border-b border-gray-700 pb-4 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase size={20} className="text-blue-400" /> /var/log/experience
          </h2>
          <p className="text-xs text-gray-500 mt-1">Total entries: {experiences.length} | User: siddharth</p>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:h-full before:w-px before:bg-gray-800">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8">
            <div className="absolute left-0 top-1.5 w-4 h-4 bg-[#1e1e1e] border-2 border-blue-500 rounded-full z-10"></div>
            
            <div className="bg-white/5 border border-white/5 p-4 rounded-lg hover:border-blue-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-blue-300 text-sm font-bold flex items-center gap-2">
                    @ {exp.company}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-400 bg-black/30 px-2 py-1 rounded mb-1">
                    <Calendar size={12} /> {exp.date}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-end gap-1">
                     <MapPin size={10} /> {exp.location}
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.desc.map((item, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <ChevronRight size={14} className="mt-0.5 text-gray-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                {exp.tech.map(t => (
                  <span key={t} className="text-xs flex items-center gap-1 text-gray-500 bg-black/20 px-2 py-1 rounded">
                    <Hash size={10} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-xs text-gray-600 italic">[END OF LOGS]</div>
    </div>
  );
};

export default ExperienceViewer;