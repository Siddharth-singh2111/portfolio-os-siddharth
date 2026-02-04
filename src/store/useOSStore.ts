import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number; // Controls which window is on top
  componentType: string; // e.g., 'About', 'Terminal', 'Browser'
}

interface OSState {
  windows: WindowState[];
  activeWindowId: string | null;
  
  // Actions
  openWindow: (id: string, title: string, componentType: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void; // Defined in interface
  focusWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, componentType) => set((state) => {
    // If window already exists, just focus it
    if (state.windows.find((w) => w.id === id)) {
      return { 
        activeWindowId: id,
        windows: state.windows.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: 100 } : { ...w, zIndex: 1 }
        )
      };
    }
    
    // Otherwise, create new window
    const newWindow: WindowState = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100, // Starts on top
      componentType
    };

    return { 
      windows: [...state.windows.map(w => ({ ...w, zIndex: 1 })), newWindow],
      activeWindowId: id 
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter((w) => w.id !== id),
    activeWindowId: null // Reset focus
  })),

  focusWindow: (id) => set((state) => ({
    activeWindowId: id,
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, zIndex: 100 } : { ...w, zIndex: 1 }
    )
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMinimized: true } : w
    )
  })),

  // ADDED THIS FUNCTION
  toggleMaximize: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  }))
}));