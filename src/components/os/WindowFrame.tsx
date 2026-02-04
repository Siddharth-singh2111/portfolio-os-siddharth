"use client";
import React, { useRef } from 'react'; // <--- Added useRef
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
  const { closeWindow, focusWindow, minimizeWindow } = useOSStore();
  
  // FIX: Create a reference for the draggable element
  const nodeRef = useRef(null);

  return (
    <Draggable 
      handle=".window-header" 
      nodeRef={nodeRef} // <--- Pass the ref here to fix the error
      onStart={() => focusWindow(id)}
    >
      <motion.div 
        ref={nodeRef} // <--- Attach the ref to the actual DOM element
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-20 left-20 w-[600px] h-[400px] bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl overflow-hidden flex flex-col"
        style={{ zIndex }}
      >
        {/* Title Bar */}
        <div className="window-header h-9 bg-[#2d2d2d] flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b border-black">
          <span className="text-gray-300 text-xs font-mono tracking-wide select-none">{title}</span>
          <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="p-1 hover:bg-gray-600 rounded"><Minus size={12} color="gray" /></button>
            <button className="p-1 hover:bg-gray-600 rounded"><Square size={10} color="gray" /></button>
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