/* ════════════════════════════════════
  LESSON CONFIG
════════════════════════════════════ */

const LessonConfig = window.LessonConfig || { difficulty: "advanced" };

/*
  Backend can inject this before script.js:

  window.LessonFlowConfig = {
    checkpointUrl: "end_module_assessment.html",
    lessonOrder: [1, 2, 3, 4, 5]
  };

  Example if speech is removed:
  lessonOrder: [1, 2, 3, 4]

  Example if role play is last:
  lessonOrder: [1, 2, 4]
*/
const LessonFlowConfig = window.LessonFlowConfig || {
  checkpointUrl: "module_assessment.html",
  lessonOrder: [1, 2, 3, 4, 5],
};

const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

function resolveDifficulty(requested) {
  return VALID_DIFFICULTIES.includes(requested) ? requested : "beginner";
}

function getLevelLabel(difficulty) {
  return {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }[difficulty] || "Beginner";
}

function syncLevelBadges(difficulty) {
  const label = getLevelLabel(difficulty);
  document.querySelectorAll(".level-badge").forEach((el) => {
    el.textContent = label;
    el.dataset.level = difficulty;
  });
}

/* ════════════════════════════════════
  UTIL
════════════════════════════════════ */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function showFeedback(el, msg, good) {
  el.textContent = msg;
  el.className = "feedback show " + (good ? "correct-fb" : "wrong-fb");
}

function clearFeedback(el) {
  el.textContent = "";
  el.className = "feedback";
}

function goToScreen(current, next) {
  const currentScreen = document.getElementById(current);
  const nextScreen = document.getElementById(next);

  if (currentScreen) {
    currentScreen.classList.remove("screen-active");
    currentScreen.style.display = "none";
  }

  if (nextScreen) {
    nextScreen.style.display = "block";
    requestAnimationFrame(() => nextScreen.classList.add("screen-active"));
  }
}

function titleCaseVariant(variant) {
  return variant
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" → ");
}

function playAudioText(text, lang = "es-ES") {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderContent(content) {
  if (content.type === "text") {
    return `<span class="match-text">${content.value}</span>`;
  }
  if (content.type === "image") {
    return `<div class="match-image-wrap"><img src="${content.value}" alt="${content.alt || "match image"}" class="match-image" /></div>`;
  }
  if (content.type === "audio") {
    return `<button class="audio-play-btn" type="button" data-audio-text="${content.value}" aria-label="Play audio">🔊 Play</button>`;
  }
  return `<span>${content.value || ""}</span>`;
}

/* ════════════════════════════════════
  FLOW HELPERS
════════════════════════════════════ */

function getLessonOrder() {
  const order = LessonFlowConfig.lessonOrder;
  if (!Array.isArray(order) || order.length === 0) {
    return [1, 2, 3, 4, 5];
  }
  return order;
}

function getNextScreenNumber(currentScreenNumber) {
  const order = getLessonOrder();
  const currentIndex = order.indexOf(currentScreenNumber);

  if (currentIndex === -1) return null;
  if (currentIndex === order.length - 1) return null;

  return order[currentIndex + 1];
}

function markLessonComplete() {
  localStorage.setItem("lessonCompleted", "true");
}

function goToCheckpoint() {
  markLessonComplete();
  const checkpointUrl =
    LessonFlowConfig.checkpointUrl || "module_assessment.html";
  window.location.href = checkpointUrl;
}

function goToNextStep(currentScreenNumber) {
  const nextScreenNumber = getNextScreenNumber(currentScreenNumber);

  if (nextScreenNumber) {
    window.Fluentia.goToScreen(nextScreenNumber);
  } else {
    goToCheckpoint();
  }
}

/* ════════════════════════════════════
  MATCH DATA
════════════════════════════════════ */

const matchActivityBank = {
  beginner: {
    "text-text": [
      { id: 1, left: { type: "text", value: "Airport" }, right: { type: "text", value: "Aeropuerto" } },
      { id: 2, left: { type: "text", value: "Passport" }, right: { type: "text", value: "Pasaporte" } },
      { id: 3, left: { type: "text", value: "Suitcase" }, right: { type: "text", value: "Maleta" } },
      { id: 4, left: { type: "text", value: "Hotel" }, right: { type: "text", value: "Hotel" } },
      { id: 5, left: { type: "text", value: "Ticket" }, right: { type: "text", value: "Billete" } },
    ],
    "text-image": [
      { id: 1, left: { type: "text", value: "Airport" }, right: { type: "image", value: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80", alt: "Airport" } },
      { id: 2, left: { type: "text", value: "Passport" }, right: { type: "image", value: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=300&q=80", alt: "Passport" } },
      { id: 3, left: { type: "text", value: "Suitcase" }, right: { type: "image", value: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=300&q=80", alt: "Suitcase" } },
      { id: 4, left: { type: "text", value: "Hotel" }, right: { type: "image", value: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80", alt: "Hotel" } },
      { id: 5, left: { type: "text", value: "Ticket" }, right: { type: "image", value: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80", alt: "Ticket" } },
    ],
  },
  intermediate: {
    "text-text": [
      { id: 1, left: { type: "text", value: "Boarding Pass" }, right: { type: "text", value: "Pase de abordar" } },
      { id: 2, left: { type: "text", value: "Reservation" }, right: { type: "text", value: "Reservación" } },
      { id: 3, left: { type: "text", value: "Luggage" }, right: { type: "text", value: "Equipaje" } },
      { id: 4, left: { type: "text", value: "Taxi" }, right: { type: "text", value: "Taxi" } },
      { id: 5, left: { type: "text", value: "Map" }, right: { type: "text", value: "Mapa" } },
    ],
    "text-audio": [
      { id: 1, left: { type: "text", value: "Airport" }, right: { type: "audio", value: "Aeropuerto" } },
      { id: 2, left: { type: "text", value: "Passport" }, right: { type: "audio", value: "Pasaporte" } },
      { id: 3, left: { type: "text", value: "Suitcase" }, right: { type: "audio", value: "Maleta" } },
      { id: 4, left: { type: "text", value: "Hotel" }, right: { type: "audio", value: "Hotel" } },
      { id: 5, left: { type: "text", value: "Ticket" }, right: { type: "audio", value: "Billete" } },
    ],
  },
  advanced: {
    "text-image": [
      { id: 1, left: { type: "text", value: "Boarding Pass" }, right: { type: "image", value: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80", alt: "Boarding pass" } },
      { id: 2, left: { type: "text", value: "Reservation" }, right: { type: "image", value: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=300&q=80", alt: "Reservation" } },
      { id: 3, left: { type: "text", value: "Luggage" }, right: { type: "image", value: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=300&q=80", alt: "Luggage" } },
      { id: 4, left: { type: "text", value: "Taxi" }, right: { type: "image", value: "https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&w=300&q=80", alt: "Taxi" } },
      { id: 5, left: { type: "text", value: "Map" }, right: { type: "image", value: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=300&q=80", alt: "Map" } },
    ],
    "text-audio": [
      { id: 1, left: { type: "text", value: "Boarding Pass" }, right: { type: "audio", value: "Pase de abordar" } },
      { id: 2, left: { type: "text", value: "Reservation" }, right: { type: "audio", value: "Reservación" } },
      { id: 3, left: { type: "text", value: "Luggage" }, right: { type: "audio", value: "Equipaje" } },
      { id: 4, left: { type: "text", value: "Taxi" }, right: { type: "audio", value: "Taxi" } },
      { id: 5, left: { type: "text", value: "Map" }, right: { type: "audio", value: "Mapa" } },
    ],
  },
};

/* ════════════════════════════════════
  READING DATA
════════════════════════════════════ */

const readingActivityBank = {
  beginner: {
    "vocab-support": {
      passage:
        "María packs her suitcase and passport for her trip. At the airport, she checks in and gets her boarding pass. She then takes a taxi to her hotel.",
      questions: [
        { q: "What does María pack for her trip?", options: ["A passport", "A bicycle", "A sandwich"], answer: 0 },
        { q: "Where does María go first?", options: ["The airport", "The beach", "The train station"], answer: 0 },
        { q: "How does she get to the hotel?", options: ["Taxi", "Boat", "Bus"], answer: 0 },
      ],
    },
    "basic-comprehension": {
      passage:
        "María is excited for her first trip abroad. She packs warm-weather clothes, her passport, and a camera. After arriving at the airport, she checks in and receives her boarding pass.",
      questions: [
        { q: "How does María feel about her trip?", options: ["Excited", "Angry", "Bored"], answer: 0 },
        { q: "What does she receive at the airport?", options: ["A room key", "A boarding pass", "A map"], answer: 1 },
        { q: "What does she pack?", options: ["Passport and camera", "Laptop and book", "Shoes only"], answer: 0 },
      ],
    },
  },
  intermediate: {
    "standard-comprehension": {
      passage:
        "María is planning her first trip abroad. She packs carefully and arrives early at the airport. She checks in, gets her boarding pass, and later takes a taxi to her hotel, where the receptionist greets her warmly.",
      questions: [
        { q: "Why does María arrive early?", options: ["To avoid being late", "To eat lunch", "To buy shoes"], answer: 0 },
        { q: "Who greets María at the hotel?", options: ["The pilot", "The receptionist", "Her cousin"], answer: 1 },
        { q: "What happens after she gets her boarding pass?", options: ["She goes home", "She takes a taxi later", "She loses her bag"], answer: 1 },
      ],
    },
    "detail-hunt": {
      passage:
        "After a smooth flight, María arrives in a new city. She takes a taxi from the airport to her hotel. At the front desk, the receptionist gives her a room key and directions to a nearby café.",
      questions: [
        { q: "How does María travel from the airport?", options: ["Taxi", "Train", "Subway"], answer: 0 },
        { q: "What does the receptionist give her?", options: ["Passport", "A room key", "Plane ticket"], answer: 1 },
        { q: "What extra help does María receive?", options: ["Weather report", "Café directions", "Museum tickets"], answer: 1 },
      ],
    },
  },
  advanced: {
    inference: {
      passage:
        "Although María had prepared well for her trip, she still felt a little nervous stepping into a completely unfamiliar airport. However, after checking in smoothly and being welcomed kindly at her hotel, she began to relax and enjoy the experience.",
      questions: [
        { q: "Why was María nervous at first?", options: ["She forgot her suitcase", "The airport was unfamiliar", "She missed her flight"], answer: 1 },
        { q: "What helped María relax?", options: ["A friendly and smooth experience", "Sleeping on the plane", "Calling her family"], answer: 0 },
        { q: "What can we infer about María by the end?", options: ["She regrets traveling", "She is more comfortable now", "She wants to leave immediately"], answer: 1 },
      ],
    },
  },
};

/* ════════════════════════════════════
  SENTENCE DATA
════════════════════════════════════ */

const sentenceActivityBank = {
  beginner: {
    "drag-order": {
      question: "Build: I need a taxi to the hotel",
      correct: "Necesito un taxi al hotel",
      words: ["Necesito", "hotel", "un", "taxi", "al"],
    },
    "fill-blank": {
      question: "Choose the missing word",
      sentence: "Necesito un ____ al hotel.",
      answer: "taxi",
      options: ["taxi", "pasaporte", "avión"],
    },
  },
  intermediate: {
    "drag-order": {
      question: "Build: Where is the boarding gate?",
      correct: "Dónde está la puerta de embarque",
      words: ["puerta", "Dónde", "la", "está", "embarque", "de"],
    },
    "fill-blank": {
      question: "Choose the missing word",
      sentence: "Tengo una ____ para el hotel.",
      answer: "reservación",
      options: ["reservación", "maleta", "ventana"],
    },
  },
  advanced: {
    "drag-order": {
      question: "Build: I would like to change my hotel reservation",
      correct: "Me gustaría cambiar mi reservación del hotel",
      words: ["gustaría", "hotel", "cambiar", "del", "Me", "mi", "reservación"],
    },
    "fill-blank": {
      question: "Choose the missing word",
      sentence: "¿Podría indicarme dónde está el mostrador de ____?",
      answer: "información",
      options: ["información", "playa", "equipaje"],
    },
  },
};

/* ════════════════════════════════════
  ROLE PLAY DATA
════════════════════════════════════ */

const roleActivityBank = {
  beginner: {
    "guided-response": {
      prompt: "You arrive at the airport. Ask where the taxi is.",
      acceptable: ["taxi", "donde", "está", "where"],
    },
    "simple-request": {
      prompt: "You are at the hotel. Ask for your room key.",
      acceptable: ["llave", "key", "habitación", "room"],
    },
  },
  intermediate: {
    "travel-problem": {
      prompt: "Tell the hotel receptionist that you have a reservation.",
      acceptable: ["reservación", "reservation", "tengo", "hotel"],
    },
    "ask-directions": {
      prompt: "Ask how to get to the airport from your hotel.",
      acceptable: ["aeropuerto", "airport", "cómo", "get"],
    },
  },
  advanced: {
    "open-response": {
      prompt: "Explain that your luggage did not arrive and ask for help politely.",
      acceptable: ["equipaje", "maleta", "help", "ayuda", "no llegó", "arrive"],
    },
  },
};

/* ════════════════════════════════════
  MATCH MODULE
════════════════════════════════════ */

const MatchModule = (() => {
  const wordsRow = document.getElementById("words-row");
  const transRow = document.getElementById("trans-row");
  const matchBtn = document.getElementById("match-btn");
  const matchFb = document.getElementById("match-feedback");
  const matchScore = document.getElementById("match-score");
  const matchProg = document.getElementById("match-progress");
  const leftLabel = document.getElementById("left-row-label");
  const rightLabel = document.getElementById("right-row-label");
  const matchMeta = document.getElementById("match-meta");

  let selectedWord = null;
  let selectedTrans = null;
  let matchedCount = 0;
  let difficulty = resolveDifficulty(LessonConfig.difficulty);
  let variant = null;
  let currentSet = [];

  function getVariantLabels(v) {
    return (
      {
        "text-text": { left: "Words", right: "Translations" },
        "text-image": { left: "Words", right: "Pictures" },
        "text-audio": { left: "Words", right: "Audio" },
      }[v] || { left: "Left", right: "Right" }
    );
  }

  function pickVariant() {
    const variants = Object.keys(matchActivityBank[difficulty]);
    return variants[0];
  }

  function createCard(item, side) {
    const content = side === "left" ? item.left : item.right;
    const el = document.createElement("div");
    el.className = "match-card";
    el.dataset.id = item.id;
    el.dataset.type = side;
    el.innerHTML = renderContent(content);

    const playBtn = el.querySelector(".audio-play-btn");
    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playAudioText(playBtn.dataset.audioText);
      });
    }

    el.onclick = () => handleClick(el);
    return el;
  }

  function handleClick(el) {
    if (el.classList.contains("matched")) return;

    if (el.dataset.type === "left") {
      if (selectedWord) selectedWord.classList.remove("selected");
      selectedWord = el;
      el.classList.add("selected");
    } else {
      if (selectedTrans) selectedTrans.classList.remove("selected");
      selectedTrans = el;
      el.classList.add("selected");
    }

    matchBtn.disabled = !(selectedWord && selectedTrans);
  }

  function checkMatch() {
    if (!selectedWord || !selectedTrans) return;

    const isMatch = selectedWord.dataset.id === selectedTrans.dataset.id;

    if (isMatch) {
      selectedWord.classList.add("matched");
      selectedTrans.classList.add("matched");
      selectedWord.classList.remove("selected");
      selectedTrans.classList.remove("selected");
      selectedWord = null;
      selectedTrans = null;
      matchedCount++;

      matchProg.style.width = `${(matchedCount / currentSet.length) * 100}%`;
      matchScore.textContent = `⭐ ${matchedCount} / ${currentSet.length} pairs matched`;
      showFeedback(matchFb, "Great!", true);
      matchBtn.disabled = true;

      if (matchedCount === currentSet.length) {
        matchBtn.textContent = "Continue";
        matchBtn.disabled = false;
        matchBtn.onclick = () => goToNextStep(1);
      }
    } else {
      showFeedback(matchFb, "Try again", false);
      selectedWord.classList.add("wrong");
      selectedTrans.classList.add("wrong");

      setTimeout(() => {
        if (selectedWord) selectedWord.classList.remove("selected", "wrong");
        if (selectedTrans) selectedTrans.classList.remove("selected", "wrong");
        selectedWord = null;
        selectedTrans = null;
        matchBtn.disabled = true;
      }, 600);
    }
  }

  function render() {
    wordsRow.innerHTML = "";
    transRow.innerHTML = "";
    clearFeedback(matchFb);

    selectedWord = null;
    selectedTrans = null;
    matchedCount = 0;
    matchBtn.disabled = true;
    matchBtn.textContent = "Check Matches";
    matchBtn.onclick = checkMatch;
    matchProg.style.width = "0%";

    variant = pickVariant();
    currentSet = matchActivityBank[difficulty][variant];
    matchScore.textContent = `⭐ 0 / ${currentSet.length} pairs matched`;

    if (matchMeta) {
      matchMeta.textContent = `Mode: ${titleCaseVariant(variant)} • ${getLevelLabel(difficulty)}`;
    }

    const labels = getVariantLabels(variant);
    leftLabel.textContent = labels.left;
    rightLabel.textContent = labels.right;

    shuffle(currentSet).forEach((item) =>
      wordsRow.appendChild(createCard(item, "left"))
    );
    shuffle(currentSet).forEach((item) =>
      transRow.appendChild(createCard(item, "right"))
    );
  }

  return {
    init() {
      render();
    },
    setDifficulty(level) {
      difficulty = resolveDifficulty(level);
      render();
    },
  };
})();

/* ════════════════════════════════════
  READING MODULE
════════════════════════════════════ */

const ReadingModule = (() => {
  const passageText = document.getElementById("passage-text");
  const readBtn = document.getElementById("read-btn");
  const readFb = document.getElementById("read-feedback");
  const readProg = document.getElementById("read-progress");
  const readingMeta = document.getElementById("reading-meta");

  let difficulty = resolveDifficulty(LessonConfig.difficulty);
  let activitySet = null;
  let currentQ = 0;
  let selectedAns = null;

  function pickVariant() {
    return Object.keys(readingActivityBank[difficulty])[0];
  }

  function renderQuestion(idx) {
    const q = activitySet.questions[idx];
    document.getElementById("q-num").textContent = idx + 1;
    document.getElementById("q-total").textContent = activitySet.questions.length;
    document.getElementById("question-text").textContent = q.q;

    const grid = document.getElementById("answer-grid");
    grid.innerHTML = "";
    selectedAns = null;
    readBtn.disabled = true;
    clearFeedback(readFb);

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.textContent = opt;
      btn.onclick = () => {
        document
          .querySelectorAll(".answer-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedAns = i;
        readBtn.disabled = false;
      };
      grid.appendChild(btn);
    });
  }

  readBtn.onclick = () => {
    const correct = selectedAns === activitySet.questions[currentQ].answer;
    showFeedback(readFb, correct ? "Correct!" : "Try again", correct);

    const selectedBtn = document.querySelector(".answer-btn.selected");

    if (correct) {
      if (selectedBtn) selectedBtn.classList.add("correct");
      currentQ++;
      readProg.style.width = `${(currentQ / activitySet.questions.length) * 100}%`;

      setTimeout(() => {
        if (currentQ < activitySet.questions.length) {
          renderQuestion(currentQ);
        } else {
          goToNextStep(2);
        }
      }, 600);
    } else {
      if (selectedBtn) selectedBtn.classList.add("incorrect");
    }
  };

  function render() {
    const variant = pickVariant();
    activitySet = readingActivityBank[difficulty][variant];
    currentQ = 0;
    selectedAns = null;
    readProg.style.width = "0%";
    passageText.textContent = activitySet.passage;

    if (readingMeta) {
      readingMeta.textContent = `Mode: ${titleCaseVariant(variant)} • ${getLevelLabel(difficulty)}`;
    }

    renderQuestion(0);
  }

  return {
    init() {
      render();
    },
    setDifficulty(level) {
      difficulty = resolveDifficulty(level);
      render();
    },
  };
})();

/* ════════════════════════════════════
  SENTENCE MODULE
════════════════════════════════════ */

const SentenceModule = (() => {
  const sentenceQuestion = document.getElementById("sentence-question");
  const sentenceWords = document.getElementById("sentence-words");
  const sentenceDrop = document.getElementById("sentence-drop");
  const sentenceFeedback = document.getElementById("sentence-feedback");
  const sentenceBtn = document.getElementById("sentence-btn");
  const sentenceProgress = document.getElementById("sentence-progress");
  const sentenceBuilderArea = document.getElementById("sentence-builder-area");
  const sentenceFillArea = document.getElementById("sentence-fill-area");
  const fillSentenceText = document.getElementById("fill-sentence-text");
  const fillOptions = document.getElementById("fill-options");
  const sentenceMeta = document.getElementById("sentence-meta");

  let difficulty = resolveDifficulty(LessonConfig.difficulty);
  let variant = null;
  let activitySet = null;
  let selectedFillAns = null;

  function pickVariant() {
    return Object.keys(sentenceActivityBank[difficulty])[0];
  }

  function updateProgress() {
    if (variant === "drag-order") {
      const pct =
        (sentenceDrop.children.length / activitySet.words.length) * 100;
      sentenceProgress.style.width = `${pct}%`;
    } else {
      sentenceProgress.style.width = selectedFillAns ? "70%" : "0%";
    }
  }

  sentenceBtn.onclick = () => {
    if (variant === "drag-order") {
      const built = [...sentenceDrop.children]
        .map((el) => el.textContent)
        .join(" ");

      if (built === activitySet.correct) {
        showFeedback(sentenceFeedback, "Perfect!", true);
        sentenceProgress.style.width = "100%";
        setTimeout(() => goToNextStep(3), 800);
      } else {
        showFeedback(sentenceFeedback, "Try again", false);
        sentenceDrop.classList.add("wrong");
        setTimeout(() => sentenceDrop.classList.remove("wrong"), 600);
      }
    } else {
      if (selectedFillAns === activitySet.answer) {
        showFeedback(sentenceFeedback, "Perfect!", true);
        sentenceProgress.style.width = "100%";
        setTimeout(() => goToNextStep(3), 800);
      } else {
        showFeedback(sentenceFeedback, "Try again", false);
        const selectedBtn = document.querySelector(
          "#fill-options .answer-btn.selected"
        );
        if (selectedBtn) {
          selectedBtn.classList.add("incorrect");
          setTimeout(() => selectedBtn.classList.remove("incorrect"), 600);
        }
      }
    }
  };

  function render() {
    variant = pickVariant();
    activitySet = sentenceActivityBank[difficulty][variant];
    selectedFillAns = null;

    clearFeedback(sentenceFeedback);
    sentenceProgress.style.width = "0%";
    sentenceQuestion.textContent = activitySet.question;

    if (sentenceMeta) {
      sentenceMeta.textContent = `Mode: ${titleCaseVariant(variant)} • ${getLevelLabel(difficulty)}`;
    }

    if (variant === "drag-order") {
      sentenceBuilderArea.style.display = "block";
      sentenceFillArea.style.display = "none";
      sentenceBtn.textContent = "Check Sentence";

      sentenceWords.innerHTML = "";
      sentenceDrop.innerHTML = "";

      shuffle(activitySet.words).forEach((word) => {
        const el = document.createElement("button");
        el.className = "sentence-word";
        el.type = "button";
        el.textContent = word;
        el.addEventListener("click", () => {
          if (el.parentElement === sentenceWords) {
            sentenceDrop.appendChild(el);
            el.classList.add("used");
          } else {
            sentenceWords.appendChild(el);
            el.classList.remove("used");
          }
          updateProgress();
        });
        sentenceWords.appendChild(el);
      });
    } else {
      sentenceBuilderArea.style.display = "none";
      sentenceFillArea.style.display = "block";
      sentenceBtn.textContent = "Check Answer";

      fillSentenceText.textContent = activitySet.sentence;
      fillOptions.innerHTML = "";

      activitySet.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.type = "button";
        btn.textContent = opt;
        btn.onclick = () => {
          document
            .querySelectorAll("#fill-options .answer-btn")
            .forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          selectedFillAns = opt;
          updateProgress();
        };
        fillOptions.appendChild(btn);
      });
    }
  }

  return {
    init() {
      render();
    },
    setDifficulty(level) {
      difficulty = resolveDifficulty(level);
      render();
    },
  };
})();

/* ════════════════════════════════════
  ROLE PLAY MODULE
════════════════════════════════════ */

const RoleModule = (() => {
  const roleText = document.getElementById("role-text");
  const roleInput = document.getElementById("role-input");
  const roleFeedback = document.getElementById("role-feedback");
  const roleBtn = document.getElementById("role-btn");
  const roleMeta = document.getElementById("role-meta");
  const roleProgress = document.getElementById("role-progress");

  let difficulty = resolveDifficulty(LessonConfig.difficulty);
  let activitySet = null;

  roleBtn.onclick = () => {
    const user = roleInput.value.toLowerCase().trim();
    const accepted = activitySet.acceptable.some((word) =>
      user.includes(word.toLowerCase())
    );

    if (accepted) {
      showFeedback(roleFeedback, "Great response!", true);
      if (roleProgress) roleProgress.style.width = "100%";
      setTimeout(() => goToNextStep(4), 800);
    } else {
      showFeedback(roleFeedback, "Try again", false);
    }
  };

  function render() {
    const variant = Object.keys(roleActivityBank[difficulty])[0];
    activitySet = roleActivityBank[difficulty][variant];
    roleText.textContent = activitySet.prompt;
    roleInput.value = "";
    clearFeedback(roleFeedback);

    if (roleProgress) roleProgress.style.width = "0%";
    if (roleMeta) {
      roleMeta.textContent = `Mode: ${titleCaseVariant(variant)} • ${getLevelLabel(difficulty)}`;
    }
  }

  return {
    init() {
      render();
    },
    setDifficulty(level) {
      difficulty = resolveDifficulty(level);
      render();
    },
  };
})();

/* ════════════════════════════════════
  SPEECH MODULE
════════════════════════════════════ */

const SpeechModule = (() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  function init() {
    const btn = document.getElementById("start-record");
    const result = document.getElementById("speech-result");
    const micStatus = document.getElementById("mic-status");
    const skipBtn = document.getElementById("skip-speech");
    const speechProgress = document.getElementById("speech-progress");
    const speechMeta = document.getElementById("speech-meta");

    if (!btn || !result || !micStatus || !skipBtn) return;

    if (speechMeta) {
      speechMeta.textContent = "Final speaking practice before the checkpoint.";
    }

    if (speechProgress) {
      speechProgress.style.width = "0%";
    }

    if (!SpeechRecognition) {
      btn.onclick = () => {
        showFeedback(
          result,
          "Speech recognition is not supported in this browser. Moving forward.",
          false
        );
        if (speechProgress) speechProgress.style.width = "100%";
        setTimeout(() => {
          goToNextStep(5);
        }, 1000);
      };

      skipBtn.onclick = () => {
        if (speechProgress) speechProgress.style.width = "100%";
        goToNextStep(5);
      };

      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    let isListening = false;

    function updateMicStatus(active) {
      isListening = active;

      const labelEl = micStatus.querySelector(".mic-label");

      if (active) {
        micStatus.classList.add("active");
        if (labelEl) labelEl.textContent = "Microphone: On";
        btn.textContent = "Stop Speaking";
      } else {
        micStatus.classList.remove("active");
        if (labelEl) labelEl.textContent = "Microphone: Off";
        btn.textContent = "Start Speaking";
      }
    }

    btn.onclick = () => {
      if (!isListening) {
        recognition.start();
        updateMicStatus(true);
        result.textContent = "Listening...";
        result.className = "feedback show";
      } else {
        recognition.stop();
        updateMicStatus(false);
      }
    };

    skipBtn.onclick = () => {
      recognition.stop();
      updateMicStatus(false);
      showFeedback(result, "Activity skipped. Moving forward...", true);
      if (speechProgress) speechProgress.style.width = "100%";
      setTimeout(() => {
        goToNextStep(5);
      }, 800);
    };

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase();

      if (spoken.includes("taxi")) {
        showFeedback(result, "Great pronunciation! Moving forward...", true);
        if (speechProgress) speechProgress.style.width = "100%";
        setTimeout(() => {
          goToNextStep(5);
        }, 1000);
      } else {
        showFeedback(result, "Try again before moving on.", false);
      }

      updateMicStatus(false);
    };

    recognition.onerror = () => {
      updateMicStatus(false);
      showFeedback(
        result,
        "Could not hear you clearly. Try again or skip.",
        false
      );
    };

    recognition.onend = () => {
      updateMicStatus(false);
    };
  }

  return { init };
})();

/* ════════════════════════════════════
  BOOT
════════════════════════════════════ */

(function boot() {
  const level = resolveDifficulty(LessonConfig.difficulty);
  syncLevelBadges(level);

  MatchModule.init();
  ReadingModule.init();
  SentenceModule.init();
  RoleModule.init();
  SpeechModule.init();
})();

/* ════════════════════════════════════
  PUBLIC API FOR BACKEND INTEGRATION
════════════════════════════════════ */

window.Fluentia = {
  setDifficulty(level) {
    const resolved = resolveDifficulty(level);
    syncLevelBadges(resolved);
    MatchModule.setDifficulty(resolved);
    ReadingModule.setDifficulty(resolved);
    SentenceModule.setDifficulty(resolved);
    RoleModule.setDifficulty(resolved);
  },

  goToScreen(screenNumber) {
    const screens = ["screen-1", "screen-2", "screen-3", "screen-4", "screen-5"];

    screens.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("screen-active");
        el.style.display = "none";
      }
    });

    const target = document.getElementById(`screen-${screenNumber}`);
    if (target) {
      target.style.display = "block";
      requestAnimationFrame(() => target.classList.add("screen-active"));
    }
  },

  completeLesson() {
    goToCheckpoint();
  },

  getLessonFlow() {
    return {
      checkpointUrl: LessonFlowConfig.checkpointUrl || "module_assessment.html",
      lessonOrder: getLessonOrder(),
    };
  },
};