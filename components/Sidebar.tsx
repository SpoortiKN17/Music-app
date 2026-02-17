
import React from 'react';
import { Icons } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Icons.Home /> },
    { id: 'search', label: 'Search', icon: <Icons.Search /> },
    { id: 'library', label: 'Library', icon: <Icons.Library /> },
    { id: 'dj', label: 'AI DJ', icon: <Icons.Sparkles /> },
  ];

  return (
    <aside className="w-64 glass h-full flex flex-col p-6 hidden md:flex">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Icons.Sparkles />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NovaStream</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 font-medium' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <span className={`transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-800">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/5">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Icons.Sparkles /> Nova Pro
          </h3>
          <p className="text-xs text-zinc-400 mb-3">Unlock crystal clear audio and advanced AI features.</p>
          <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
