import React, { useState, useEffect } from 'react';

export default function ContentOverlay({ 
  activeTarget, 
  generatedData, 
  isGenerating, 
  onClose,
  grade,
  subject,
  topic
}) {
  const [activeWorksheetTab, setActiveWorksheetTab] = useState('medium');
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    selectedOption: '',
    shortAnswerText: '',
    checked: false,
    feedback: '',
    score: 0,
    quizFinished: false
  });
  const [exitTicketAnswers, setExitTicketAnswers] = useState({
    learned: '',
    clarity: 3, // 1 to 5 slider
  });
  const [exitTicketSubmitted, setExitTicketSubmitted] = useState(false);

  // Reset states when changing tabs
  useEffect(() => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedOption: '',
      shortAnswerText: '',
      checked: false,
      feedback: '',
      score: 0,
      quizFinished: false
    });
    setShowAnswerKey(false);
    setExitTicketSubmitted(false);
    setExitTicketAnswers({ learned: '', clarity: 3 });
  }, [activeTarget]);

  if (!activeTarget || activeTarget === 'Learning Progress') return null;

  // Header Icon selector
  const getIcon = () => {
    switch (activeTarget) {
      case 'Knowledge Temple': return 'school';
      case 'Challenge Tower': return 'workspace_premium';
      case 'Crafting Workshop': return 'palette';
      case 'Innovation Lab': return 'psychology';
      case 'Language Portal': return 'translate';
      case 'Village Hall': return 'chat';
      case 'Reflection Garden': return 'park';
      default: return 'info';
    }
  };

  // 1. KNOWLEDGE TEMPLE RENDERER
  const renderKnowledgeTemple = () => {
    if (!generatedData) return null;
    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">🎯 Learning Objectives</h4>
          <ul className="space-y-2">
            {generatedData.objectives?.map((obj, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-purple-400 select-none">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">⏱️ Guided Lesson Flow</h4>
          <ol className="space-y-3">
            {generatedData.flow?.map((flowItem, i) => (
              <li key={i} className="flex gap-3 text-sm bg-white/5 border border-white/5 p-3 rounded-xl">
                <span className="font-outfit font-extrabold text-cyan-400 select-none">0{i+1}</span>
                <span className="text-gray-300">{flowItem}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">💡 Pedagogical Teacher Notes</h4>
          <p className="text-sm text-gray-300 bg-purple-950/15 border border-purple-500/15 p-4 rounded-xl italic">
            {generatedData.notes}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">📁 Real-World Application Analogies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedData.examples?.map((ex, i) => (
              <div key={i} className="glass p-3 rounded-xl border border-white/5">
                <div className="font-bold text-xs text-white mb-1">{ex.name}</div>
                <div className="text-[11px] text-gray-400">{ex.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-red-400 font-bold mb-2">⚠️ Common Misconceptions</h4>
            <div className="text-xs text-gray-300 bg-red-950/15 border border-red-500/15 p-3 rounded-xl">
              {generatedData.misconceptions}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">❓ Socratic Prompts</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {generatedData.questions?.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-purple-400">?</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // 2. CHALLENGE TOWER RENDERER (Interactive Quiz)
  const renderChallengeTower = () => {
    if (!generatedData || !generatedData.quiz) return null;
    const questions = generatedData.quiz;
    const currentQ = questions[quizState.currentQuestionIndex];

    if (quizState.quizFinished) {
      return (
        <div className="text-center py-10 space-y-4">
          <span className="material-icons text-5xl text-yellow-400 animate-bounce">emoji_events</span>
          <h4 className="text-xl font-bold font-outfit text-white">Quiz Completed!</h4>
          <p className="text-sm text-gray-300">
            You scored <span className="font-bold text-cyan-400">{quizState.score}</span> out of <span className="font-bold">{questions.length}</span>
          </p>
          <div className="w-48 h-2.5 bg-white/5 rounded-full mx-auto overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" 
              style={{ width: `${(quizState.score / questions.length) * 100}%` }}
            />
          </div>
          <button 
            onClick={() => setQuizState({
              currentQuestionIndex: 0, selectedOption: '', shortAnswerText: '', checked: false, feedback: '', score: 0, quizFinished: false
            })}
            className="mt-6 px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-xs transition"
          >
            Restart Challenge
          </button>
        </div>
      );
    }

    const checkAnswer = () => {
      let isCorrect = false;
      if (currentQ.type === 'mcq') {
        isCorrect = quizState.selectedOption === currentQ.answer;
      } else {
        // Short Answer matching
        const cleanAnswer = currentQ.answer.toLowerCase().replace(/\s/g, '');
        const cleanInput = quizState.shortAnswerText.toLowerCase().replace(/\s/g, '');
        isCorrect = cleanInput.includes(cleanAnswer) || cleanAnswer.includes(cleanInput);
      }

      setQuizState(prev => ({
        ...prev,
        checked: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        feedback: isCorrect 
          ? `✨ Correct! ${currentQ.explanation}` 
          : `❌ Incorrect. Correct answer: ${currentQ.answer}. ${currentQ.explanation}`
      }));
    };

    const nextQuestion = () => {
      if (quizState.currentQuestionIndex + 1 >= questions.length) {
        setQuizState(prev => ({ ...prev, quizFinished: true }));
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedOption: '',
          shortAnswerText: '',
          checked: false,
          feedback: ''
        }));
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-mono uppercase">Question {quizState.currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-xs text-cyan-400 font-semibold">Current Score: {quizState.score}</span>
        </div>

        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
          <h5 className="font-outfit font-bold text-base text-white">{currentQ.q}</h5>
        </div>

        {currentQ.type === 'mcq' ? (
          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = quizState.selectedOption === opt;
              return (
                <button
                  key={i}
                  disabled={quizState.checked}
                  onClick={() => setQuizState(prev => ({ ...prev, selectedOption: opt }))}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                    isSelected 
                      ? 'bg-purple-600/30 border-purple-500 text-white font-semibold' 
                      : 'bg-white/0 border-white/5 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <input 
              type="text"
              disabled={quizState.checked}
              value={quizState.shortAnswerText}
              onChange={(e) => setQuizState(prev => ({ ...prev, shortAnswerText: e.target.value }))}
              placeholder="Type your mathematical or descriptive response..."
              className="w-full glass-input rounded-xl p-3 text-xs text-white"
            />
          </div>
        )}

        {quizState.checked ? (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            quizState.feedback.startsWith('✨') 
              ? 'bg-green-950/15 border-green-500/30 text-green-300' 
              : 'bg-red-950/15 border-red-500/30 text-red-300'
          }`}>
            {quizState.feedback}
          </div>
        ) : null}

        <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
          {!quizState.checked ? (
            <button
              disabled={currentQ.type === 'mcq' ? !quizState.selectedOption : !quizState.shortAnswerText}
              onClick={checkAnswer}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold text-xs disabled:opacity-50 hover:scale-[1.03] transition-transform"
            >
              Verify Response
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-xs hover:bg-gray-200 hover:scale-[1.03] transition-transform"
            >
              {quizState.currentQuestionIndex + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    );
  };

  // 3. CRAFTING WORKSHOP RENDERER (Worksheets)
  const renderCraftingWorkshop = () => {
    if (!generatedData || !generatedData.worksheets) return null;
    const wk = generatedData.worksheets;

    return (
      <div className="space-y-6">
        {/* Level Selectors */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          {['easy', 'medium', 'advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveWorksheetTab(lvl)}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg uppercase tracking-wider transition ${
                activeWorksheetTab === lvl 
                  ? 'bg-purple-600/30 text-white font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Level details */}
        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-4">
          <h5 className="font-outfit font-extrabold text-sm text-cyan-400 uppercase tracking-widest">
            {activeWorksheetTab} Assignment Sheet
          </h5>
          <p className="text-sm text-gray-200 leading-relaxed font-mono whitespace-pre-line">
            {wk[activeWorksheetTab]}
          </p>
        </div>

        {/* Toggle Answer Key */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className="flex items-center gap-2 text-xs text-purple-300 font-bold hover:text-white transition"
          >
            <span className="material-icons text-sm">{showAnswerKey ? 'expand_less' : 'expand_more'}</span>
            {showAnswerKey ? 'Hide Answer Key' : 'Reveal Suggested Solutions'}
          </button>
          {showAnswerKey && (
            <div className="bg-purple-950/15 border border-purple-500/15 p-4 rounded-xl text-xs text-purple-200 font-mono">
              <strong>Solutions Matrix:</strong>
              <div className="mt-2 space-y-2">
                <div>• Q1 Answer: x = 2 or x = -2 (Easy)</div>
                <div>• Q2 Axis: x = -b/(2a) = 7/4 = 1.75 (Medium)</div>
                <div>• Q3 Solution: Set -4.9t² + 15t + 20 = 0. Solving with quadratic formula yields t ≈ 4.04 seconds (Advanced).</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 4. INNOVATION LAB RENDERER (Activities)
  const renderInnovationLab = () => {
    if (!generatedData) return null;
    return (
      <div className="space-y-6">
        {generatedData.activities?.map((act, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="font-outfit font-extrabold text-sm text-purple-300 uppercase tracking-wide">🔬 Activity 0{i+1}: {act.name}</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/20 text-[9px] text-cyan-400 font-semibold uppercase tracking-wider">Hands-on</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {act.desc}
            </p>
          </div>
        ))}
      </div>
    );
  };

  // 5. LANGUAGE PORTAL RENDERER
  const renderLanguagePortal = () => {
    if (!generatedData || !generatedData.translation) return null;
    const languages = Object.keys(generatedData.translation);

    return (
      <div className="space-y-6">
        <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Select Target Language</label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lng) => (
            <button
              key={lng}
              onClick={() => setSelectedLanguage(lng)}
              className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition ${
                selectedLanguage === lng
                  ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {lng}
            </button>
          ))}
        </div>

        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-4 mt-6">
          <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase border-b border-white/10 pb-2">
            <span>Original Topic: {topic}</span>
            <span>Target: {selectedLanguage}</span>
          </div>
          <p className="text-base text-white leading-relaxed font-outfit text-center py-4 font-semibold italic">
            "{generatedData.translation[selectedLanguage]}"
          </p>
        </div>
      </div>
    );
  };

  // 6. VILLAGE HALL RENDERER (Parent summary)
  const renderVillageHall = () => {
    if (!generatedData) return null;
    return (
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-4">
          <h5 className="font-outfit font-extrabold text-sm text-cyan-400 uppercase tracking-wide border-b border-white/10 pb-2">
            👨‍👩‍👧 Universal Parent Summary
          </h5>
          <p className="text-xs text-gray-300 leading-relaxed">
            In today's lesson, your student explored the real-world mechanics of <strong>{topic}</strong>. Through cooperative voxel biomes and collaborative inquiry tasks, students designed solutions integrating core theories of <strong>{subject}</strong>.
          </p>
        </div>

        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3">
          <h5 className="font-outfit font-extrabold text-sm text-purple-300 uppercase tracking-wide">
            🏡 Home Reinforcement Tasks
          </h5>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2">
              <span className="text-cyan-400">•</span>
              Ask your child to explain how projectile math or leaf biology models function around home appliances.
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400">•</span>
              Review the Challenge Tower quiz results and work on the Socratic discussion prompts together.
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // 7. REFLECTION GARDEN RENDERER (Exit ticket & Analytics)
  const renderReflectionGarden = () => {
    if (exitTicketSubmitted) {
      return (
        <div className="text-center py-10 space-y-4">
          <span className="material-icons text-5xl text-emerald-400 animate-pulse">check_circle</span>
          <h4 className="text-lg font-bold font-outfit text-white">Exit Ticket Submitted!</h4>
          <p className="text-xs text-gray-400">Class analytic indicators have adjusted with the new student logs.</p>
          
          {/* Voxel Analytics representation */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-left space-y-3 mt-6 text-xs">
            <strong className="text-cyan-400 uppercase text-[10px] tracking-wider">Simulated Class Analytics</strong>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Topic Comprehension Rate</span>
                  <span className="font-bold text-white">82%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '82%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Student Engagement Factor</span>
                  <span className="font-bold text-white">94%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h5 className="font-outfit font-extrabold text-sm text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-2">
          🌸 Reflection Garden Exit Ticket
        </h5>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">What is the most critical takeaway from today's lesson?</label>
            <textarea
              rows={3}
              value={exitTicketAnswers.learned}
              onChange={(e) => setExitTicketAnswers(prev => ({ ...prev, learned: e.target.value }))}
              placeholder="Reflect on key concept parameters or equations..."
              className="w-full glass-input rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Self-assessed comprehension level (1-5)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={exitTicketAnswers.clarity}
                onChange={(e) => setExitTicketAnswers(prev => ({ ...prev, clarity: Number(e.target.value) }))}
                className="flex-1 accent-purple-500"
              />
              <span className="font-outfit text-base font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-xl">
                {exitTicketAnswers.clarity} / 5
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setExitTicketSubmitted(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold text-xs hover:scale-[1.03] transition-transform"
            >
              Submit Exit Ticket
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Select Render Body
  const renderBody = () => {
    switch (activeTarget) {
      case 'Knowledge Temple': return renderKnowledgeTemple();
      case 'Challenge Tower': return renderChallengeTower();
      case 'Crafting Workshop': return renderCraftingWorkshop();
      case 'Innovation Lab': return renderInnovationLab();
      case 'Language Portal': return renderLanguagePortal();
      case 'Village Hall': return renderVillageHall();
      case 'Reflection Garden': return renderReflectionGarden();
      default: return null;
    }
  };

  return (
    <div className="absolute right-6 top-24 bottom-24 w-96 md:w-[450px] glass-premium rounded-[28px] border border-white/12 z-30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl pointer-events-auto">
      {/* Decorative colored glow backdrop */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 select-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-xl border border-white/5 text-purple-300">
            <span className="material-icons text-xl">{getIcon()}</span>
          </div>
          <div>
            <h3 className="font-outfit font-extrabold text-sm tracking-wide text-white uppercase">{activeTarget}</h3>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">
              {grade} • {subject}
            </span>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/5"
        >
          <span className="material-icons text-xl">close</span>
        </button>
      </div>

      {/* Scrollable Content Base */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scroll">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full py-16 space-y-4">
            {/* Pulsating AI loading node */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <span className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
              <span className="material-icons text-3xl text-purple-400 animate-spin-slow">auto_awesome</span>
            </div>
            <div className="text-center">
              <h5 className="font-outfit font-bold text-xs text-white">Gemini AI generating curriculum...</h5>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-mono">Formulating pedagogy parameters</p>
            </div>
          </div>
        ) : (
          renderBody()
        )}
      </div>

      {/* Footer Branding */}
      {!isGenerating && (
        <div className="border-t border-white/10 pt-3.5 mt-4 flex justify-between items-center text-[9px] text-gray-500 select-none">
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-[11px] text-purple-400">auto_awesome</span>
            <span>Generated by Gemini AI</span>
          </div>
          <span className="text-[9px] text-cyan-400/80 font-semibold tracking-wider font-mono">Pedagogy Mode: Active</span>
        </div>
      )}
    </div>
  );
}
