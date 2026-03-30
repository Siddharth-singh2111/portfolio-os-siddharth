import React, { useState, useEffect } from 'react';
import { Cpu, Database, Globe, Layers, Terminal, Cloud, Activity } from 'lucide-react';

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
  const [lcData, setLcData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH LIVE LEETCODE DATA
  useEffect(() => {
    // ⚠️ Replace 'YOUR_LEETCODE_USERNAME' with your actual LeetCode handle
    const username = 'Siddharth_Singh2711'
    fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setLcData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch LeetCode stats", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-full bg-black text-green-500 font-mono p-6 overflow-y-auto selection:bg-green-500 selection:text-black">
      <div className="mb-6 border-b border-green-800 pb-2 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Cpu size={20} className="text-green-500" /> SYSTEM_DIAGNOSTICS
          </h2>
          <p className="text-xs text-green-700 mt-1">v1.0.4 | Scan complete: All modules active</p>
        </div>
      </div>

      {/* LIVE LEETCODE TERMINAL WIDGET */}
      <div className="mb-8 border border-green-900 bg-[#050505] rounded shadow-[0_0_15px_rgba(0,255,0,0.05)] overflow-hidden">
        <div className="bg-[#111] px-4 py-2 border-b border-green-900 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
            <Activity size={14} className="text-yellow-500" /> LIVE_ALGORITHM_METRICS
          </span>
          <span className="text-[10px] bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
            Contest Rating: 1650+
          </span>
        </div>
        
        <div className="p-4 flex flex-col sm:flex-row gap-6 items-center justify-between">
          {loading ? (
            <div className="w-full text-center text-xs text-green-700 animate-pulse py-4">
              Establishing connection to LeetCode mainframe...
            </div>
          ) : lcData ? (
            <>
              {/* Total Solved Circle */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="relative w-24 h-24 rounded-full border-4 border-gray-800 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-yellow-500"
                      strokeDasharray={`${(lcData.totalSolved / lcData.totalQuestions) * 100}, 100`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-xl font-bold text-white">{lcData.totalSolved}</span>
                    <span className="block text-[9px] text-gray-500">SOLVED</span>
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="flex-1 w-full space-y-3">
                {/* Easy */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-cyan-400">Easy</span>
                    <span className="text-gray-400">{lcData.easySolved} / {lcData.totalEasy}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${(lcData.easySolved / lcData.totalEasy) * 100}%` }}></div>
                  </div>
                </div>
                {/* Medium */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-yellow-500">Medium</span>
                    <span className="text-gray-400">{lcData.mediumSolved} / {lcData.totalMedium}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: `${(lcData.mediumSolved / lcData.totalMedium) * 100}%` }}></div>
                  </div>
                </div>
                {/* Hard */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-red-500">Hard</span>
                    <span className="text-gray-400">{lcData.hardSolved} / {lcData.totalHard}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${(lcData.hardSolved / lcData.totalHard) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center text-xs text-red-500 py-4">
              ERR_CONNECTION_REFUSED: Could not retrieve metrics.
            </div>
          )}
        </div>
      </div>

      {/* EXISTING SKILLS GRID */}
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