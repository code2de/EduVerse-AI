import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import WorldCanvas from './components/WorldCanvas';
import Navigation from './components/Navigation';
import ContentOverlay from './components/ContentOverlay';
import { streamAIContent } from './utils/aiSimulator';

export default function App() {
  const [screen, setScreen] = useState('onboarding'); // onboarding, world
  const [formData, setFormData] = useState(null);
  const [activeTarget, setActiveTarget] = useState(null); // Temple, Tower, etc.
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTransitioningCamera, setIsTransitioningCamera] = useState(false);

  // Trigger Gemini AI generation
  const handleStartGeneration = (data) => {
    setFormData(data);
    setScreen('world');
    setIsGenerating(true);
    setActiveTarget('Knowledge Temple'); // Default landing room

    // Start streaming from AI simulator
    streamAIContent({
      grade: data.grade,
      subject: data.subject,
      topic: data.topic,
      onChunk: (text) => {
        // Option to display streaming terminal console logs or chunks if needed
      },
      onComplete: (completedData) => {
        setGeneratedData(completedData);
        setIsGenerating(false);
      }
    });
  };

  const handleReturnToOnboarding = () => {
    setScreen('onboarding');
    setGeneratedData(null);
    setActiveTarget(null);
  };

  return (
    <div className="relative w-screen h-screen bg-[#030307] text-white overflow-hidden select-none font-sans">
      
      {/* Onboarding Screen */}
      {screen === 'onboarding' && (
        <Onboarding onStartGeneration={handleStartGeneration} />
      )}

      {/* 3D Immersive Learning World Layer */}
      {screen === 'world' && (
        <div className="w-full h-full relative">
          
          {/* 3D Canvas Viewport */}
          <WorldCanvas 
            subject={formData?.subject} 
            focusTarget={activeTarget}
            isTransitioning={isTransitioningCamera}
            setIsTransitioning={setIsTransitioningCamera}
          />

          {/* Floating UI HUD Overlays */}
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
            
            {/* Top Header Bar */}
            <div className="w-full flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-3">
                {/* Drawer Toggle Hamburger */}
                <button
                  id="hamburger-btn"
                  onClick={() => setIsDrawerOpen(true)}
                  className="glass p-3 rounded-full hover:bg-white/10 transition-transform active:scale-95 text-white flex items-center justify-center"
                >
                  <span className="material-icons text-xl">menu</span>
                </button>

                {/* Biome label */}
                <div className="glass px-4 py-2.5 rounded-full border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-outfit font-extrabold text-xs uppercase tracking-widest text-cyan-300">
                    {formData?.subject} Biome
                  </span>
                </div>
              </div>

              {/* Reset / Onboarding Return */}
              <button
                onClick={handleReturnToOnboarding}
                className="glass px-4 py-2.5 rounded-full hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition"
              >
                <span className="material-icons text-sm">settings_backup_restore</span>
                <span>Change Parameters</span>
              </button>
            </div>

            {/* Bottom HUD: Topic Details */}
            <div className="w-full max-w-xl glass p-4 rounded-2xl border border-white/5 pointer-events-auto flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <span className="material-icons text-lg">auto_awesome</span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Current Prompt</div>
                  <div className="font-outfit font-bold text-xs text-white line-clamp-1">
                    {formData?.topic}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Curriculum</div>
                <div className="text-[11px] font-semibold text-gray-300">
                  {formData?.curriculum}
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Drawer Overlay */}
          <Navigation 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            onSelectTarget={setActiveTarget}
            activeTarget={activeTarget}
          />

          {/* Floating Glass Content Overlay Card */}
          <ContentOverlay 
            activeTarget={activeTarget}
            generatedData={generatedData}
            isGenerating={isGenerating}
            onClose={() => setActiveTarget(null)}
            grade={formData?.grade}
            subject={formData?.subject}
            topic={formData?.topic}
          />

          {/* Special Full-Screen Glass Dashboard for "Learning Progress" */}
          {activeTarget === 'Learning Progress' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-40">
              <div className="w-full max-w-4xl glass-premium rounded-[32px] p-6 md:p-8 space-y-6 relative animate-float pointer-events-auto max-h-[85vh] overflow-y-auto custom-scroll">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-cyan-400 text-2xl animate-spin-slow">insert_chart</span>
                    <div>
                      <h3 className="font-outfit font-extrabold text-lg text-white uppercase tracking-wider">Learning Analytics Dashboard</h3>
                      <p className="text-[10px] text-gray-500 uppercase font-mono mt-0.5">Topic: {formData?.topic}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTarget(null)}
                    className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/5"
                  >
                    <span className="material-icons text-xl">close</span>
                  </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Universal Design (UDL)", val: "92% Score", desc: "Multiple presentation modes active", color: "text-emerald-400" },
                    { title: "Bloom Taxonomy Level", val: formData?.bloomLevel.split(' ')[0], desc: "Target application achieved", color: "text-cyan-400" },
                    { title: "Worksheet Variants", val: "3 Levels", desc: "Easy, Medium, and Advanced tasks", color: "text-purple-400" },
                    { title: "Translation Portals", val: "5 Languages", desc: "Tamil, Hindi, Kannada, etc.", color: "text-amber-400" }
                  ].map((stat, i) => (
                    <div key={i} className="glass p-4 rounded-2xl border border-white/5 text-left">
                      <div className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold mb-1">{stat.title}</div>
                      <div className={`font-outfit text-base font-extrabold ${stat.color}`}>{stat.val}</div>
                      <div className="text-[10px] text-gray-400 mt-1 leading-snug">{stat.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Pedagogy Alignment Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Chart: Bloom's Alignment */}
                  <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
                    <h5 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-purple-300">Bloom's Taxonomy Cognitive Distribution</h5>
                    <div className="space-y-3 text-xs">
                      {[
                        { label: "Remembering (Knowledge Core)", w: "85%", c: "bg-red-500" },
                        { label: "Understanding (Temple Flow)", w: "90%", c: "bg-orange-500" },
                        { label: "Applying (Challenge Tower)", w: "75%", c: "bg-yellow-500" },
                        { label: "Analyzing (Innovation Lab)", w: "60%", c: "bg-green-500" },
                        { label: "Evaluating (Exit Tickets)", w: "45%", c: "bg-blue-500" }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span>{item.label}</span>
                            <span className="font-bold">{item.w} Match</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${item.c}`} style={{ width: item.w }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Chart: UDL Execution Milestones */}
                  <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
                    <h5 className="font-outfit font-extrabold text-xs uppercase tracking-wider text-cyan-300">Universal Design for Learning (UDL) Coverage</h5>
                    <div className="space-y-4 text-xs">
                      {[
                        { title: "Multiple Means of Representation", val: "Active", desc: "3D biome visuals, analogies, text sheets, audio templates.", check: true },
                        { title: "Multiple Means of Action & Expression", val: "Active", desc: "Interactive quizzes, creative hands-on projects, Socratic debates.", check: true },
                        { title: "Multiple Means of Engagement", val: "Active", desc: "Gamified biomes, immediate scoring, translation portals.", check: true }
                      ].map((mil, i) => (
                        <div key={i} className="flex gap-3 items-start border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <span className="material-icons text-emerald-400 text-lg">check_circle</span>
                          <div>
                            <div className="font-bold text-[11px] text-white flex gap-2 items-center">
                              {mil.title}
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400">Verified</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{mil.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveTarget(null)}
                    className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-xs transition"
                  >
                    Close Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
