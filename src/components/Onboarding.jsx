import React, { useState } from 'react';

export default function Onboarding({ onStartGeneration }) {
  const [formData, setFormData] = useState({
    grade: 'Grade 9',
    subject: 'Mathematics',
    topic: 'Quadratic Equations in Action',
    curriculum: 'Standard Curriculum',
    language: 'English',
    duration: '45 mins',
    studentsCount: '30',
    learningLevel: 'Mixed Ability',
    teachingGoal: 'Conceptual mastery with physical applications',
    teachingStyle: 'Gamified/Inquiry-Based',
    bloomLevel: 'Applying (Level 3)',
    specialNeeds: 'Visual aids & step-by-step scaffolds',
    resources: {
      lessonPlan: true,
      quiz: true,
      worksheet: true,
      homework: true,
      activities: true,
      parentSummary: true,
      translation: true,
    }
  });

  const handleCheckboxChange = (key) => {
    setFormData(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [key]: !prev.resources[key]
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGeneration(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8 overflow-y-auto custom-scroll">
      <div className="relative w-full max-w-6xl glass-premium rounded-[32px] p-6 md:p-10 text-white flex flex-col lg:flex-row gap-8 animate-float">
        
        {/* Sparkle background ambient glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] pointer-events-none" />

        {/* LEFT PANEL: Branding & Visuals */}
        <div className="lg:w-5/12 flex flex-col justify-between space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-purple-300 uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              EduVerse AI v2.0
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white leading-none">
              EduVerse <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">AI</span>
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-2 ml-1">
              Enter. Explore. Learn.
            </p>
            <p className="text-gray-300 mt-6 leading-relaxed text-sm">
              Evolve single lesson prompts into interactive 3D voxel learning worlds. Configure pedagogical constraints based on UDL, Bloom's Taxonomy, and Differentiated Instruction.
            </p>
          </div>

          {/* Design aesthetics tags */}
          <div className="hidden lg:block space-y-4">
            <div className="glass p-4 rounded-2xl border border-white/5 text-xs text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Rendering Engine</span>
                <span className="text-cyan-400">React Three Fiber</span>
              </div>
              <div className="flex justify-between">
                <span>AI Core</span>
                <span className="text-purple-400">Gemini 1.5 Pro</span>
              </div>
              <div className="flex justify-between">
                <span>Styling</span>
                <span className="text-blue-400">Material Design 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Form Setup (AI Studio Style) */}
        <form onSubmit={handleSubmit} className="lg:w-7/12 flex flex-col justify-between space-y-6">
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
            
            {/* Subject, Topic & Grade row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Subject Biome</label>
                <select 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Mathematics">📐 Mathematics</option>
                  <option value="Science">🧬 Science</option>
                  <option value="English">🌸 English Literature</option>
                  <option value="History">🏺 History & Ruins</option>
                  <option value="Computer Science">💻 Computer Science</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Grade Level</label>
                <select 
                  name="grade" 
                  value={formData.grade} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Primary (Grades 1-5)">Grades 1-5</option>
                  <option value="Middle (Grades 6-8)">Grades 6-8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="High School (Grades 10-12)">Grades 10-12</option>
                  <option value="Higher Ed">Higher Ed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Curriculum</label>
                <select 
                  name="curriculum" 
                  value={formData.curriculum} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Standard Curriculum">Standard Curriculum</option>
                  <option value="IB Board">IB Board</option>
                  <option value="CBSE / ICSE">CBSE / ICSE</option>
                  <option value="Cambridge IG">Cambridge IG</option>
                </select>
              </div>
            </div>

            {/* Prompt Topic */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Lesson Topic (Teaching Prompt)</label>
              <input 
                type="text" 
                name="topic" 
                value={formData.topic} 
                onChange={handleChange}
                placeholder="E.g., Solving Quadratic equations or Photosynthesis light cycles..." 
                className="w-full glass-input rounded-xl p-3 text-sm text-white"
                required
              />
            </div>

            {/* Meta Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Teaching Style</label>
                <select 
                  name="teachingStyle" 
                  value={formData.teachingStyle} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Gamified/Inquiry-Based">🎮 Gamified & Inquiry-Based</option>
                  <option value="Direct Instruction">📖 Direct Instruction / Lecture</option>
                  <option value="Socratic Seminar">💬 Socratic Dialogue & Discussion</option>
                  <option value="Storytelling-driven">🎭 Storytelling & Exploration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Cognitive Level (Bloom's Taxonomy)</label>
                <select 
                  name="bloomLevel" 
                  value={formData.bloomLevel} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Remembering (Level 1)">Remembering (Level 1)</option>
                  <option value="Understanding (Level 2)">Understanding (Level 2)</option>
                  <option value="Applying (Level 3)">Applying (Level 3)</option>
                  <option value="Analyzing (Level 4)">Analyzing (Level 4)</option>
                  <option value="Evaluating (Level 5)">Evaluating (Level 5)</option>
                  <option value="Creating (Level 6)">Creating (Level 6)</option>
                </select>
              </div>
            </div>

            {/* Learning settings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  className="w-full glass-input rounded-xl p-3 text-sm text-white" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Students</label>
                <input 
                  type="number" 
                  name="studentsCount" 
                  value={formData.studentsCount} 
                  onChange={handleChange} 
                  className="w-full glass-input rounded-xl p-3 text-sm text-white" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Language</label>
                <select 
                  name="language" 
                  value={formData.language} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Tamil">Tamil / தமிழ்</option>
                  <option value="Hindi">Hindi / हिंदी</option>
                  <option value="Kannada">Kannada / ಕನ್ನಡ</option>
                  <option value="Malayalam">Malayalam / മലയാളം</option>
                  <option value="Telugu">Telugu / తెలుగు</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Learning Level</label>
                <select 
                  name="learningLevel" 
                  value={formData.learningLevel} 
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl p-3 text-sm text-white cursor-pointer"
                >
                  <option value="Beginner">Beginner Scaffolding</option>
                  <option value="Mixed Ability">Mixed Ability (UDL)</option>
                  <option value="Advanced / Gifted">Advanced / Gifted</option>
                </select>
              </div>
            </div>

            {/* Special Needs & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Special Learning Needs</label>
                <input 
                  type="text" 
                  name="specialNeeds" 
                  value={formData.specialNeeds} 
                  onChange={handleChange} 
                  placeholder="E.g., visual support, ADHD scaffolds..."
                  className="w-full glass-input rounded-xl p-3 text-sm text-white" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Primary Learning Goal</label>
                <input 
                  type="text" 
                  name="teachingGoal" 
                  value={formData.teachingGoal} 
                  onChange={handleChange} 
                  className="w-full glass-input rounded-xl p-3 text-sm text-white" 
                />
              </div>
            </div>

            {/* Checkboxes: Resources to Generate */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Pedagogical Resources to Construct</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'lessonPlan', name: '📚 Lesson Plan' },
                  { id: 'quiz', name: '🏆 Quiz & Tests' },
                  { id: 'worksheet', name: '📝 Worksheets' },
                  { id: 'homework', name: '🏠 Homework' },
                  { id: 'activities', name: '🧪 Activities' },
                  { id: 'parentSummary', name: '👨‍👩‍👧 Parent Summary' },
                  { id: 'translation', name: '🌐 Translations' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCheckboxChange(item.id)}
                    className={`flex items-center gap-2 p-3 text-xs rounded-xl border transition-all ${
                      formData.resources[item.id]
                        ? 'bg-purple-600/30 border-purple-500/50 text-white font-bold'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="material-icons text-sm">
                      {formData.resources[item.id] ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Enter Button CTA */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="btn-glow px-10 py-4.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full font-bold shadow-lg flex items-center gap-3 transition-transform hover:scale-[1.03]"
            >
              <span className="material-icons text-xl animate-spin-slow">auto_awesome</span>
              <span>✨ Enter Learning World</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
