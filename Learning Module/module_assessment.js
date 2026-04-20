const questions = [
  {
    id: 1,
    type: "mc",
    text: "What does 'Aeropuerto' mean?",
    options: ["Airport", "Hotel", "Taxi", "Passport"],
    correct: 0,
  },
  {
    id: 2,
    type: "tf",
    text: "'Pasaporte' means passport",
    correct: true,
  },
  {
    id: 3,
    type: "mc",
    text: "Choose the correct sentence",
    options: [
      "Yo necesito taxi",
      "Necesito un taxi",
      "Yo taxi necesito",
      "Taxi necesito yo",
    ],
    correct: 1,
  },
  {
    id: 4,
    type: "reading",
    passage:
      "María llega al aeropuerto y toma un taxi al hotel.",
    text: "Where does María go after the airport?",
    options: ["Home", "Hotel", "School", "Restaurant"],
    correct: 1,
  },
  {
    id: 5,
    type: "tf",
    text: "'Hotel' in Spanish means hotel",
    correct: true,
  },
  {
    id: 6,
    type: "mc",
    text: "What is 'Maleta'?",
    options: ["Suitcase", "Plane", "Ticket", "Room"],
    correct: 0,
  },
];

let current = 0;
let score = 0;
let xpEarned = 0;

function startAssessment() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("question-screen").style.display = "block";
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  let html = `<h2>${q.text}</h2>`;

  if (q.type === "reading") {
    html += `<div class="reading-box">${q.passage}</div>`;
  }

  if (q.type === "mc" || q.type === "reading") {
    html += `<div class="options">`;
    q.options.forEach((opt, i) => {
      html += `<button onclick="selectAnswer(${i})">${opt}</button>`;
    });
    html += `</div>`;
  }

  if (q.type === "tf") {
    html += `
      <button onclick="selectTF(true)">True</button>
      <button onclick="selectTF(false)">False</button>
    `;
  }

  document.getElementById("q-mount").innerHTML = html;
}

function selectAnswer(i) {
  const q = questions[current];
  if (i === q.correct) {
    score++;
    xpEarned += 10;
  }
  nextQuestion();
}

function selectTF(val) {
  const q = questions[current];
  if (val === q.correct) {
    score++;
    xpEarned += 10;
  }
  nextQuestion();
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("results-screen").style.display = "block";

  let bonus = 0;
  if (score >= 5) bonus = 20;
  else if (score >= 3) bonus = 10;

  xpEarned += bonus;

  let totalXP = parseInt(localStorage.getItem("xp")) || 0;
  totalXP += xpEarned;
  localStorage.setItem("xp", totalXP);

  let level = Math.floor(totalXP / 100) + 1;

  document.getElementById("results-mount").innerHTML = `
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <p>XP Earned: ${xpEarned}</p>
    <p>Total XP: ${totalXP}</p>
    <p>Level: ${level}</p>
    <button onclick="goBack()">Return to Lesson</button>
  `;
}

function goBack() {
  window.location.href = "module.html";
}