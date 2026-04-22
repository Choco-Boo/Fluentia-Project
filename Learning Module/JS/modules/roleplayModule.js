import { showFeedback, clearFeedback } from "../utils/feedback.js";

export function initRole(activity, index, onComplete) {
  const input = document.getElementById(`role-input-${index}`);
  const btn = document.getElementById(`role-btn-${index}`);
  const feedback = document.getElementById(`role-feedback-${index}`);
  const progress = document.getElementById(`role-progress-${index}`);

  clearFeedback(feedback);

  btn.addEventListener("click", () => {
    const userText = input.value.toLowerCase().trim();
    const accepted = activity.acceptable.some(word =>
      userText.includes(word.toLowerCase())
    );

    if (accepted) {
      progress.style.width = "100%";
      showFeedback(feedback, "Great response!", true);
      setTimeout(onComplete, 700);
    } else {
      showFeedback(feedback, "Try again", false);
    }
  });
}