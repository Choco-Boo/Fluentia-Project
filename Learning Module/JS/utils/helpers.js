export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function getLevelLabel(difficulty) {
  return {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }[difficulty] || "Beginner";
}

export function resolveDifficulty(difficulty) {
  const valid = ["beginner", "intermediate", "advanced"];
  return valid.includes(difficulty) ? difficulty : "beginner";
}

export function titleCaseVariant(variant = "") {
  return variant
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" → ");
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderContent(content) {
  if (!content) return "";

  if (content.type === "text") {
    return `<span class="match-text">${escapeHtml(content.value)}</span>`;
  }

  if (content.type === "image") {
    return `
      <div class="match-image-wrap">
        <img
          src="${escapeHtml(content.value)}"
          alt="${escapeHtml(content.alt || "match image")}"
          class="match-image"
        />
      </div>
    `;
  }

  if (content.type === "audio") {
    return `
      <button
        class="audio-play-btn"
        type="button"
        data-audio-text="${escapeHtml(content.value)}"
        aria-label="Play audio"
      >
        🔊 Play
      </button>
    `;
  }

  return `<span>${escapeHtml(content.value || "")}</span>`;
}

export function playAudioText(text, lang = "es-ES") {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function resolveActivityDifficulty(activity, lessonDifficulty) {
  return resolveDifficulty(activity.forcedDifficulty || lessonDifficulty);
}

export function resolveActivityVariant(activity, lessonDifficulty) {
  if (!activity.variants) return activity;

  const chosenDifficulty = resolveActivityDifficulty(activity, lessonDifficulty);
  const variants = activity.variants;
  let chosenVariant = variants[chosenDifficulty];

  if (activity.forcedMode) {
    const forcedModeMatch = Object.values(variants).find(
      (variant) => variant.mode === activity.forcedMode
    );

    if (forcedModeMatch) {
      chosenVariant = forcedModeMatch;
    }
  }

  if (!chosenVariant) {
    chosenVariant = variants.beginner || Object.values(variants)[0];
  }

  return {
    ...activity,
    resolvedDifficulty: chosenDifficulty,
    ...chosenVariant
  };
}