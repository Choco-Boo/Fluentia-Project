export function showFeedback(el, msg, good) {
  el.textContent = msg;
  el.className = `feedback show ${good ? "correct-fb" : "wrong-fb"}`;
}

export function clearFeedback(el) {
  el.textContent = "";
  el.className = "feedback";
}