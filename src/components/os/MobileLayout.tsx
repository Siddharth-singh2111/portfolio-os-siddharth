import React from 'react';
import { fileSystem } from '@/utils/fileSystem';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 font-mono p-6">
      {/* Header */}
      <div className="mb-8 border-b border-gray-800 pb-6 text-center pt-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2 tracking-tight">Siddharth Singh</h1>
        <p className="text-sm text-gray-400 font-medium">Full Stack Engineer | System Architect</p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <Github size={22} className="text-gray-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-900/50 hover:bg-blue-800/70 rounded-xl border border-blue-800 transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <Linkedin size={22} className="text-blue-300" />
          </a>
          <a href="mailto:siddharth.s23@iiits.in" className="p-3 bg-green-900/50 hover:bg-green-800/70 rounded-xl border border-green-800 transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            <Mail size={22} className="text-green-300" />
          </a>
        </div>
      </div>

      {/* Projects List */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-3 before:content-['~/'] before:text-gray-600">
          projects
        </h2>
        <div className="space-y-5">
          {fileSystem.find(f => f.id === 'projects')?.children?.map((proj: any) => (
            <div key={proj.id} className="bg-[#151515] border border-gray-800 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-100">{proj.data?.title || proj.title}</h3>
                {proj.data?.tech?.[0] && (
                  <span className="text-[10px] font-medium bg-blue-950/80 text-blue-300 px-2.5 py-1 rounded-full border border-blue-900/50 uppercase tracking-wider">
                    {proj.data.tech[0]}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                {proj.data?.desc || "System process running..."}
              </p>
              <div className="flex gap-4">
                {proj.data?.liveUrl && (
                  <a href={proj.data.liveUrl} target="_blank" className="text-xs font-bold text-green-400 flex items-center gap-1 hover:underline">
                    Live Demo <ArrowRight size={14} />
                  </a>
                )}
                {proj.data?.repoUrl && (
                   <a href={proj.data.repoUrl} target="_blank" className="text-xs font-bold text-gray-400 flex items-center gap-1 hover:underline">
                    Source Code <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-3 before:content-['./'] before:text-gray-600">
          skills_matrix
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {["Python", "TypeScript", "C++", "Next.js", "FastAPI", "Docker", "K8s", "Redis", "RAG Architecture"].map(skill => (
            <span key={skill} className="bg-[#1a1a1a] text-xs font-medium text-gray-300 px-3.5 py-1.5 rounded-lg border border-gray-800/80 shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <footer className="mt-16 pb-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
        <p>/// Mobile Terminal v1.0.4 ///</p>
        <p className="mt-1">System Architect: Siddharth Singh</p>
      </footer>
    </div>
  );
};

export default MobileLayout;