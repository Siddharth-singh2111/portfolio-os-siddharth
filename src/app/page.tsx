"use client";

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import WindowFrame from '@/components/os/WindowFrame';
import { fileSystem } from '@/utils/fileSystem';
import FolderViewer from '@/components/apps/FolderViewer';
import ProjectViewer from '@/components/apps/ProjectViewer';
import SkillsViewer from '@/components/apps/SkillsViewer';
import Terminal from '@/components/apps/Terminal';
import PDFViewer from '@/components/apps/PDFViewer';
import ContextMenu from '@/components/os/ContextMenu'; // <--- Added Import
import { Github, Linkedin, Power } from 'lucide-react';

export default function Desktop() {
  const { windows, openWindow } = useOSStore();
  
  // State for Right-Click Menu
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; itemId: string } | null>(null);
  
  const [booting, setBooting] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const handleShutdown = () => {
    setStartMenuOpen(false);
    setBooting(true); // Triggers the black BIOS screen again
  };

  // BIOS Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000); // Speed up boot slightly for dev
    return () => clearTimeout(timer);
  }, []);

  // Close context menu on global click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (booting) {
    return (
      <div className="bg-black h-screen w-screen text-green-500 font-mono p-10 text-lg flex flex-col gap-2">
        <p>BIOS Version 1.0.4 | IIIT Sri City Firmware</p>
        <p className="mt-2">Checking Memory... 16384MB OK</p>
        <p>Mounting Virtual File System... OK</p>
        <p>Loading Kernel (Siddharth_OS)... OK</p>
        <p className="animate-pulse mt-4">_</p>
      </div>
    );
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative selection:bg-pink-500 selection:text-white"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onContextMenu={(e) => { e.preventDefault(); /* Prevent default browser menu on desktop */ }}
    >
      {/* Desktop Icons Grid */}
      <div className="grid grid-flow-col grid-rows-6 gap-8 p-8 w-max h-full">
        {fileSystem.map((item) => (
          <div 
            key={item.id}
            onDoubleClick={() => openWindow(item.id, item.title, item.type === 'folder' ? 'FolderViewer' : item.component || 'TextViewer')}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContextMenu({ x: e.pageX, y: e.pageY, itemId: item.id });
            }}
            className="flex flex-col items-center gap-2 group w-24 cursor-pointer"
          >
            <div className="w-14 h-14 bg-black/20 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-lg">
              <item.icon size={28} className="text-blue-200 group-hover:text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs text-white font-medium bg-black/40 px-2 py-0.5 rounded shadow-sm text-center line-clamp-2">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Window Manager Layer */}
      {windows.map((win) => (
        <WindowFrame key={win.id} id={win.id} title={win.title} zIndex={win.zIndex}>
          
          {/* RENDER CONTENT DYNAMICALLY */}
          {win.componentType === 'FolderViewer' && <FolderViewer folderId={win.id} />}
          {win.componentType === 'Terminal' && <Terminal />}
          {win.componentType === 'PDFViewer' && <PDFViewer />}
          {win.componentType === 'ProjectViewer' && <ProjectViewer projectId={win.id} />}
          {win.componentType === 'SkillsViewer' && <SkillsViewer />}

          {win.componentType === 'TextViewer' && (
            <div className="p-6 text-gray-300 font-mono leading-relaxed selection:bg-yellow-500 selection:text-black">
              <h2 className="text-xl text-white font-bold mb-6 flex items-center gap-3">
                 📝 {win.title}
              </h2>
              <div className="bg-black/30 p-4 rounded border border-white/5">
                <p className="mb-4"><span className="text-blue-400">const</span> <span className="text-yellow-400">aboutMe</span> = {'{'}</p>
                <div className="pl-6 space-y-2">
                  <p>name: <span className="text-green-400">"Siddharth Singh"</span>,</p>
                  <p>role: <span className="text-green-400">"Full Stack Engineer"</span>,</p>
                  <p>college: <span className="text-green-400">"IIIT Sri City"</span>,</p>
                  <p>current_focus: [<span className="text-green-400">"System Architecture"</span>, <span className="text-green-400">"Microservices"</span>]</p>
                </div>
                <p className="mt-4">{'};'}</p>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                 // Driven by solving complex engineering problems. 
                 // Currently building CowResQ and optimizing RAG pipelines.
              </p>
            </div>
          )}
        </WindowFrame>
      ))}

      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div className="absolute bottom-12 left-0 w-64 bg-[#1e1e1e] border border-gray-700 shadow-2xl rounded-tr-lg overflow-hidden z-50">
          <div className="bg-blue-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-700 text-lg">S</div>
            <div>
              <div className="text-white font-bold text-sm">Siddharth Singh</div>
              <div className="text-blue-200 text-xs">Administrator</div>
            </div>
          </div>
          <div className="py-2">
             <div className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-3 text-gray-200 text-sm"
                  onClick={() => window.open('https://github.com', '_blank')}>
                <Github size={16} /> GitHub Profile
             </div>
             <div className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-3 text-gray-200 text-sm"
                  onClick={() => window.open('https://linkedin.com', '_blank')}>
                <Linkedin size={16} /> LinkedIn
             </div>
             <div className="h-px bg-gray-700 my-2 mx-4"></div>
             <div className="px-4 py-2 hover:bg-red-500/20 cursor-pointer flex items-center gap-3 text-red-400 text-sm"
                  onClick={handleShutdown}>
                <Power size={16} /> System Shutdown
             </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-11 bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10 flex items-center px-4 z-50">
         <div 
           onClick={() => setStartMenuOpen(!startMenuOpen)} 
           className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-sm mr-4 cursor-pointer transition-colors"
         >
            START
         </div>
         {windows.map(win => (
            <div key={win.id} className="h-full flex items-center px-4 border-b-2 border-blue-500 bg-white/5 mr-1 text-xs text-gray-200 cursor-pointer hover:bg-white/10">
               {win.title}
            </div>
         ))}
      </div>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu(null)}
          options={[
            { 
              label: "Open", 
              action: () => {
                const item = fileSystem.find(i => i.id === contextMenu.itemId);
                if (item) openWindow(item.id, item.title, item.type === 'folder' ? 'FolderViewer' : item.component || 'TextViewer');
              } 
            },
            // Logic to show "Run as Administrator" only for apps
            ...(contextMenu.itemId === 'zenith' || contextMenu.itemId === 'mailflow' ? [
              { label: "Run as Administrator", action: () => alert("Permission Granted. Running...") }
            ] : []),
            { label: "Properties", action: () => alert(`Path: /home/user/${contextMenu.itemId}`) }
          ]}
        />
      )}
    </div>
  );
}