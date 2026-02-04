import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    "SiddharthOS [Version 1.0.4]",
    "(c) 2026 Siddharth Singh. All rights reserved.",
    "",
    "Type 'help' to see available commands.",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on click anywhere in terminal
  const handleFocus = () => inputRef.current?.focus();

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `guest@iiits:~$ ${input}`];

      switch (cmd) {
        case 'help':
          newHistory.push(
            "Available commands:",
            "  about     - Display system information",
            "  email     - Send an email to me",
            "  github    - Open GitHub profile",
            "  linkedin  - Open LinkedIn profile",
            "  clear     - Clear the terminal screen",
            "  sudo      - ??? (Admin Access)"
          );
          break;
        case 'about':
          newHistory.push("Siddharth Singh | Full Stack Engineer | System Architect");
          break;
        case 'email':
          window.open('mailto:siddharth.s23@iiits.in');
          newHistory.push("Opening mail client...");
          break;
        case 'github':
          window.open('https://github.com/your-username', '_blank'); // Replace with your actual GitHub
          newHistory.push("Opening GitHub...");
          break;
        case 'linkedin':
          window.open('https://linkedin.com/in/your-profile', '_blank'); // Replace with your actual LinkedIn
          newHistory.push("Opening LinkedIn...");
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'sudo':
          newHistory.push("PERMISSION DENIED: You are not an admin.");
          break;
        case '':
          break;
        default:
          newHistory.push(`Command not found: ${cmd}. Type 'help' for list.`);
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div 
      className="h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 overflow-y-auto cursor-text"
      onClick={handleFocus}
    >
      {/* Output History */}
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="break-words">{line}</div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-green-500">guest@iiits:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none flex-1 text-gray-100"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;