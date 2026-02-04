import React from 'react';

const PDFViewer = () => {
  // Replace this URL with the actual public URL of your resume later.
  // For now, we use a sample PDF or you can put your resume.pdf in the 'public' folder.
  const resumeUrl = "/Resume_SiddharthSingh.pdf"; 

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      <div className="bg-[#333] p-2 flex justify-between items-center border-b border-black">
        <span className="text-xs text-gray-400">Viewing: Resume_SiddharthSingh.pdf</span>
        <a 
          href={resumeUrl} 
          download
          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
        >
          Download Original
        </a>
      </div>
      {/* The PDF Frame */}
      <iframe 
        src={resumeUrl} 
        className="w-full h-full border-none" 
        title="Resume PDF"
      />
    </div>
  );
};

export default PDFViewer;