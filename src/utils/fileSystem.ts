import { 
  User, Cpu, Layout, Briefcase, 
  Terminal, Activity, Mail, ShieldAlert,
  Scale, Share2, DollarSign, FileCode, HeartPulse
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
        id: 'nexusv2x',
        title: 'nexus_v2x_engine',
        type: 'app',
        icon: HeartPulse, 
        component: 'ProjectViewer',
        data: {
          tagline: "Real-Time Telemetry & Collision Engine",
          tech: ["FastAPI", "Kafka", "Redis", "Next.js", "Deck.gl", "WebSockets", "Docker"],
          desc: [
            "Engineered an end-to-end V2X telemetry pipeline, utilizing Apache Kafka to ingest and process high-frequency geospatial traffic simulations.",
            "Implemented a Python backend featuring 2D Kalman Filters to mathematically smooth GPS noise, writing real-time state vectors to a Redis geospatial database for sub-millisecond data retrieval.",
            "Developed an O(log N) proximity radar using Redis Geohashing to detect and broadcast real-time vehicle collisions.",
            "Built a hardware-accelerated Next.js client with Deck.gl to render live traffic WebGL heatmaps at 60 FPS, containerizing the entire microservice architecture via Docker Compose."
          ],
          repoUrl: "https://github.com/Siddharth-singh2111/NexusV2X"
        }
      },
      {
        
        id: 'cowscue',
        title: 'cowscue_dispatch_sys',
        type: 'app',
        icon: Activity, 
        component: 'ProjectViewer',
        data: {
          tagline: "AI-Powered Rescue Logistics Engine",
          tech: ["Next.js", "TypeScript", "MongoDB", "Gemini AI", "Twilio", "OSRM"],
          desc: [
            "A real-time animal rescue platform connecting citizens with NGOs — uses Pusher for live WebSocket updates and Clerk for role-based access control.",
            "Built an AI triage system with Gemini 2.5 Flash that filters spam reports, estimates injury severity, and responds in multiple regional languages.",
            "Implemented heatmap analytics and batch route optimisation via OSRM to surface accident hotspots and suggest fuel-efficient rescue paths.",
            "Integrated Twilio to push WhatsApp dispatch alerts with Google Maps coordinates to NGO rescue drivers."
          ],
          liveUrl: "https://cowscue.vercel.app",
          repoUrl: "https://github.com/siddharth-singh2111/siddharth-singh2111-cowscue"
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
          tech: ["Node.js", "TypeScript", "Redis"],
          desc: [
            "Built a bulk email dispatch tool backed by Redis (BullMQ) queues, so high-volume sends don’t block the server.",
            "Resolved cloud connection timeouts by configuring SMTP pooling and automatic retries, consistently hitting a 99.9% delivery rate.",
            "Added pixel-based open-rate tracking to give campaigns measurable reach data."
          ],
          liveUrl: "https://mailflow-three.vercel.app",
          repoUrl: "https://github.com/Siddharth-singh2111/MailFlow"
        }
      },
      {
        id: 'civic',
        title: 'CivicSimplifier.exe',
        type: 'app',
        icon: Scale, 
        component: 'ProjectViewer',
        data: {
          tagline: "RAG SaaS for Legal Contracts",
          tech: ["React", "FastAPI", "Pinecone", "Cohere"],
          desc: "Built a production-ready RAG SaaS to simplify legal contracts using semantic search. Engineered a distributed architecture deployed on Vercel (Frontend) and Render (Backend).",
          liveUrl: "https://civic-simplifier.vercel.app",
          repoUrl: "https://github.com/Siddharth-singh2111/Civic-Simplifier"
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
          liveUrl: "https://dead-mans-switch-eight.vercel.app",
          repoUrl: "https://github.com/Siddharth-singh2111/dead-mans-switch"
        }
      },
      {
        id: 'vectorshift',
        title: 'VectorShift_Flow',
        type: 'app',
        icon: Share2, 
        component: 'ProjectViewer',
        data: {
          tagline: "Interactive Workflow Editor",
          tech: ["React", "ReactFlow", "FastAPI"],
          desc: "Developed an interactive drag-and-drop workflow editor using ReactFlow, backed by a FastAPI validation engine. Automated logic verification for complex pipelines.",
          liveUrl: "https://vector-shift-project.vercel.app",
          repoUrl: "https://github.com/Siddharth-singh2111/Vector-Shift-project"
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
          liveUrl: "https://split-ease-nine.vercel.app",
          repoUrl: "https://github.com/Siddharth-singh2111/SplitEase"
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
  },
  {
  id: 'resume_pdf',
  title: 'Resume',
  type: 'file',
  icon: FileCode, 
  component: 'PDFViewer'
}
];