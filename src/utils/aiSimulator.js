/**
 * EduVerse AI Pedagogy Simulator
 * Dynamically constructs rich, structured, pedagogy-informed educational content
 * and simulates Gemini AI real-time streaming output.
 */

const DEFAULT_SUBJECT_TOPICS = {
  Mathematics: {
    title: "Quadratic Equations & Parabolic Motion",
    objectives: [
      "Define quadratic equations and their graph structures (parabolas).",
      "Solve quadratics using factoring, completing the square, and the quadratic formula.",
      "Model real-world projectile trajectories mathematically."
    ],
    flow: [
      "Hook: Show a video of an basketball shot and plot its trajectory path.",
      "Direct Instruction: Define y = ax² + bx + c and show how vertex represents peak height.",
      "Guided Practice: Factor x² - 5x + 6 = 0 together.",
      "Independent Exploration: Puzzle Temple challenges matching equations to physical graph cards."
    ],
    notes: "Watch out for students confusing the sign of 'b' in the quadratic formula. Emphasize that the vertex represents maximum/minimum points in physical contexts.",
    examples: [
      { name: "Angry Birds Trajectory", desc: "Modeling bird shots with y = -0.05x² + 2x + 5 to find landing distance." },
      { name: "Bridge Arch Design", desc: "Calculating width of parabolic suspension cables." }
    ],
    misconceptions: "Students often believe all curves are parabolic, or fail to distribute the negative sign to the entire numerator in quadratic formula.",
    questions: [
      "Why must the 'a' coefficient in ax² + bx + c be non-zero?",
      "How does the discriminant (b² - 4ac) help us predict real-world intersections?"
    ],
    quiz: [
      { type: "mcq", q: "What shape is formed by the graph of a quadratic equation?", options: ["Straight line", "Circle", "Parabola", "Hyperbola"], answer: "Parabola", explanation: "A quadratic equation always maps to a parabolic curve." },
      { type: "mcq", q: "If the discriminant b² - 4ac is negative, how many real roots exist?", options: ["Two", "One", "Zero", "Infinite"], answer: "Zero", explanation: "A negative discriminant indicates complex roots, meaning the parabola does not cross the x-axis." },
      { type: "short", q: "Solve for x: x² - 9 = 0", answer: "3,-3", explanation: "Factoring yields (x-3)(x+3)=0, which gives x = 3 and x = -3." }
    ],
    worksheets: {
      easy: "Solve basic quadratics by factoring: x² - 4 = 0, x² - 6x + 9 = 0. Draw the parabolic vertex.",
      medium: "Solve using the quadratic formula: 2x² - 7x + 3 = 0. Identify the axis of symmetry.",
      advanced: "An object is thrown upward at 15 m/s from a 20m ledge. Write the height equation and calculate the exact second it strikes the ground."
    },
    activities: [
      { name: "Catapult Launch Experiment", desc: "Build popsicle stick catapults, measure distance, and calculate quadratic equations modeling their flight path." },
      { name: "Desmos Graphing Art", desc: "Design a voxel character using only quadratic inequality bounds." }
    ],
    translation: {
      English: "Quadratic equations represent curves called parabolas where the highest power of x is two.",
      Tamil: "இருபடிச் சமன்பாடுகள் அதிபரவளைய வளைவுகளைக் குறிக்கின்றன, இதில் x இன் மிக உயர்ந்த அடுக்கு இரண்டு ஆகும்.",
      Hindi: "द्विघात समीकरण परवलय नामक वक्रों को दर्शाते हैं जहाँ x की उच्चतम घात दो होती है।",
      Kannada: "ದ್ವಿಘಾತ ಸಮೀಕರಣಗಳು ಪ್ಯಾರಾಬೋಲಾಸ್ ಎಂಬ ವಕ್ರಾಕೃತಿಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ, ಅಲ್ಲಿ x ನ ಗರಿಷ್ಠ ಘಾತವು ಎರಡು ಆಗಿರುತ್ತದೆ.",
      Malayalam: "ദ്വിമാന സമവാക്യങ്ങൾ പരാബോളകൾ എന്ന വക്രങ്ങളെ പ്രതിനിധീകരിക്കുന്നു, അവിടെ x-ന്റെ ഉയർന്ന പവർ രണ്ടാണ്.",
      Telugu: "ద్విఘాత సమీకరణాలు పారాబొలాస్ అనే వక్రతలను సూచిస్తాయి, ఇక్కడ x యొక్క గరిష్ట శక్తి రెండు ఉంటుంది."
    }
  },
  Science: {
    title: "DNA Double Helix & Molecular Replication",
    objectives: [
      "Identify the double helix structure of DNA and its component nucleotides.",
      "Explain the base-pairing rules (Adenine-Thymine, Cytosine-Guanine).",
      "Model the semi-conservative process of DNA replication."
    ],
    flow: [
      "Hook: Discuss how a single cell contains 2 meters of DNA packed tightly.",
      "Direct Instruction: Explore base-pairing, hydrogen bonds, and antiparallel strands.",
      "Guided Practice: Replicate a sequence: 5'-ATCGGCTA-3' into its complementary strand.",
      "Simulation: Interact with the spinning DNA strands in the Science rainforest biome."
    ],
    notes: "Remind students that replication runs 5' to 3'. The lagging strand requires Okazaki fragments, which can be visualized as stepped voxel bridges.",
    examples: [
      { name: "Crime Scene DNA Profile", desc: "Matching hair follicle DNA using PCR amplification." },
      { name: "CRISPR Gene Editing", desc: "Locating specific sequences to edit mutations." }
    ],
    misconceptions: "Students often think DNA is static or that adenine can pair with cytosine. Emphasize chemical hydrogen bond counts (2 for A-T, 3 for C-G).",
    questions: [
      "Why is DNA replication called semi-conservative?",
      "What would happen if helicase failed to unzip the helix?"
    ],
    quiz: [
      { type: "mcq", q: "Which base always pairs with Adenine in DNA?", options: ["Cytosine", "Guanine", "Thymine", "Uracil"], answer: "Thymine", explanation: "Adenine binds with Thymine via two hydrogen bonds." },
      { type: "mcq", q: "What enzyme is responsible for unzipping the DNA double helix?", options: ["Polymerase", "Helicase", "Ligase", "Primase"], answer: "Helicase", explanation: "Helicase breaks hydrogen bonds to unzip the strands." },
      { type: "short", q: "State the complementary strand of 5'-GATTACA-3'", answer: "3'-CTAATGT-5'", explanation: "Using pairing laws: G-C, A-T, T-A, T-A, A-T, C-G, A-T." }
    ],
    worksheets: {
      easy: "Label base nucleotide components: phosphate group, deoxyribose sugar, and nitrogenous bases.",
      medium: "Construct the complementary sequence for a 20-base gene. Identify hydrogen bond counts.",
      advanced: "Contrast replication in eukaryotes vs prokaryotes, focusing on replication forks and Okazaki fragment ligations."
    },
    activities: [
      { name: "Strawberry DNA Extraction", desc: "Extract real DNA fibers using dish soap, salt, and cold rubbing alcohol." },
      { name: "Origami DNA Folding", desc: "Fold paper double helices, labeling hydrogen bond locations." }
    ],
    translation: {
      English: "DNA contains our genetic code shaped as a double helix composed of nucleotides.",
      Tamil: "டிஎன்ஏ நமது மரபணு குறியீட்டைக் கொண்டுள்ளது, இது நியூக்ளியோடைடுகளால் ஆன இரட்டைச் சுருள் வடிவத்தில் உள்ளது.",
      Hindi: "डीएनए में हमारा आनुवंशिक कोड होता है जो न्यूक्लियोटाइड से बने दोहरे सर्पिलाकार रूप में होता है।",
      Kannada: "ಡಿಎನ್‌ಎ ನ್ಯೂಕ್ಲಿಯೋಟೈಡ್‌ಗಳಿಂದ ಕೂಡಿದ ಡಬಲ್ ಹೆಲಿಕ್ಸ್ ರೂಪದಲ್ಲಿ ನಮ್ಮ ಆನುವಂಶಿಕ ಸಂಕೇತವನ್ನು ಒಳಗೊಂಡಿದೆ.",
      Malayalam: "ന്യൂക്ലിയോടൈഡുകളാൽ നിർമ്മിതമായ ഒരു ഇരട്ട ഹെലിക്സ് ആകൃതിയിൽ ഡിഎൻഎയിൽ നമ്മുടെ ജനിതക കോഡ് അടങ്ങിയിരിക്കുന്നു.",
      Telugu: "DNA మన జన్యు కోడ్‌ను న్యూక్లియోటైడ్‌లతో కూడిన డబుల్ హెలిక్స్ ఆకారంలో కలిగి ఉంటుంది."
    }
  },
  English: {
    title: "Poetic Structures, Haikus & Golden Sunsets",
    objectives: [
      "Deconstruct syllabic patterns in traditional Japanese Haikus (5-7-5).",
      "Contrast Haikus with Shakespearean iambic pentameter sonnets.",
      "Evaluate environmental imagery in descriptive writing."
    ],
    flow: [
      "Hook: Meditate on the cherry blossoms falling in the biome and compose a single sentence of observation.",
      "Direct Instruction: Study Haiku syllable constraints and focus on nature (Kigo).",
      "Guided Practice: Count syllables on several phrases.",
      "Creative Writing: Compose a haiku and float it along the virtual village river."
    ],
    notes: "Encourage students to focus on concrete images rather than abstract emotions. Instead of writing 'I feel sad', write 'a cold rain drops on the stone'.",
    examples: [
      { name: "Matsuo Basho's Frog Haiku", desc: "An old silent pond... A frog jumps into the pond, splash! Silence again." },
      { name: "Sonnet 18", desc: "Shall I compare thee to a summer's day?" }
    ],
    misconceptions: "Students think haikus must rhyme. They do not; the core structure relies purely on syllable counts.",
    questions: [
      "How does strict structure trigger greater creativity?",
      "What elements of nature define the transition of seasons in poetry?"
    ],
    quiz: [
      { type: "mcq", q: "What is the syllable structure of a traditional Haiku?", options: ["5-5-5", "5-7-5", "7-5-7", "5-8-5"], answer: "5-7-5", explanation: "Haikus feature 3 lines containing 5, 7, and 5 syllables respectively." },
      { type: "mcq", q: "Which poetic term refers to a turn in thought or argument?", options: ["Stanza", "Meter", "Volta", "Couplet"], answer: "Volta", explanation: "The Volta is the shift or turn, typical in sonnets." },
      { type: "short", q: "How many syllables are in the word 'education'?", answer: "4", explanation: "Ed-u-ca-tion has four distinct vowel sound beats." }
    ],
    worksheets: {
      easy: "Count syllables for ten words. Write a 3-line descriptive stanza.",
      medium: "Write a haiku about a floating voxel island using at least one seasonal word (kigo).",
      advanced: "Compare a Japanese haiku and a Petrarchan sonnet, highlighting how structure impacts rhythm, pace, and thematic delivery."
    },
    activities: [
      { name: "Lantern Poetry Walk", desc: "Compose lines of poetry on lanterns and place them around the village river.",
        type: "creative" }
    ],
    translation: {
      English: "Poetry uses rhythm, imagery, and structural constraints to express deep emotional ideas.",
      Tamil: "கவிதை ஆழமான உணர்ச்சி கருத்துக்களை வெளிப்படுத்த தாளம், உருவகம் மற்றும் கட்டமைப்பு கட்டுப்பாடுகளைப் பயன்படுத்துகிறது.",
      Hindi: "कविता गहरे भावनात्मक विचारों को व्यक्त करने के लिए लय, कल्पना और संरचनात्मक बाधाओं का उपयोग करती है।",
      Kannada: "ಕಾವ್ಯವು ಆಳವಾದ ಭಾವನಾತ್ಮಕ ಆಲೋಚನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಲಯ, ಕಲ್ಪನೆ ಮತ್ತು ರಚನಾತ್ಮಕ ನಿರ್ಬಂಧಗಳನ್ನು ಬಳಸುತ್ತದೆ.",
      Malayalam: "കവിത ആഴത്തിലുള്ള വൈകാരിക ആശയങ്ങൾ പ്രകടിപ്പിക്കുന്നതിന് താളം, ഇമേജറി, ഘടനാപരമായ നിയന്ത്രണങ്ങൾ എന്നിവ ഉപയോഗിക്കുന്നു.",
      Telugu: "కవిత్వం లోతైన భావోద్వేగ ఆలోచనలను వ్యక్తీకరించడానికి లయ, ఇమేజరీ మరియు నిర్మాణాత్మಕ పరిమితులను ఉపయోగిస్తుంది."
    }
  },
  History: {
    title: "Ancient Kingdoms & Irrigation Canals",
    objectives: [
      "Analyze the role of rivers in the settlement of ancient Mesopotamian civilisations.",
      "Examine Code of Hammurabi laws and their social hierarchy implications.",
      "Understand Mesopotamian temple architectural engineering (Ziggurats)."
    ],
    flow: [
      "Hook: Look at the step pyramids in the biome and identify how heavy stones were moved without trucks.",
      "Direct Instruction: Study Tigris and Euphrates silt cycles and canal building.",
      "Group Debate: Hammurabi's eye-for-an-eye system - fair or cruel?",
      "Exploration: Walk across the ruins and bridges to find maps of Sumer."
    ],
    notes: "Ensure students understand that irrigation enabled crop surpluses, which directly catalyzed social hierarchy stratification.",
    examples: [
      { name: "Ziggurat of Ur", desc: "Massive mud-brick step pyramids built to honor sky gods." },
      { name: "Cuneiform Clay Tablets", desc: "Earliest writing system recording grain tallies." }
    ],
    misconceptions: "Students confuse Egypt and Mesopotamia. While both river valleys, they had distinct irrigation types and religious outlooks.",
    questions: [
      "Why is water management the foundation of early empires?",
      "How did writing transition from accounting tool to literature?"
    ],
    quiz: [
      { type: "mcq", q: "What is the name of the stepped temple structures in ancient Mesopotamia?", options: ["Pyramid", "Obelisk", "Ziggurat", "Parthenon"], answer: "Ziggurat", explanation: "Ziggurats were massive stepped temples built by Sumerians, Babylonians, and Assyrians." },
      { type: "mcq", q: "Which two rivers framed the cradle of Mesopotamian civilization?", options: ["Nile and Jordan", "Tigris and Euphrates", "Indus and Ganges", "Yangtze and Yellow"], answer: "Tigris and Euphrates", explanation: "Mesopotamia literally means 'between rivers', referencing the Tigris and Euphrates." },
      { type: "short", q: "What is the earliest writing system called?", answer: "Cuneiform", explanation: "Cuneiform was written by pressing reeds into wet clay tablets." }
    ],
    worksheets: {
      easy: "Draw a map marking the Fertile Crescent, Tigris River, and Euphrates River.",
      medium: "Analyze Hammurabi's code. Write a summary of three laws and write down their societal goals.",
      advanced: "Draft an essay discussing how agricultural surplus led directly to specialization of labor and social classes."
    },
    activities: [
      { name: "Clay Tablet Cuneiform", desc: "Use clay or playdough and a wooden chopstick to stamp cuneiform numbers." }
    ],
    translation: {
      English: "Early civilisations sprouted along river systems which provided water, silt, and trade routes.",
      Tamil: "ஆரம்பகால நாகரிகங்கள் நதி அமைப்புகளில் தழைத்தோங்கின, அவை நீர், வண்டல் மற்றும் வர்த்தக வழிகளை வழங்கின.",
      Hindi: "प्रारंभिक सभ्यताएँ नदी प्रणालियों के किनारे विकसित हुईं जो पानी, गाद और व्यापार मार्ग प्रदान करती थीं।",
      Kannada: "ಆರಂಭಿಕ ನಾಗರಿಕತೆಗಳು ನದಿ ವ್ಯವಸ್ಥೆಗಳ ಉದ್ದಕ್ಕೂ ಮೊಳಕೆಯೊಡೆದವು, ಇದು ನೀರು, ಹೂಳು ಮತ್ತು ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳನ್ನು ಒದಗಿಸಿತು.",
      Malayalam: "ആദ്യകാല നാഗരികതകൾ നദീതടങ്ങളിൽ വളർന്നു വന്നു, അത് വെള്ളവും എക്കലും വ്യാപാര പാതകളും നൽകി.",
      Telugu: "ప్రారంభ నాగరికతలు నదీ వ్యవస్థల వెంబడి మొలకెత్తాయి, ఇవి నీరు, పూడిక మరియు వాణిజ్య మార్గాలను అందించాయి."
    }
  },
  "Computer Science": {
    title: "Binary Search & Algorithmic Efficiency",
    objectives: [
      "Explain the divide-and-conquer strategy behind Binary Search.",
      "Compare linear search (O(N)) vs binary search (O(log N)) complexity.",
      "Write pseudocode and trace search indices on sorted arrays."
    ],
    flow: [
      "Hook: Play a number guessing game. Trace how splitting the range in half reaches any number in under 7 steps.",
      "Direct Instruction: Why sorting is a requirement for binary search. Explain Low, High, and Mid pointers.",
      "Trace Exercise: Step through search for element 42 in [10, 20, 30, 42, 50, 60, 70].",
      "Interactive: Walk along the server racks in CS city, filtering neon code blocks by binary partitions."
    ],
    notes: "Make sure students avoid infinite loops by updating boundaries correctly: low = mid + 1 and high = mid - 1.",
    examples: [
      { name: "Contact List Lookup", desc: "Searching a sorted contact database instantly by alphabetical split." },
      { name: "Git Bisect", desc: "Debugging a codebase by searching historical commits using binary splits." }
    ],
    misconceptions: "Students forget that arrays MUST be sorted. If the list is unsorted, binary search fails completely.",
    questions: [
      "What is the maximum number of checks to search an array of size 1024?",
      "Why does binary search run in O(log N) rather than O(N)?"
    ],
    quiz: [
      { type: "mcq", q: "What is the prerequisite for running a binary search?", options: ["Array must be empty", "Array must be sorted", "Array must contain integers only", "Array must be small"], answer: "Array must be sorted", explanation: "Binary search relies on order to discard half the search space at each step." },
      { type: "mcq", q: "What is the time complexity of binary search in the worst case?", options: ["O(1)", "O(N)", "O(N²)", "O(log N)"], answer: "O(log N)", explanation: "Each step cuts the remaining search list in half, yielding logarithmic growth." },
      { type: "short", q: "In an array of 8 elements, what is the maximum number of comparisons?", answer: "3", explanation: "log2(8) = 3 comparisons maximum." }
    ],
    worksheets: {
      easy: "Trace pointers (low, high, mid) for finding 7 in [1, 3, 5, 7, 9, 11].",
      medium: "Write a complete JavaScript function implementing recursive Binary Search.",
      advanced: "Describe how we can adapt binary search to solve floating-point mathematical problems like finding square roots."
    },
    activities: [
      { name: "Voxel Binary Sorting Lab", desc: "Manually arrange voxel code blocks in order and perform binary division steps." }
    ],
    translation: {
      English: "Binary search finds elements in a sorted array by repeatedly dividing the search interval in half.",
      Tamil: "இருபடி தேடல் என்பது தேடல் இடைவெளியை மீண்டும் மீண்டும் பாதியாகப் பிரிப்பதன் மூலம் வரிசைப்படுத்தப்பட்ட அணியில் உள்ள உறுப்புகளைக் கண்டறியும்.",
      Hindi: "बाइनरी सर्च सर्च अंतराल को बार-बार आधा करके एक क्रमबद्ध सरणी में तत्वों को ढूंढता है।",
      Kannada: "ಬೈನರಿ ಹುಡುಕಾಟವು ಹುಡುಕಾಟದ ಮಧ್ಯಂತರವನ್ನು ಪದೇ ಪದೇ ಅರ್ಧದಷ್ಟು ವಿಭಜಿಸುವ ಮೂಲಕ ವಿಂಗಡಿಸಲಾದ ರಚನೆಯಲ್ಲಿ ಅಂಶಗಳನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತದೆ.",
      Malayalam: "ബൈനറി സെർച്ച് തിരയൽ ഇടവേള ആവർത്തിച്ച് പകുതിയായി വിഭജിച്ചുകൊണ്ട് അടുക്കിവെച്ച അറേയിലെ ഘടകങ്ങളെ കണ്ടെത്തുന്നു.",
      Telugu: "బైనరీ సెర్చ్ అనేది సెర్చ్ విరామాన్ని పదేపదే సగానికి విభజించడం ద్వారా క్రమబద్ధీకరించబడిన శ్రేణిలోని మూలకాలను కనుగొంటుంది."
    }
  }
};

/**
 * Streams generated educational content chunk-by-chunk.
 * Calls `onChunk` with accumulated text and `onComplete` when done.
 */
export function streamAIContent({ grade, subject, topic, onChunk, onComplete }) {
  const selectedSubject = DEFAULT_SUBJECT_TOPICS[subject] || DEFAULT_SUBJECT_TOPICS.Mathematics;
  
  // Customise title/topic based on user prompt if provided
  const parsedTopic = topic ? topic.trim() : selectedSubject.title;
  
  const contentJSON = {
    ...selectedSubject,
    title: parsedTopic
  };

  const stringified = JSON.stringify(contentJSON, null, 2);
  let index = 0;
  const chunkSize = 25; // Characters per tick

  const interval = setInterval(() => {
    index += chunkSize;
    if (index >= stringified.length) {
      onChunk(stringified);
      clearInterval(interval);
      if (onComplete) onComplete(contentJSON);
    } else {
      onChunk(stringified.substring(0, index));
    }
  }, 30);

  return () => clearInterval(interval);
}
