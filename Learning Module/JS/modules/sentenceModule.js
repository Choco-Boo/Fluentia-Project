import { shuffle } from "../utils/helpers.js";
import { showFeedback, clearFeedback } from "../utils/feedback.js";

export function initSentence(activity, index, onComplete) {
  const wordsEl = document.getElementById(`sentence-words-${index}`);
  const dropEl = document.getElementById(`sentence-drop-${index}`);
  const fillOptionsEl = document.getElementById(`fill-options-${index}`);
  const btn = document.getElementById(`sentence-btn-${index}`);
  const feedback = document.getElementById(`sentence-feedback-${index}`);
  const progress = document.getElementById(`sentence-progress-${index}`);

  let selectedFillAnswer = null;

  clearFeedback(feedback);

  if (activity.mode === "drag-order") {
    if (wordsEl) wordsEl.innerHTML = "";
    if (dropEl) dropEl.innerHTML = "";

    shuffle(activity.words).forEach(word => {
      const wordBtn = document.createElement("button");
      wordBtn.className = "sentence-word";
      wordBtn.type = "button";
      wordBtn.textContent = word;

      wordBtn.addEventListener("click", () => {
        if (wordBtn.parentElement === wordsEl) {
          dropEl.appendChild(wordBtn);
          wordBtn.classList.add("used");
        } else {
          wordsEl.appendChild(wordBtn);
          wordBtn.classList.remove("used");
        }

        progress.style.width = `${(dropEl.children.length / activity.words.length) * 100}%`;
      });

      wordsEl.appendChild(wordBtn);
    });

    btn.addEventListener("click", () => {
      const built = [...dropEl.children].map(el => el.textContent).join(" ");

      if (built === activity.correct) {
        progress.style.width = "100%";
        showFeedback(feedback, "Perfect!", true);
        setTimeout(onComplete, 700);
      } else {
        showFeedback(feedback, "Try again", false);
        dropEl.classList.add("wrong");
        setTimeout(() => dropEl.classList.remove("wrong"), 500);
      }
    });
  }

  if (activity.mode === "fill-blank") {
    fillOptionsEl.innerHTML = "";

    activity.options.forEach(option => {
      const optionBtn = document.createElement("button");
      optionBtn.className = "answer-btn";
      optionBtn.type = "button";
      optionBtn.textContent = option;

      optionBtn.addEventListener("click", () => {
        document.querySelectorAll(`#fill-options-${index} .answer-btn`).forEach(btn => {
          btn.classList.remove("selected");
        });
        optionBtn.classList.add("selected");
        selectedFillAnswer = option;
        progress.style.width = "70%";
      });

      fillOptionsEl.appendChild(optionBtn);
    });

    btn.addEventListener("click", () => {
      if (selectedFillAnswer === activity.answer) {
        progress.style.width = "100%";
        showFeedback(feedback, "Perfect!", true);
        setTimeout(onComplete, 700);
      } else {
        showFeedback(feedback, "Try again", false);
        const selectedBtn = document.querySelector(`#fill-options-${index} .answer-btn.selected`);
        if (selectedBtn) {
          selectedBtn.classList.add("incorrect");
          setTimeout(() => selectedBtn.classList.remove("incorrect"), 500);
        }
      }
    });
  }
}