import React from 'react';
import { fileSystem } from '@/utils/fileSystem';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 font-mono p-6">
      {/* Header */}
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-blue-400 mb-2">Siddharth Singh</h1>
        <p className="text-sm text-gray-400">Full Stack Engineer | System Architect</p>
        <div className="flex gap-4 mt-4">
          <a href="https://github.com" className="p-2 bg-gray-800 rounded-full"><Github size={20} /></a>
          <a href="https://linkedin.com" className="p-2 bg-blue-700 rounded-full"><Linkedin size={20} /></a>
          <a href="mailto:siddharth.s23@iiits.in" className="p-2 bg-green-700 rounded-full"><Mail size={20} /></a>
        </div>
      </div>

      {/* Projects List */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-green-400 mb-4 border-l-4 border-green-400 pl-3">
          ~/projects
        </h2>
        <div className="space-y-4">
          {/* Find projects from your filesystem */}
          {fileSystem.find(f => f.id === 'projects')?.children?.map((proj: any) => (
            <div key={proj.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{proj.data?.title || proj.title}</h3>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
                  {proj.data?.tech?.[0]}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {proj.data?.desc || "System process running..."}
              </p>
              <div className="flex gap-2">
                {proj.data?.liveUrl && (
                  <a href={proj.data.liveUrl} target="_blank" className="text-xs text-green-400 flex items-center gap-1">
                    Live Demo <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-lg font-bold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-3">
          ./skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Python", "TypeScript", "Next.js", "System Arch", "Redis"].map(skill => (
            <span key={skill} className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-xs text-gray-600">
        <p>Mobile View v1.0 | Switch to Desktop for Full OS</p>
      </footer>
    </div>
  );
};

export default MobileLayout;