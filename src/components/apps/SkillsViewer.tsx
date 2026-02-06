import React from 'react';
import { Cpu, Database, Globe, Layers, Terminal, Cloud } from 'lucide-react';

const skills = {
  "Languages": {
    icon: Terminal,
    items: [
      { name: "Python", level: 95 },
      { name: "TypeScript / JS", level: 90 },
      { name: "C++", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Kotlin", level: 60 }
    ]
  },
  "Frameworks": {
    icon: Globe,
    items: [
      { name: "Next.js / React", level: 95 },
      { name: "Node.js / Express", level: 90 },
      { name: "FastAPI / Flask", level: 85 },
      { name: "Redux", level: 80 }
    ]
  },
  "Engineering": {
    icon: Layers,
    items: [
      { name: "Microservices", level: 90 },
      { name: "RAG Pipelines", level: 85 },
      { name: "Queue (BullMQ)", level: 80 },
      { name: "Zero-Knowledge Arch", level: 75 }
    ]
  },
  "Cloud & Tools": {
    icon: Cloud,
    items: [
      { name: "AWS / Docker", level: 80 },
      { name: "PostgreSQL / Redis", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Git / GitHub", level: 90 }
    ]
  }
};

const SkillsViewer = () => {
  return (
    <div className="h-full bg-black text-green-500 font-mono p-6 overflow-y-auto selection:bg-green-500 selection:text-black">
      <div className="mb-6 border-b border-green-800 pb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Cpu size={20} /> SYSTEM_DIAGNOSTICS_TOOL
        </h2>
        <p className="text-xs text-green-700 mt-1">v1.0.4 | Scan complete: All modules active</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, data]) => (
          <div key={category} className="mb-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
              <data.icon size={14} className="text-blue-400" /> {category}
            </h3>
            <div className="space-y-3">
              {data.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{skill.name}</span>
                    <span className="text-green-600">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-900 w-full flex gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-full h-full ${i < (skill.level / 5) ? 'bg-green-500' : 'bg-gray-800'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsViewer;