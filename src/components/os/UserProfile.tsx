"use client";

import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const UserProfile = () => {
  const nodeRef = useRef(null);

  return (
    // Make the profile widget draggable
    <Draggable nodeRef={nodeRef} handle=".profile-handle">
      <div
        ref={nodeRef}
        // Container styling: fixed position, glassmorphism background, glowing border
        className="absolute top-8 right-8 w-64 bg-[#0a0a0a]/80 backdrop-blur-md border-2 border-blue-500/50 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden z-20 group"
      >
        {/* --- Decorative Corner Accents for that "Tech" look --- */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400 rounded-tl-sm" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400 rounded-bl-sm" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400 rounded-br-sm" />

        {/* --- Draggable Header handle --- */}
        <div className="profile-handle h-7 bg-blue-900/30 cursor-grab active:cursor-grabbing flex items-center justify-between px-3 border-b border-blue-500/30">
          <span className="text-[10px] text-blue-300 font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            User_Profile // Active
          </span>
        </div>

        {/* --- Image Container --- */}
        <div className="relative w-full h-full p-3 bg-[#050505]">
          {/* The Pixel Image */}
          <img
            src="/pixel-portrait.png" // Loads from your public folder
            alt="Siddharth Singh Pixel Portrait"
            className="w-full h-auto rounded border border-blue-500/20 relative z-10"
          />

          {/* CRT Scanline Overlay applied only to the image area */}
          <div className="absolute inset-3 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] bg-[length:100%_2px,3px_100%] z-20 mixed-blend-overlay" />
          
          {/* Subtle inner glow on hover */}
          <div className="absolute inset-3 pointer-events-none rounded transition-opacity duration-500 opacity-0 group-hover:opacity-100 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] z-30" />
        </div>
      </div>
    </Draggable>
  );
};

export default UserProfile;