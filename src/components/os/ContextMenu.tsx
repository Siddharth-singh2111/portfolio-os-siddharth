import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  options: { label: string; action: () => void; danger?: boolean }[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options, onClose }) => {
  // Close menu if clicking outside
  React.useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <div 
      className="fixed z-[9999] w-48 bg-[#2d2d2d] border border-gray-600 shadow-xl rounded py-1 flex flex-col"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking menu itself
    >
      {options.map((opt, i) => (
        <div 
          key={i} 
          onClick={() => { opt.action(); onClose(); }}
          className={`px-4 py-2 text-xs cursor-pointer hover:bg-blue-600 text-white flex justify-between ${opt.danger ? 'text-red-400 hover:bg-red-900/30' : ''}`}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;