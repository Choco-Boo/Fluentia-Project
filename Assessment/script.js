const questions = [
        {
          id: 1,
          type: "mc",
          text: "Which of the following best describes version control?",
          options: [
            "A tool for tracking and managing changes to code over time",
            "A method for compressing files",
            "A technique for speeding up databases",
            "A type of software testing framework",
          ],
          correct: 0,
        },
        {
          id: 2,
          type: "tf",
          text: "Agile development prioritises working software over comprehensive documentation.",
          correct: true,
        },
        {
          id: 3,
          type: "mc",
          text: 'What does "DRY" stand for in software development?',
          options: [
            "Don't Repeat Yourself",
            "Dynamic Runtime Yield",
            "Dependency Resolution Yardstick",
            "Distributed Runtime Yarn",
          ],
          correct: 0,
        },
        {
          id: 4,
          type: "sa",
          text: "Briefly describe what a REST API is and one use case for it.",
        },
        {
          id: 5,
          type: "tf",
          text: "A SQL JOIN operation can only be used to combine exactly two tables.",
          correct: false,
        },
        {
          id: 6,
          type: "mc",
          text: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
          options: ["Queue", "Linked List", "Stack", "Binary Tree"],
          correct: 2,
        },
        {
          id: 7,
          type: "sa",
          text: 'Explain "separation of concerns" in software design and why it matters.',
        },
      ];

      const answers = {};
      let current = 0;

      function startAssessment() {
        document.getElementById("intro").style.display = "none";
        const qs = document.getElementById("question-screen");
        qs.style.display = "block";
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
          const pip = document.getElementById("pip-" + i);
          pip.className =
            "step-pip" +
            (i < current ? " done" : i === current ? " active" : "");
        });
        document.getElementById("progress-text").textContent =
          `${current + 1} / ${questions.length}`;
      }

      const LETTERS = ["A", "B", "C", "D"];

      function renderQuestion() {
        updatePips();
        const q = questions[current];
        let answersHTML = "";

        if (q.type === "mc") {
          answersHTML = `<div class="options-grid">${q.options
            .map(
              (o, i) => `
      <button class="option-card${answers[q.id] === i ? " selected" : ""}" onclick="selectMC(${q.id},${i})">
        <span class="option-letter">${LETTERS[i]}</span>
        <span class="option-text">${o}</span>
      </button>`,
            )
            .join("")}</div>`;
        } else if (q.type === "tf") {
          const sel = answers[q.id];
          answersHTML = `<div class="tf-grid">
      <button class="tf-card true-card${sel === true ? " selected" : ""}" onclick="selectTF(${q.id},true)">
        True<span class="tf-sub">Select if correct</span>
      </button>
      <button class="tf-card false-card${sel === false ? " selected" : ""}" onclick="selectTF(${q.id},false)">
        False<span class="tf-sub">Select if incorrect</span>
      </button>
    </div>`;
        } else {
          answersHTML = `<div class="sa-wrapper">
      <textarea class="sa-area" id="sa-input" placeholder="Write your answer here…" oninput="saveText(${q.id},this.value)">${answers[q.id] || ""}</textarea>
      <p class="sa-hint">Minimum 10 characters to continue</p>
    </div>`;
        }

        const typeMap = { mc: "mc", tf: "tf", sa: "sa" };
        const typeLabel = {
          mc: "Multiple choice",
          tf: "True / False",
          sa: "Short answer",
        };
        const hasAnswer =
          q.type === "sa"
            ? (answers[q.id] || "").trim().length > 9
            : answers[q.id] !== undefined;
        const isLast = current === questions.length - 1;

        document.getElementById("q-mount").innerHTML = `
    <div class="q-wrapper">
      <div class="q-header">
        <div class="q-index">0${current + 1}</div>
        <span class="q-type-pill ${typeMap[q.type]}">${typeLabel[q.type]}</span>
      </div>
      <p class="q-text">${q.text}</p>
      ${answersHTML}
      <div class="nav-row">
        <button class="btn-back" onclick="goBack()" style="${current === 0 ? "visibility:hidden" : ""}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back
        </button>
        <button class="btn-next" id="btn-next" onclick="goNext()" ${!hasAnswer ? "disabled" : ""}>
          ${isLast ? "Submit & See Results" : "Next Question"}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`;

        if (q.type === "sa") {
          document
            .getElementById("sa-input")
            .addEventListener("input", function () {
              document.getElementById("btn-next").disabled =
                this.value.trim().length < 10;
            });
        }
      }

      function selectMC(id, i) {
        answers[id] = i;
        renderQuestion();
      }
      function selectTF(id, v) {
        answers[id] = v;
        renderQuestion();
      }
      function saveText(id, v) {
        answers[id] = v;
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
        } else showResults();
      }

      function showResults() {
        document.getElementById("question-screen").style.display = "none";
        document.getElementById("results-screen").style.display = "block";

        let score = 0,
          scored = 0;
        const feedbacks = [];
        questions.forEach((q) => {
          if (q.type === "mc") {
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
              note: `Your response: "${(answers[q.id] || "").trim().substring(0, 160)}${(answers[q.id] || "").length > 160 ? "…" : ""}"`,
            });
          }
        });

        const pct = Math.round((score / scored) * 100);
        let level, levelClass, emoji, advice;
        if (pct >= 80) {
          level = "Advanced";
          levelClass = "level-adv";
          emoji = "✓";
          advice =
            "Strong performance across the objective questions. Review your open-ended responses to tighten your conceptual explanations and push toward mastery.";
        } else if (pct >= 60) {
          level = "Intermediate";
          levelClass = "level-int";
          emoji = "~";
          advice =
            "A solid base is in place. Revisit the questions you missed — the gaps are specific and addressable. Consistent practice will get you to advanced.";
        } else {
          level = "Foundational";
          levelClass = "level-fnd";
          emoji = "!";
          advice =
            "Focus on the fundamentals before moving to advanced topics. Each missed question points to a specific concept worth studying — use them as your study guide.";
        }

        const icons = { correct: "✓", incorrect: "✗", neutral: "◎" };
        const fbHTML = feedbacks
          .map(
            (f) => `
    <div class="fb-item">
      <div class="fb-icon ${f.type}">${icons[f.type]}</div>
      <div>
        <div class="fb-answer-tag">${f.type === "correct" ? "Correct" : f.type === "incorrect" ? "Incorrect" : "Open Answer"}</div>
        <p class="fb-q">${f.q}</p>
        <p class="fb-note">${f.note}</p>
      </div>
    </div> `,
          )
          .join("");

        document.getElementById("results-mount").innerHTML = `
    <div class="results-hero">
      <div>
        <div class="results-tag">Assessment complete</div>
        <h2 class="results-title">Your Results</h2>
        <p class="results-subtitle">You answered ${score} of ${scored} objective questions correctly. See detailed feedback below.</p>
      </div>
      <div class="score-box">
        <div class="score-pct">${pct}%</div>
        <div class="score-label">${score} / ${scored} correct</div>
        <div class="level-badge ${levelClass}">${level}</div>
      </div>
    </div>
    <div class="feedback-section">
      <div class="feedback-heading">Question breakdown</div>
      ${fbHTML}
    </div>
    <div class="next-steps">
      <h3>Recommended next steps</h3>
      <p>${advice}</p>
    </div>
    <button class="btn-restart" onclick="restartAssessment()">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5a5.5 5.5 0 1 1 1.1 3.3M2 11V7.5H5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Retake Assessment
    </button>`;
      }

      function restartAssessment() {
        Object.keys(answers).forEach((k) => delete answers[k]);
        current = 0;
        document.getElementById("results-screen").style.display = "none";
        document.getElementById("intro").style.display = "block";
        document.getElementById("intro").style.opacity = "0";
        document.getElementById("intro").style.animation = "none";
        setTimeout(() => {
          document.getElementById("intro").style.animation =
            "rise 0.5s ease forwards";
        }, 10);
      }