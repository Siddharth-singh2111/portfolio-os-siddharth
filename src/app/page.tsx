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
import ContactApp from '@/components/apps/ContactApp'; 
import ContextMenu from '@/components/os/ContextMenu';
import MobileLayout from '@/components/os/MobileLayout';
import { Github, Linkedin, Power, Wifi } from 'lucide-react'; 
import ExperienceViewer from '@/components/apps/ExperienceViewer'; 

// Helper Component for the Typing Effect
const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); 
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}</span>;
};

// The Boot Log Lines
const bootLogsList = [
  "PhoenixTechnologies ROM BIOS PLUS Version 1.10 A04",
  "Copyright (C) 1985-2026 Phoenix Technologies Ltd.",
  "",
  "CPU = AMD Ryzen 7 5800X",
  "640K System RAM Passed",
  "16384M Extended RAM Passed",
  "1024 KB L2 Cache",
  "System BIOS shadowed",
  "Video BIOS shadowed",
  "",
  "Booting from Hard Disk...",
  "Loading Siddharth_OS kernel...",
  "Mounting root filesystem........ [ OK ]",
  "Initializing network adapters... [ OK ]",
  "Starting UI Manager............. [ OK ]"
];

export default function Desktop() {
  const { windows, openWindow, minimizeWindow } = useOSStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; itemId: string } | null>(null);
  
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleShutdown = () => {
    setStartMenuOpen(false);
    setBooting(true);
    setBootLogs([]); // Reset logs on restart
  };

  const handleShowDesktop = () => {
    windows.forEach(w => minimizeWindow(w.id));
  };

  // Mobile Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Natural BIOS Boot Sequence
  useEffect(() => {
    if (!booting) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootLogsList.length) {
        setBootLogs(prev => [...prev, bootLogsList[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 600); // Small pause before jumping to desktop
      }
    }, 150); // Speed of the boot logs appearing
    
    return () => clearInterval(interval);
  }, [booting]);

  // Close context menu
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (booting) {
    return (
      <div className="bg-[#050505] h-screen w-screen text-[#00ff00] font-mono p-10 text-sm md:text-lg flex flex-col relative overflow-hidden">
        {/* CRT Scanline Effect for Boot */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50"></div>
        
        {bootLogs.map((log, i) => (
          <p key={i} className="mb-1 min-h-[1.5rem]">{log}</p>
        ))}
        <p className="animate-pulse mt-1">_</p>
      </div>
    );
  }

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative selection:bg-green-500 selection:text-black font-mono"
      style={{ 
        backgroundColor: '#030303',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #111827 0%, #000 85%),
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px'
      }}
      onContextMenu={(e) => { e.preventDefault(); }}
    >
      {/* 1. CRT Monitor Overlay (Scanlines + RGB Split) */}
      <div className="pointer-events-none absolute inset-0 z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>
      
      {/* 2. Vignette Effect */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      
      {/* Desktop Icons Grid */}
      <div className="grid grid-flow-col grid-rows-6 gap-6 p-6 w-max h-full relative z-10">
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
            <div className="w-14 h-14 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all shadow-lg group-hover:shadow-green-500/20">
              <item.icon size={28} className="text-gray-300 group-hover:text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs text-gray-300 font-medium bg-black/60 px-2 py-0.5 rounded shadow-sm text-center border border-transparent group-hover:border-gray-700">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Window Manager Layer */}
      {windows.map((win) => (
        <WindowFrame key={win.id} id={win.id} title={win.title} zIndex={win.zIndex}>
           {win.componentType === 'FolderViewer' && <FolderViewer folderId={win.id} />}
           {win.componentType === 'Terminal' && <Terminal />}
           {win.componentType === 'PDFViewer' && <PDFViewer />}
           {win.componentType === 'ProjectViewer' && <ProjectViewer projectId={win.id} />}
           {win.componentType === 'SkillsViewer' && <SkillsViewer />}
           {win.componentType === 'ContactApp' && <ContactApp />}
           {win.componentType === 'ExperienceViewer' && <ExperienceViewer />}

           {win.componentType === 'TextViewer' && (
            <div className="p-6 text-gray-300 font-mono leading-relaxed selection:bg-green-500 selection:text-black">
              <h2 className="text-xl text-white font-bold mb-6 flex items-center gap-3">
                 📝 {win.title}
              </h2>
              <div className="bg-black/40 p-4 rounded border border-white/10 backdrop-blur-sm">
                <div className="text-green-400 whitespace-pre-wrap">
                   <TypewriterEffect text={`> Loading User Profile...\n> Name: Siddharth Singh\n> Role: Full Stack Engineer\n> Education: B.Tech ECE @ IIIT Sri City (CGPA 8.5)\n> Leadership: Placement Coordinator, Android Lead @ IOTA\n\n> "Dedicated to solving engineering challenges through efficient coding."\n\n> Current Focus: [System Architecture, Microservices, RAG Pipelines]`} />
                   <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1 align-middle"></span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-600 font-italic">
                 // System ready. Awaiting input.
              </p>
            </div>
           )}
        </WindowFrame>
      ))}

      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div className="absolute bottom-12 left-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-lg overflow-hidden z-[9999]">
          <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-white text-lg border border-white/20">S</div>
            <div>
              <div className="text-white font-bold text-sm tracking-wide">Siddharth Singh</div>
              <div className="text-blue-300 text-[10px] uppercase tracking-wider">System Admin</div>
            </div>
          </div>
          <div className="py-2">
             <div className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-3 text-gray-300 text-sm transition-colors"
                  onClick={() => window.open('https://github.com/Siddharth-singh2111', '_blank')}>
                <Github size={16} /> GitHub Profile
             </div>
             <div className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-3 text-gray-300 text-sm transition-colors"
                  onClick={() => window.open('https://www.linkedin.com/in/siddharth-singh-dev/', '_blank')}>
                <Linkedin size={16} /> LinkedIn
             </div>
             <div className="h-px bg-gray-800 my-2 mx-4"></div>
             <div className="px-4 py-2 hover:bg-red-500/10 cursor-pointer flex items-center gap-3 text-red-400 text-sm transition-colors"
                  onClick={handleShutdown}>
                <Power size={16} /> System Shutdown
             </div>
          </div>
        </div>
      )}
  
      {/* Glassmorphism Taskbar */}
      <div className="absolute bottom-0 w-full h-12 bg-[#050505]/80 backdrop-blur-md border-t border-white/10 flex items-center px-4 z-[9999] justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
         <div className="flex items-center h-full gap-2">
            <div 
              onClick={() => setStartMenuOpen(!startMenuOpen)} 
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-md mr-2 cursor-pointer transition-all hover:shadow-[0_0_10px_rgba(37,99,235,0.5)] active:scale-95 flex items-center gap-2"
            >
               <div className="w-2 h-2 bg-white rounded-full"></div> START
            </div>
            {/* Open Windows in Taskbar */}
            {windows.map(win => (
               <div 
                 key={win.id} 
                 onClick={() => windows.find(w => w.id === win.id)?.isMinimized ? openWindow(win.id, win.title, win.componentType) : minimizeWindow(win.id)}
                 className={`h-8 px-4 flex items-center gap-2 rounded-md text-xs transition-all cursor-pointer border border-transparent ${
                   win.isMinimized 
                   ? 'text-gray-500 hover:bg-white/5' 
                   : 'bg-white/10 text-blue-200 border-white/5 shadow-sm'
                 }`}
               >
                  <div className={`w-1.5 h-1.5 rounded-full ${win.isMinimized ? 'bg-gray-600' : 'bg-green-400 animate-pulse'}`}></div>
                  {win.title}
               </div>
            ))}
         </div>
         
         {/* Right Side Status Bar */}
         <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-default">
               <Wifi size={14} className="text-green-500" />
               <span className="hidden sm:inline">CONNECTED</span>
            </div>
            <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <div 
              onClick={handleShowDesktop}
              className="w-1.5 h-full border-l border-gray-700 hover:bg-white/20 cursor-pointer ml-2"
              title="Show Desktop"
            ></div>
         </div>
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