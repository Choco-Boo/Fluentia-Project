import { escapeHtml, titleCaseVariant } from "../utils/helpers.js";

export function sentenceTemplate(activity, index, total, difficulty, topicTag) {
  const isFillBlank = activity.mode === "fill-blank";
  const levelAttr = difficulty.toLowerCase();

  return `
    <section class="screen" id="screen-${index}" data-type="sentence" style="display:none">
      <div class="fd-section lesson-shell">
        <div class="lesson-progress-card">
          <div class="progress-top-row">
            <div>
              <p class="progress-label">Lesson Progress</p>
            </div>
            <div class="level-badge" data-level="${escapeHtml(levelAttr)}">${escapeHtml(difficulty)}</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="sentence-progress-${index}" style="width:0%"></div>
          </div>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-inner">
            <div class="lesson-header-row">
              <div class="topic-tag">${escapeHtml(topicTag)}</div>
            </div>

            <div class="activity-type">${escapeHtml(activity.title)}</div>
            <div class="activity-meta">
              Activity ${index + 1} of ${total} • Mode: ${escapeHtml(titleCaseVariant(activity.mode))}
            </div>

            <p class="question-text">${escapeHtml(activity.question)}</p>

            <div id="sentence-builder-area-${index}" style="${isFillBlank ? "display:none;" : "display:block;"}">
              <p class="row-label">Word Bank</p>
              <div class="sentence-words" id="sentence-words-${index}"></div>

              <p class="row-label">Your Sentence</p>
              <div class="sentence-drop" id="sentence-drop-${index}"></div>
            </div>

            <div id="sentence-fill-area-${index}" style="${isFillBlank ? "display:block;" : "display:none;"}">
              <p class="question-text" id="fill-sentence-text-${index}">
                ${escapeHtml(activity.sentence || "")}
              </p>
              <div class="answer-grid" id="fill-options-${index}"></div>
            </div>

            <div class="feedback" id="sentence-feedback-${index}"></div>

            <button class="fd-btn-dark lesson-action-btn" id="sentence-btn-${index}" type="button">
              ${isFillBlank ? "Check Answer" : "Check Sentence"}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}