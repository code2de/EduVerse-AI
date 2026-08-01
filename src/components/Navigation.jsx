import React, { useEffect, useRef } from 'react';

const DRAWER_ITEMS = [
  { name: 'Knowledge Temple', icon: 'school', description: 'Pedagogical lesson plans & curriculum core' },
  { name: 'Challenge Tower', icon: 'workspace_premium', description: 'Adaptive learning quizzes & feedback' },
  { name: 'Crafting Workshop', icon: 'palette', description: 'Differentiated classroom worksheets' },
  { name: 'Innovation Lab', icon: 'psychology', description: 'Inquiry-based projects & activities' },
  { name: 'Language Portal', icon: 'translate', description: 'Instant multi-language translation hub' },
  { name: 'Village Hall', icon: 'chat', description: 'UDL parent summaries & student feedback' },
  { name: 'Reflection Garden', icon: 'park', description: 'Exit tickets & learning analytics metrics' },
  { name: 'Learning Progress', icon: 'insert_chart', description: 'View full system analytics dashboard' }
];

export default function Navigation({ isOpen, onClose, onSelectTarget, activeTarget }) {
  const drawerRef = useRef();

  // Close drawer on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close drawer on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target) && !e.target.closest('#hamburger-btn')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Blurred Back Drop for Drawer */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300 z-40 pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Glass Navigation Drawer */}
      <div
        ref={drawerRef}
        className={`fixed left-0 top-0 h-full w-80 md:w-96 glass-premium z-50 p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="material-icons text-cyan-400 text-2xl animate-spin-slow">auto_awesome</span>
              <span className="font-outfit font-extrabold text-xl tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                EduVerse Rooms
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-full hover:bg-white/5"
            >
              <span className="material-icons text-xl">close</span>
            </button>
          </div>

          {/* List of Educational Zones */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 custom-scroll">
            {DRAWER_ITEMS.map((item) => {
              const isActive = activeTarget === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onSelectTarget(item.name);
                    onClose();
                  }}
                  className={`w-full flex items-start gap-4 p-3.5 rounded-2xl border text-left transition-all duration-300 group ${
                    isActive 
                      ? 'bg-purple-600/20 border-purple-500/40 text-purple-200 shadow-md shadow-purple-900/10'
                      : 'bg-white/0 border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-500/20 border-purple-400/40 text-purple-300'
                      : 'bg-white/5 border-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-cyan-400'
                  }`}>
                    <span className="material-icons text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <div className="font-outfit font-bold text-sm leading-none mb-1 group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-gray-400 leading-normal font-sans">
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[10px] text-gray-500 select-none">
          <span>Powered by Google Gemini</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            Active World
          </span>
        </div>
      </div>
    </>
  );
}
