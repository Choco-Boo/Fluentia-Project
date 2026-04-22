import { showFeedback, clearFeedback } from "../utils/feedback.js";

export function initReading(activity, index, onComplete) {
  const questionText = document.getElementById(`question-text-${index}`);
  const answerGrid = document.getElementById(`answer-grid-${index}`);
  const btn = document.getElementById(`reading-btn-${index}`);
  const feedback = document.getElementById(`reading-feedback-${index}`);
  const progress = document.getElementById(`reading-progress-${index}`);
  const qNum = document.getElementById(`q-num-${index}`);

  let currentQ = 0;
  let selectedAnswer = null;

  function renderQuestion() {
    const q = activity.questions[currentQ];
    qNum.textContent = currentQ + 1;
    questionText.textContent = q.q;
    answerGrid.innerHTML = "";
    selectedAnswer = null;
    btn.disabled = true;
    clearFeedback(feedback);

    q.options.forEach((option, i) => {
      const optionBtn = document.createElement("button");
      optionBtn.className = "answer-btn";
      optionBtn.type = "button";
      optionBtn.textContent = option;

      optionBtn.addEventListener("click", () => {
        document.querySelectorAll(`#answer-grid-${index} .answer-btn`).forEach(btn => {
          btn.classList.remove("selected");
        });
        optionBtn.classList.add("selected");
        selectedAnswer = i;
        btn.disabled = false;
      });

      answerGrid.appendChild(optionBtn);
    });
  }

  btn.addEventListener("click", () => {
    const correct = selectedAnswer === activity.questions[currentQ].answer;
    const selectedBtn = document.querySelector(`#answer-grid-${index} .answer-btn.selected`);

    if (correct) {
      if (selectedBtn) selectedBtn.classList.add("correct");
      showFeedback(feedback, "Correct!", true);
      currentQ++;
      progress.style.width = `${(currentQ / activity.questions.length) * 100}%`;

      setTimeout(() => {
        if (currentQ < activity.questions.length) {
          renderQuestion();
        } else {
          onComplete();
        }
      }, 600);
    } else {
      if (selectedBtn) selectedBtn.classList.add("incorrect");
      showFeedback(feedback, "Try again", false);
    }
  });

  renderQuestion();
}