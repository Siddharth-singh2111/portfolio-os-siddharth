"use client";
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { motion } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  zIndex: number;
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowProps> = ({ id, title, zIndex, children }) => {
  // 1. Get toggleMaximize and windows from store
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, windows } = useOSStore();
  const nodeRef = useRef(null);

  // 2. Find the current window state to check if it is maximized or minimized
  const currentWindow = windows.find(w => w.id === id);
  const isMaximized = currentWindow?.isMaximized;
  const isMinimized = currentWindow?.isMinimized; // <--- Get minimized state

  // 3. FIX: Do not render if minimized (it lives in the taskbar now)
  if (isMinimized) return null;

  return (
    <Draggable 
      handle=".window-header" 
      nodeRef={nodeRef}
      onStart={() => focusWindow(id)}
      // 4. Disable dragging if maximized
      disabled={isMaximized}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
    >
      <motion.div 
        ref={nodeRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          // 5. Conditional Sizing: Full screen vs Windowed
          width: isMaximized ? "100vw" : "600px",
          height: isMaximized ? "94vh" : "400px", // 94vh leaves space for taskbar
          top: isMaximized ? 0 : undefined,
          left: isMaximized ? 0 : undefined
        }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        // Remove border radius when maximized for that clean OS look
        className={`absolute bg-[#1e1e1e] border border-gray-700 shadow-2xl overflow-hidden flex flex-col ${!isMaximized ? 'rounded-lg top-20 left-20' : ''}`}
        style={{ zIndex }}
      >
        {/* Title Bar */}
        <div className="window-header h-9 bg-[#2d2d2d] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b border-black">
          <span className="text-gray-300 text-xs font-mono tracking-wide select-none">{title}</span>
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="p-1 hover:bg-gray-600 rounded"><Minus size={12} color="gray" /></button>
            
            {/* Maximize Button Wired Up */}
            <button onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }} className="p-1 hover:bg-gray-600 rounded"><Square size={10} color="gray" /></button>
            
            <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="p-1 hover:bg-red-500 rounded group"><X size={12} className="text-gray-400 group-hover:text-white" /></button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0d0d0d] p-0 text-gray-200 overflow-auto font-mono text-sm relative">
          {children}
        </div>
      </motion.div>
    </Draggable>
  );
};

export default WindowFrame;