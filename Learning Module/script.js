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

function goToScreen(current, next) {
  const currentScreen = document.getElementById(current);
  const nextScreen = document.getElementById(next);

  currentScreen.classList.remove("screen-active");
  currentScreen.style.display = "none";

  nextScreen.style.display = "flex";

  requestAnimationFrame(() => {
    nextScreen.classList.add("screen-active");
  });
}

/* ════════════════════════════════════
MIX & MATCH DATA
════════════════════════════════════ */

const matchData = [
  { word: "Airport", trans: "Aeropuerto" },
  { word: "Passport", trans: "Pasaporte" },
  { word: "Suitcase", trans: "Maleta" },
  { word: "Hotel", trans: "Hotel" },
  { word: "Ticket", trans: "Billete" },
];

/* ════════════════════════════════════
READING DATA
════════════════════════════════════ */

const passage = `María is planning her first trip abroad. She packs her suitcase carefully — clothes for warm weather, her camera, and her passport. At the airport, she checks in at the counter and gets her boarding pass. The flight takes off on time. When she arrives, she takes a taxi to her hotel. The receptionist greets her warmly and hands over the room key. María smiles: the adventure has finally begun.`;

const questions = [
  {
    q: "What does María remember to pack?",
    options: ["Her laptop", "Her passport", "Her bicycle"],
    answer: 1,
  },
  {
    q: "Where does María get her boarding pass?",
    options: ["Hotel", "Plane", "Check in counter"],
    answer: 2,
  },
  {
    q: "How does María feel?",
    options: ["Nervous", "Excited", "Angry"],
    answer: 1,
  },
];

/* ════════════════════════════════════
MIX MATCH LOGIC
════════════════════════════════════ */

const wordsRow = document.getElementById("words-row");
const transRow = document.getElementById("trans-row");
const matchBtn = document.getElementById("match-btn");
const matchFb = document.getElementById("match-feedback");
const matchScore = document.getElementById("match-score");
const matchProg = document.getElementById("match-progress");

let selectedWord = null;
let selectedTrans = null;
let matchedCount = 0;

const shuffledWords = shuffle(matchData);
const shuffledTrans = shuffle(matchData);

shuffledWords.forEach(({ word }) => {
  const el = document.createElement("div");
  el.className = "match-card";
  el.textContent = word;
  el.dataset.word = word;
  el.dataset.type = "word";
  el.onclick = () => handleCardClick(el);
  wordsRow.appendChild(el);
});

shuffledTrans.forEach(({ trans, word }) => {
  const el = document.createElement("div");
  el.className = "match-card";
  el.textContent = trans;
  el.dataset.word = word;
  el.dataset.type = "trans";
  el.onclick = () => handleCardClick(el);
  transRow.appendChild(el);
});

function handleCardClick(el) {
  if (el.classList.contains("matched")) return;

  if (el.dataset.type === "word") {
    if (selectedWord) selectedWord.classList.remove("selected");
    selectedWord = el;
    el.classList.add("selected");
  } else {
    if (selectedTrans) selectedTrans.classList.remove("selected");
    selectedTrans = el;
    el.classList.add("selected");
  }

  if (selectedWord && selectedTrans) {
    matchBtn.disabled = false;
  }
}

matchBtn.onclick = () => {
  if (!selectedWord || !selectedTrans) return;

  const isMatch = selectedWord.dataset.word === selectedTrans.dataset.word;

  if (isMatch) {
    selectedWord.classList.add("matched");
    selectedTrans.classList.add("matched");
    selectedWord.classList.remove("selected");
    selectedTrans.classList.remove("selected");

    selectedWord = null;
    selectedTrans = null;
    matchedCount++;

    matchProg.style.width = (matchedCount / matchData.length) * 100 + "%";
    matchScore.textContent = `⭐ ${matchedCount} / ${matchData.length} pairs matched`;
    showFeedback(matchFb, "Great!", true);
    matchBtn.disabled = true;

    if (matchedCount === matchData.length) {
      matchBtn.textContent = "Continue";
      matchBtn.disabled = false;
      matchBtn.onclick = () => goToScreen("screen-1", "screen-2");
    }
  } else {
    showFeedback(matchFb, "Try again", false);
    selectedWord.classList.remove("selected");
    selectedTrans.classList.remove("selected");
    selectedWord = null;
    selectedTrans = null;
    matchBtn.disabled = true;
  }
};

/* ════════════════════════════════════
READING LOGIC
════════════════════════════════════ */

document.getElementById("passage-text").textContent = passage;

const readBtn = document.getElementById("read-btn");
const readFb = document.getElementById("read-feedback");
const readProg = document.getElementById("read-progress");

let currentQ = 0;
let selectedAns = null;

function renderQuestion(idx) {
  const q = questions[idx];

  document.getElementById("q-num").textContent = idx + 1;
  document.getElementById("q-total").textContent = questions.length;
  document.getElementById("question-text").textContent = q.q;

  const grid = document.getElementById("answer-grid");
  grid.innerHTML = "";
  selectedAns = null;
  readBtn.disabled = true;

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
  const correct = selectedAns === questions[currentQ].answer;
  showFeedback(readFb, correct ? "Correct!" : "Try again", correct);

  if (correct) {
    currentQ++;
    readProg.style.width = (currentQ / questions.length) * 100 + "%";

    setTimeout(() => {
      if (currentQ < questions.length) {
        renderQuestion(currentQ);
      } else {
        goToScreen("screen-2", "screen-3");
      }
    }, 600);
  }
};

renderQuestion(0);

/* ════════════════════════════════════
SENTENCE BUILDER
════════════════════════════════════ */

const sentenceData = {
  question: "Build: I need a taxi to the hotel",
  correct: "Necesito un taxi al hotel",
  words: ["Necesito", "hotel", "un", "taxi", "al"],
};

document.getElementById("sentence-question").textContent =
  sentenceData.question;

const sentenceWords = document.getElementById("sentence-words");
const sentenceDrop = document.getElementById("sentence-drop");
const sentenceFeedback = document.getElementById("sentence-feedback");
const sentenceBtn = document.getElementById("sentence-btn");
const sentenceProgress = document.getElementById("sentence-progress");

sentenceWords.innerHTML = "";
sentenceDrop.innerHTML = "";
sentenceProgress.style.width = "0%";

shuffle(sentenceData.words).forEach((word) => {
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

    updateSentenceProgress();
  });

  sentenceWords.appendChild(el);
});

function updateSentenceProgress() {
  const total = sentenceData.words.length;
  const used = sentenceDrop.children.length;
  sentenceProgress.style.width = `${(used / total) * 100}%`;
}

sentenceBtn.onclick = () => {
  const built = [...sentenceDrop.children].map((el) => el.textContent).join(" ");

  if (built === sentenceData.correct) {
    showFeedback(sentenceFeedback, "Perfect!", true);
    sentenceProgress.style.width = "100%";

    setTimeout(() => {
      goToScreen("screen-3", "screen-4");
    }, 800);
  } else {
    showFeedback(sentenceFeedback, "Try again", false);
  }
};

/* ════════════════════════════════════
ROLE PLAY
════════════════════════════════════ */

document.getElementById("role-text").textContent =
  "You arrive at the airport. Ask where the taxi is.";

document.getElementById("role-btn").onclick = () => {
  const user = document.getElementById("role-input").value.toLowerCase().trim();

  if (user.includes("taxi") || user.includes("donde")) {
    showFeedback(
      document.getElementById("role-feedback"),
      "Great response!",
      true
    );

    setTimeout(() => {
      goToScreen("screen-4", "screen-5");
    }, 800);
  } else {
    showFeedback(document.getElementById("role-feedback"), "Try again", false);
  }
};

/* ════════════════════════════════════
SPEECH RECOGNITION
════════════════════════════════════ */

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "es-ES";

  document.getElementById("start-record").onclick = () => {
    recognition.start();
    document.getElementById("speech-result").textContent = "Listening...";
    document.getElementById("speech-result").className = "feedback show";
  };

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase();

    if (spoken.includes("taxi")) {
      showFeedback(
        document.getElementById("speech-result"),
        "Great pronunciation!",
        true
      );
    } else {
      showFeedback(document.getElementById("speech-result"), "Try again", false);
    }
  };
} else {
  document.getElementById("start-record").onclick = () => {
    showFeedback(
      document.getElementById("speech-result"),
      "Speech recognition is not supported in this browser.",
      false
    );
  };
}