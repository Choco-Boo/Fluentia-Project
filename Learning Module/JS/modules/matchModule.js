import {
  shuffle,
  renderContent,
  playAudioText
} from "../utils/helpers.js";
import { showFeedback, clearFeedback } from "../utils/feedback.js";

export function initMatch(activity, index, onComplete) {
  const wordsRow = document.getElementById(`words-row-${index}`);
  const transRow = document.getElementById(`trans-row-${index}`);
  const btn = document.getElementById(`match-btn-${index}`);
  const feedback = document.getElementById(`match-feedback-${index}`);
  const score = document.getElementById(`match-score-${index}`);
  const progress = document.getElementById(`match-progress-${index}`);

  let selectedWord = null;
  let selectedTrans = null;
  let matchedCount = 0;

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

    el.addEventListener("click", () => {
      if (el.classList.contains("matched")) return;

      if (side === "left") {
        if (selectedWord) selectedWord.classList.remove("selected");
        selectedWord = el;
      } else {
        if (selectedTrans) selectedTrans.classList.remove("selected");
        selectedTrans = el;
      }

      el.classList.add("selected");
      btn.disabled = !(selectedWord && selectedTrans);
    });

    return el;
  }

  function resetSelection() {
    if (selectedWord) selectedWord.classList.remove("selected");
    if (selectedTrans) selectedTrans.classList.remove("selected");
    selectedWord = null;
    selectedTrans = null;
    btn.disabled = true;
  }

  function checkMatch() {
    if (!selectedWord || !selectedTrans) return;

    const isMatch = selectedWord.dataset.id === selectedTrans.dataset.id;

    if (isMatch) {
      selectedWord.classList.add("matched");
      selectedTrans.classList.add("matched");
      selectedWord.classList.remove("selected");
      selectedTrans.classList.remove("selected");

      matchedCount++;
      progress.style.width = `${(matchedCount / activity.items.length) * 100}%`;
      score.textContent = `⭐ ${matchedCount} / ${activity.items.length} pairs matched`;
      showFeedback(feedback, "Great!", true);

      selectedWord = null;
      selectedTrans = null;
      btn.disabled = true;

      if (matchedCount === activity.items.length) {
        btn.textContent = "Continue";
        btn.disabled = false;
        btn.onclick = onComplete;
      }
    } else {
      showFeedback(feedback, "Try again", false);
      selectedWord.classList.add("wrong");
      selectedTrans.classList.add("wrong");

      setTimeout(() => {
        if (selectedWord) selectedWord.classList.remove("wrong", "selected");
        if (selectedTrans) selectedTrans.classList.remove("wrong", "selected");
        resetSelection();
      }, 600);
    }
  }

  clearFeedback(feedback);
  wordsRow.innerHTML = "";
  transRow.innerHTML = "";
  btn.disabled = true;
  btn.textContent = "Check Matches";
  btn.onclick = checkMatch;

  shuffle(activity.items).forEach(item => {
    wordsRow.appendChild(createCard(item, "left"));
  });

  shuffle(activity.items).forEach(item => {
    transRow.appendChild(createCard(item, "right"));
  });
}