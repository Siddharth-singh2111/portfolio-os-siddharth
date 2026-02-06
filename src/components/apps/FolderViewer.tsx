import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import { fileSystem } from '@/utils/fileSystem';
import { Folder } from 'lucide-react';

interface FolderViewerProps {
  folderId: string;
}

const FolderViewer: React.FC<FolderViewerProps> = ({ folderId }) => {
  const { openWindow } = useOSStore();

  // Find the folder in the fileSystem based on ID
  // (In a real OS, this would be a recursive search, but we'll keep it simple for now)
  const folder = fileSystem.find(item => item.id === folderId) || 
                 fileSystem.find(item => item.children?.some(child => child.id === folderId));
  
  // If we found the parent, we need to grab the specific child folder
  // Note: This logic depends on your depth. For the root 'projects', it's direct.
  const contents = folder?.id === folderId 
  ? (folder as any).children 
  : (folder?.children?.find((c: any) => c.id === folderId) as any)?.children;

  if (!contents) return <div className="text-red-500 p-4">Error: Directory not found.</div>;

  return (
    <div className="p-4">
      <div className="text-xs text-gray-500 mb-4 border-b border-gray-800 pb-2 flex gap-2">
        <span>/home/user/{folderId}</span>
        <span className="text-gray-600">({contents.length} items)</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {contents.map((item: any) => (
          <div 
            key={item.id}
            onDoubleClick={() => openWindow(item.id, item.title, item.component || 'TextViewer')}
            className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-white/5 p-2 rounded"
          >
            <item.icon size={32} className="text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-gray-300 text-center break-words w-full">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderViewer;