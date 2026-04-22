import { showFeedback } from "../utils/feedback.js";

export function initSpeech(activity, index, onComplete) {
  const startBtn = document.getElementById(`start-record-${index}`);
  const skipBtn = document.getElementById(`skip-speech-${index}`);
  const feedback = document.getElementById(`speech-feedback-${index}`);
  const progress = document.getElementById(`speech-progress-${index}`);
  const micStatus = document.getElementById(`mic-status-${index}`);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  function setMic(active) {
    const label = micStatus.querySelector(".mic-label");
    micStatus.classList.toggle("active", active);
    if (label) label.textContent = active ? "Microphone: On" : "Microphone: Off";
    startBtn.textContent = active ? "Stop Speaking" : "Start Speaking";
  }

  if (!SpeechRecognition) {
    startBtn.addEventListener("click", () => {
      progress.style.width = "100%";
      showFeedback(feedback, "Speech recognition is not supported here. Moving forward.", false);
      setTimeout(onComplete, 900);
    });

    skipBtn.addEventListener("click", () => {
      progress.style.width = "100%";
      onComplete();
    });

    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  let listening = false;

  startBtn.addEventListener("click", () => {
    if (!listening) {
      recognition.start();
      listening = true;
      setMic(true);
    } else {
      recognition.stop();
      listening = false;
      setMic(false);
    }
  });

  skipBtn.addEventListener("click", () => {
    recognition.stop();
    listening = false;
    setMic(false);
    progress.style.width = "100%";
    showFeedback(feedback, "Activity skipped. Moving forward...", true);
    setTimeout(onComplete, 700);
  });

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase();

    if (spoken.includes(activity.expectedKeyword.toLowerCase())) {
      progress.style.width = "100%";
      showFeedback(feedback, "Great pronunciation! Moving forward...", true);
      setTimeout(onComplete, 900);
    } else {
      showFeedback(feedback, "Try again before moving on.", false);
    }
  };

  recognition.onerror = () => {
    showFeedback(feedback, "Could not hear you clearly. Try again or skip.", false);
  };

  recognition.onend = () => {
    listening = false;
    setMic(false);
  };
}