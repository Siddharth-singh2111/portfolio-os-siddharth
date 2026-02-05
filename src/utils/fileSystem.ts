import { 
  Terminal, User, Code, Server, 
  Cpu, Layout, FileText, Mail, 
  ShieldAlert, Activity 
} from 'lucide-react';

export const fileSystem = [
  {
    id: 'about',
    title: 'sys_info.txt',
    type: 'file',
    icon: User,
    content: {
      name: "Siddharth Singh",
      role: "Full Stack Developer ",
      education: "B.Tech (ECE) @ IIIT Sri City (2023-2027) | CGPA: 8.51",
      location: "India"
    }
  },
  {
    id: 'skills',
    title: 'skills_matrix.exe',
    type: 'app',
    icon: Cpu,
    component: 'SkillsViewer', 
    data: {
      languages: ["Python", "TypeScript", "C++", "Kotlin", "SQL"],
      core: ["System Architecture", "Microservices", "RAG Pipelines", "Zero-Knowledge Arch"],
      stack: ["Next.js", "FastAPI", "Docker", "Redis", "AWS"]
    }
  },
  {
  id: 'resume',
  title: 'Resume.pdf',
  type: 'file',
  icon: FileText,
  component: 'PDFViewer', 
  content: 'Resume' 
},
  
  {
    id: 'projects',
    title: '~/projects',
    type: 'folder',
    icon: Layout,
    children: [
      {
        id: 'zenith',
        title: 'ZENITH_Env.sys',
        type: 'app',
        icon: Activity,
        component: 'ProjectViewer',
        data: {
          tagline: "AI-Powered Environmental Health Ecosystem",
          tech: ["FastAPI", "Azure OpenAI", "Docker"],
          desc: "Architected a health protection platform for vulnerable users (Asthma/COPD) using RAG and Azure Maps.",
          liveUrl: "https://zenith-health.demo", 
          repoUrl: "https://github.com/yourusername/zenith" 
        }
      },
      {
        id: 'mailflow',
        title: 'mailflow_daemon',
        type: 'app',
        icon: Mail,
        component: 'ProjectViewer',
        data: {
          tagline: "Distributed Email Automation Engine",
          tech: ["Node.js", "Redis (BullMQ)", "PostgreSQL"],
          desc: "Engineered a scalable automation platform handling bulk dispatching via message queues.",
          liveUrl: "https://mailflow-three.vercel.app",
          repoUrl: "https://github.com/yourusername/mailflow"
        }
      },
      {
        id: 'DeadMansSwitch',
        title: 'DeadMansSwitch.sys',
        type: 'Website',
        icon: Mail,
        component: 'ProjectViewer',
        data: {
          tagline: "Zero-Knowledge Digital Inheritance Vault.",
          tech: ["Node.js", "Node Cron", "MongoDB", "Zero-Knowledge Proofs","React"],
          desc: "Dead Man's Switch is a secure, automated fail-safe system designed to handle digital assets or sensitive information in the event of the owner's unavailability.",
          liveUrl: "https://mailflow-three.vercel.app",
          repoUrl: "https://github.com/yourusername/mailflow"
        }
      },
      // ... Add similar liveUrl/repoUrl fields to other projects ...
    ]
  },
// ...
  {
    id: 'experience',
    title: 'work_logs',
    type: 'folder',
    icon: Server,
    children: [
      {
        id: 'onlearn',
        title: 'Onlearn_Internship.log',
        type: 'file',
        icon: FileText,
        content: "Role: Software Developer Intern\nPeriod: Jan 2026 - Present\n\n- Driving product growth and user engagement strategies.\n- Optimizing platform performance for retention."
      },
      {
        id: 'qbtrix',
        title: 'Qbtrix_Internship.log',
        type: 'file',
        icon: FileText,
        content: "Role: SDE Intern\nPeriod: July 2024 - Aug 2024\n\n- Optimized backend API performance by 20%.\n- Integrated generative AI models for Interacly platform."
      }
    ]
  },
  {
    id: 'contact',
    title: 'connect.sh',
    type: 'executable',
    icon: Terminal,
    component: 'Terminal'
  }
];