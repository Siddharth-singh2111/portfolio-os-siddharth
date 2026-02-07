import { 
  User, Cpu, Layout, Briefcase, 
  Terminal, Activity, Mail, ShieldAlert,
  Scale, Share2, DollarSign, FileCode
} from 'lucide-react';

export const fileSystem = [
  {
    id: 'about',
    title: 'sys_info.txt',
    type: 'file',
    icon: User,
    component: 'TextViewer', 
    content: {}
  },
  {
    id: 'experience',
    title: 'experience.log',
    type: 'app',
    icon: Briefcase,
    component: 'ExperienceViewer'
  },
  {
    id: 'skills',
    title: 'skills_matrix.exe',
    type: 'app',
    icon: Cpu,
    component: 'SkillsViewer'
  },
  {
    id: 'projects',
    title: '~/projects',
    type: 'folder',
    icon: Layout,
    children: [
      {
        id: 'zenith',
        title: 'ZENITH_Health.sys',
        type: 'app',
        icon: Activity,
        component: 'ProjectViewer',
        data: {
          tagline: "AI-Powered Health Protection Platform",
          tech: ["Python", "FastAPI", "Azure OpenAI", "Azure Maps"],
          desc: "Architected a personalized health platform using Azure OpenAI for reasoning. Implemented an intelligent RAG-based context engine synthesizing real-time weather data with user medical history. Engineered safety guardrails to filter hallucinations.",
          liveUrl: "https://zenith.demo", 
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
          tech: ["TypeScript", "Node.js", "Redis (BullMQ)", "PostgreSQL"],
          desc: "Engineered a scalable automation platform handling bulk dispatching via Redis message queues. Decoupled processing to ensure high availability and architected a custom analytics engine using 1x1 tracking pixels.",
          liveUrl: "https://mailflow.demo",
          repoUrl: "https://github.com/yourusername/mailflow"
        }
      },
      {
        id: 'civic',
        title: 'CivicSimplifier.exe',
        type: 'app',
        icon: Scale, // Represents Legal
        component: 'ProjectViewer',
        data: {
          tagline: "RAG SaaS for Legal Contracts",
          tech: ["React", "FastAPI", "Pinecone", "Cohere"],
          desc: "Built a production-ready RAG SaaS to simplify legal contracts using semantic search. Engineered a distributed architecture deployed on Vercel (Frontend) and Render (Backend).",
          liveUrl: "https://civic.demo",
          repoUrl: "https://github.com/yourusername/civic"
        }
      },
      {
        id: 'legacy',
        title: 'dead_mans_switch.sh',
        type: 'app',
        icon: ShieldAlert,
        component: 'ProjectViewer',
        data: {
          tagline: "Zero-Knowledge Digital Vault",
          tech: ["Node.js", "Cron", "AES-256", "Crypto"],
          desc: "Implemented Zero-Knowledge Architecture with client-side encryption to secure digital legacy data. Engineered a custom heartbeat monitor using Node-cron and a firewall-resistant notification system.",
          liveUrl: "https://dms.demo",
          repoUrl: "https://github.com/yourusername/dms"
        }
      },
      {
        id: 'vectorshift',
        title: 'VectorShift_Flow',
        type: 'app',
        icon: Share2, // Represents Nodes/Workflow
        component: 'ProjectViewer',
        data: {
          tagline: "Interactive Workflow Editor",
          tech: ["React", "ReactFlow", "FastAPI"],
          desc: "Developed an interactive drag-and-drop workflow editor using ReactFlow, backed by a FastAPI validation engine. Automated logic verification for complex pipelines.",
          liveUrl: "https://vectorshift.demo",
          repoUrl: "https://github.com/yourusername/vectorshift"
        }
      },
      {
        id: 'Splitease',
        title: 'SplitEase_Ledger',
        type: 'app',
        icon: DollarSign,
        component: 'ProjectViewer',
        data: {
          tagline: "Group Expense Tracker",
          tech: ["React", "Node.js", "MongoDB"],
          desc: "Engineered a group expense tracker with real-time ledger balancing. Implemented transparent transaction history and settlement logic for accurate shared expense tracking.",
          liveUrl: "https://splitease.demo",
          repoUrl: "https://github.com/yourusername/splitease"
        }
      }
    ]
  },
  {
    id: 'email_client',
    title: 'Mail Client',
    type: 'app',
    icon: Mail,
    component: 'ContactApp'
  },
  {
    id: 'terminal',
    title: 'terminal.sh',
    type: 'executable',
    icon: Terminal,
    component: 'Terminal'
  }
];