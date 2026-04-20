const questions = [
  {
    id: 1,
    type: "mc",
    level: "beginner",
    text: "Choose the correct translation for 'Good morning'",
    options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"],
    correct: 1,
  },
  {
    id: 2,
    type: "tf",
    level: "beginner",
    text: "'Gracias' means 'Thank you'",
    correct: true,
  },
  {
    id: 3,
    type: "mc",
    level: "beginner",
    text: "Choose the correct translation: 'I am a student'",
    options: [
      "Soy estudiante",
      "Estoy estudiante",
      "Yo es estudiante",
      "Me estudiante",
    ],
    correct: 0,
  },
  {
    id: 4,
    type: "match",
    level: "beginner",
    text: "Match the Spanish word with the English meaning",
    pairs: [
      { left: "Casa", right: "House" },
      { left: "Agua", right: "Water" },
      { left: "Libro", right: "Book" },
    ],
  },
  {
    id: 5,
    type: "tf",
    level: "beginner",
    text: "'Perro' means 'Dog'",
    correct: true,
  },
  {
    id: 6,
    type: "mc",
    level: "beginner",
    text: "Choose the correct article:",
    options: ["El mesa", "La mesa", "Los mesa", "Las mesa"],
    correct: 1,
  },
  {
    id: 7,
    type: "mc",
    level: "intermediate",
    text: "Choose the correct sentence",
    options: [
      "Yo gusta comer",
      "Me gusta comer",
      "Yo gusto comer",
      "Yo gustar comer",
    ],
    correct: 1,
  },
  {
    id: 8,
    type: "tf",
    level: "intermediate",
    text: "Spanish adjectives usually come after nouns",
    correct: true,
  },
  {
    id: 9,
    type: "reading",
    level: "intermediate",
    passage:
      "María vive en Madrid. Ella trabaja en un hospital y le gusta leer libros en su tiempo libre.",
    text: "Where does María work?",
    options: ["In a school", "In a hospital", "In a store", "In a bank"],
    correct: 1,
  },
  {
    id: 10,
    type: "mc",
    level: "intermediate",
    text: "Choose the correct past tense",
    options: [
      "Ayer yo fui al mercado",
      "Ayer yo voy al mercado",
      "Ayer yo ir al mercado",
      "Ayer yo iba mañana",
    ],
    correct: 0,
  },
  {
    id: 11,
    type: "match",
    level: "intermediate",
    text: "Match verbs to their meanings",
    pairs: [
      { left: "Comer", right: "To eat" },
      { left: "Beber", right: "To drink" },
      { left: "Vivir", right: "To live" },
    ],
  },
  {
    id: 12,
    type: "tf",
    level: "intermediate",
    text: "'Estoy' is used for temporary conditions",
    correct: true,
  },
  {
    id: 13,
    type: "reading",
    level: "intermediate",
    passage:
      "Juan tiene 20 años. Él estudia en la universidad y juega fútbol los fines de semana.",
    text: "What does Juan do on weekends?",
    options: ["He studies", "He plays soccer", "He works", "He travels"],
    correct: 1,
  },
  {
    id: 14,
    type: "mc",
    level: "advanced",
    text: "Choose the correct future tense",
    options: [
      "Mañana iré al trabajo",
      "Mañana fui al trabajo",
      "Mañana voy ayer",
      "Mañana iba trabajo",
    ],
    correct: 0,
  },
  {
    id: 15,
    type: "tf",
    level: "advanced",
    text: "Subjunctive mood expresses doubt or uncertainty",
    correct: true,
  },
  {
    id: 16,
    type: "reading",
    level: "advanced",
    passage:
      "Aunque estaba cansado, Carlos decidió terminar su tarea antes de salir con sus amigos.",
    text: "Why did Carlos stay?",
    options: [
      "He was bored",
      "He wanted to finish homework",
      "He was hungry",
      "He was late",
    ],
    correct: 1,
  },
  {
    id: 17,
    type: "match",
    level: "advanced",
    text: "Match phrases",
    pairs: [
      { left: "Tengo hambre", right: "I am hungry" },
      { left: "Tengo sueño", right: "I am sleepy" },
      { left: "Tengo prisa", right: "I am in a hurry" },
    ],
  },
  {
    id: 18,
    type: "mc",
    level: "advanced",
    text: "Choose correct subjunctive",
    options: [
      "Espero que vengas",
      "Espero que vienes",
      "Espero que viniste",
      "Espero que vendrás",
    ],
    correct: 0,
  },
  {
    id: 19,
    type: "reading",
    level: "advanced",
    passage:
      "El viaje fue largo, pero valió la pena porque aprendimos mucho sobre la cultura local.",
    text: "Why was the trip worth it?",
    options: [
      "It was short",
      "They learned about culture",
      "They stayed home",
      "They met friends",
    ],
    correct: 1,
  },
  {
    id: 20,
    type: "tf",
    level: "advanced",
    text: "'Ser' and 'Estar' both mean 'to be'",
    correct: true,
  },
  {
    id: 21,
    type: "mc",
    level: "advanced",
    text: "Choose correct sentence",
    options: [
      "Si tuviera dinero, viajaría",
      "Si tengo dinero, viajaría",
      "Si tuve dinero, viajaría",
      "Si tendría dinero, viajaría",
    ],
    correct: 0,
  },
  {
    id: 22,
    type: "sa",
    level: "advanced",
    text: "Write 2–3 sentences describing your daily routine in Spanish",
  },
];

const answers = {};
let current = 0;
const LETTERS = ["A", "B", "C", "D"];

function startAssessment() {
  document.getElementById("intro").style.display = "grid";
  document.getElementById("intro").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
  buildPips();
  renderQuestion();
}

function buildPips() {
  const row = document.getElementById("pip-row");
  row.innerHTML = questions
    .map((_, i) => `<div class="step-pip" id="pip-${i}"></div>`)
    .join("");
}

function updatePips() {
  questions.forEach((_, i) => {
    const pip = document.getElementById(`pip-${i}`);
    pip.className =
      "step-pip" + (i < current ? " done" : i === current ? " active" : "");
  });

  document.getElementById("progress-text").textContent =
    `${current + 1} / ${questions.length}`;

  const fill = ((current + 1) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = `${fill}%`;
}

function renderQuestion() {
  updatePips();

  const q = questions[current];
  let answersHTML = "";

  if (q.type === "reading") {
    answersHTML = `
      <div class="reading-box">
        <p class="reading-text">${q.passage}</p>
      </div>

      <div class="options-grid">
        ${q.options
          .map(
            (o, i) => `
              <button class="option-card${answers[q.id] === i ? " selected" : ""}"
                onclick="selectMC(${q.id}, ${i})">
                <span class="option-letter">${LETTERS[i]}</span>
                <span class="option-text">${o}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `;
  } else if (q.type === "match") {
    answersHTML = `
      <div class="match-grid">
        ${q.pairs
          .map(
            (p) => `
              <div class="match-row">
                <span>${p.left}</span>
                <span>—</span>
                <span>${p.right}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
    answers[q.id] = true;
  } else if (q.type === "mc") {
    answersHTML = `
      <div class="options-grid">
        ${q.options
          .map(
            (o, i) => `
              <button class="option-card${answers[q.id] === i ? " selected" : ""}"
                onclick="selectMC(${q.id}, ${i})">
                <span class="option-letter">${LETTERS[i]}</span>
                <span class="option-text">${o}</span>
              </button>
            `
          )
          .join("")}
      </div>
    `;
  } else if (q.type === "tf") {
    const sel = answers[q.id];
    answersHTML = `
      <div class="tf-grid">
        <button class="tf-card true-card${sel === true ? " selected" : ""}" onclick="selectTF(${q.id}, true)">
          True
          <span class="tf-sub">Select if correct</span>
        </button>
        <button class="tf-card false-card${sel === false ? " selected" : ""}" onclick="selectTF(${q.id}, false)">
          False
          <span class="tf-sub">Select if incorrect</span>
        </button>
      </div>
    `;
  } else {
    answersHTML = `
      <div class="sa-wrapper">
        <textarea
          class="sa-area"
          id="sa-input"
          placeholder="Write your answer here…"
          oninput="saveText(${q.id}, this.value)"
        >${answers[q.id] || ""}</textarea>
        <p class="sa-hint">Minimum 10 characters to continue</p>
      </div>
    `;
  }

  const typeLabel = {
    mc: "Multiple Choice",
    tf: "True / False",
    sa: "Short Answer",
    reading: "Reading",
    match: "Matching",
  };

  const hasAnswer =
    q.type === "sa"
      ? (answers[q.id] || "").trim().length > 9
      : answers[q.id] !== undefined;

  const isLast = current === questions.length - 1;

  document.getElementById("q-mount").innerHTML = `
    <div class="assessment-question-card">
      <div class="q-header">
        <div class="q-index">${String(current + 1).padStart(2, "0")}</div>
        <span class="q-type-pill ${q.type}">${typeLabel[q.type]}</span>
      </div>

      <p class="q-text">${q.text}</p>

      ${answersHTML}

      <div class="nav-row">
        <button class="btn-back" onclick="goBack()" style="${current === 0 ? "visibility:hidden;" : ""}">
          Back
        </button>

        <button class="btn-next" id="btn-next" onclick="goNext()" ${!hasAnswer ? "disabled" : ""}>
          ${isLast ? "Submit & See Results" : "Next Question"}
        </button>
      </div>
    </div>
  `;

  if (q.type === "sa") {
    document.getElementById("sa-input").addEventListener("input", function () {
      document.getElementById("btn-next").disabled =
        this.value.trim().length < 10;
    });
  }
}

function selectMC(id, i) {
  answers[id] = i;
  renderQuestion();
}

function selectTF(id, value) {
  answers[id] = value;
  renderQuestion();
}

function saveText(id, value) {
  answers[id] = value;
}

function goBack() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function goNext() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("results-screen").style.display = "block";

  let score = 0;
  let scored = 0;
  const feedbacks = [];

  questions.forEach((q) => {
    if (q.type === "mc" || q.type === "reading") {
      scored++;
      const ok = answers[q.id] === q.correct;
      if (ok) score++;

      feedbacks.push({
        q: q.text,
        type: ok ? "correct" : "incorrect",
        note: ok
          ? "Correct answer selected."
          : `Correct: "${q.options[q.correct]}"`,
      });
    } else if (q.type === "tf") {
      scored++;
      const ok = answers[q.id] === q.correct;
      if (ok) score++;

      feedbacks.push({
        q: q.text,
        type: ok ? "correct" : "incorrect",
        note: ok
          ? "Correct."
          : `The correct answer was ${q.correct ? "True" : "False"}.`,
      });
    } else {
      feedbacks.push({
        q: q.text,
        type: "neutral",
        note: `Your response: "${(answers[q.id] || "")
          .trim()
          .substring(0, 160)}${(answers[q.id] || "").length > 160 ? "…" : ""}"`,
      });
    }
  });

  const pct = scored === 0 ? 0 : Math.round((score / scored) * 100);

  let level;
  let levelClass;
  let advice;

  if (pct >= 80) {
    level = "Advanced";
    levelClass = "level-adv";
    advice =
      "Strong performance across the objective questions. Review your open-ended responses to tighten your explanations and push toward mastery.";
  } else if (pct >= 60) {
    level = "Intermediate";
    levelClass = "level-int";
    advice =
      "You have a solid base. Revisit the questions you missed and focus on the patterns behind them to move into advanced content.";
  } else {
    level = "Foundational";
    levelClass = "level-fnd";
    advice =
      "Focus on the fundamentals first. The missed questions point to the exact concepts you should review before moving on.";
  }

  const icons = {
    correct: "✓",
    incorrect: "✗",
    neutral: "•",
  };

  const feedbackHTML = feedbacks
    .map(
      (f) => `
        <div class="fb-item">
          <div class="fb-icon ${f.type}">${icons[f.type]}</div>
          <div>
            <div class="fb-answer-tag ${f.type}">
              ${
                f.type === "correct"
                  ? "Correct"
                  : f.type === "incorrect"
                  ? "Incorrect"
                  : "Open Answer"
              }
            </div>
            <p class="fb-q">${f.q}</p>
            <p class="fb-note">${f.note}</p>
          </div>
        </div>
      `
    )
    .join("");

  document.getElementById("results-mount").innerHTML = `
    <div class="results-hero">
      <div class="results-card-main">
        <div class="results-tag">Assessment Complete</div>
        <h2 class="results-title">Your Results</h2>
        <p class="results-subtitle">
          You answered ${score} of ${scored} objective questions correctly.
          Review the detailed breakdown below to see what to study next.
        </p>
      </div>

      <div class="score-box">
        <div class="score-pct">${pct}%</div>
        <div class="score-label">${score} / ${scored} Correct</div>
        <div class="level-badge ${levelClass}">${level}</div>
      </div>
    </div>

    <div class="feedback-section">
      <div class="feedback-heading">Question Breakdown</div>
      <div class="feedback-list">
        ${feedbackHTML}
      </div>
    </div>

    <div class="next-steps">
      <h3>Recommended Next Steps</h3>
      <p>${advice}</p>
    </div>

    <button class="btn-restart" onclick="restartAssessment()">
      Retake Assessment
    </button>
  `;
}

function restartAssessment() {
  Object.keys(answers).forEach((key) => delete answers[key]);
  current = 0;

  document.getElementById("results-screen").style.display = "none";
  document.getElementById("intro").style.display = "grid";
  document.getElementById("q-mount").innerHTML = "";
}
