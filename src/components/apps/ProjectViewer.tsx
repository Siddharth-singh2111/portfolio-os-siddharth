import React from 'react';
import { fileSystem } from '@/utils/fileSystem';
import { Activity, Server, Globe, ExternalLink } from 'lucide-react';

interface ProjectViewerProps {
  projectId: string;
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({ projectId }) => {
  // Helper to find the project data deeply nested in the fileSystem
  const findProject = (items: any[]): any => {
    for (const item of items) {
      if (item.id === projectId) return item;
      if (item.children) {
        const found = findProject(item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const project = findProject(fileSystem);

  if (!project) return <div className="text-red-500 p-4 font-mono">404: Process Not Found</div>;
  
  // Destructure the new URL fields here
  const { tagline, tech, desc, liveUrl, repoUrl } = project.data;

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] text-green-400 font-mono p-6 overflow-y-auto">
      {/* Header Status */}
      <div className="border-b border-green-900/50 pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{project.title}</h1>
          <p className="text-sm text-gray-500">PID: {Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-800 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-green-400">RUNNING</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Panel 1: Tech Stack */}
        <div className="col-span-1 bg-white/5 p-4 rounded border border-white/10">
          <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Server size={12} /> Dependencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {tech && tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-black border border-gray-700 text-xs text-blue-300 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Panel 2: Description */}
        <div className="col-span-1 md:col-span-2 bg-white/5 p-4 rounded border border-white/10">
           <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Activity size={12} /> System Logs
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {tagline}
            <br /><br />
            <span className="text-gray-500">{">"}</span> {desc}
          </p>
        </div>
      </div>

      {/* Footer Actions (Links) */}
      <div className="mt-auto pt-6 border-t border-gray-800 flex justify-end gap-4">
        {liveUrl && (
          <button 
            onClick={() => window.open(liveUrl, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded transition-colors"
          >
            <Globe size={14} /> Launch Demo
          </button>
        )}
        
        {repoUrl && (
          <button 
            onClick={() => window.open(repoUrl, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded transition-colors"
          >
            <ExternalLink size={14} /> View Source
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectViewer;