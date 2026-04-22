import { escapeHtml, titleCaseVariant } from "../utils/helpers.js";

export function speechTemplate(activity, index, total, difficulty, topicTag) {
  const levelAttr = difficulty.toLowerCase();

  return `
    <section class="screen" id="screen-${index}" data-type="speech" style="display:none">
      <div class="fd-section lesson-shell">
        <div class="lesson-progress-card">
          <div class="progress-top-row">
            <div>
              <p class="progress-label">Lesson Progress</p>
            </div>
            <div class="level-badge" data-level="${escapeHtml(levelAttr)}">${escapeHtml(difficulty)}</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="speech-progress-${index}" style="width:0%"></div>
          </div>
        </div>

        <div class="lesson-card">
          <div class="lesson-card-inner">
            <div class="lesson-header-row">
              <div class="topic-tag">${escapeHtml(topicTag || "🎤 Pronunciation")}</div>
            </div>

            <div class="activity-type">${escapeHtml(activity.title)}</div>
            <div class="activity-meta">
              Activity ${index + 1} of ${total} • Mode: ${escapeHtml(titleCaseVariant(activity.mode))}
            </div>

            <p class="question-text">${escapeHtml(activity.prompt)}</p>

            <div class="microphone-status" id="mic-status-${index}">
              <span class="mic-indicator"></span>
              <span class="mic-label">Microphone: Off</span>
            </div>

            <div class="button-group">
              <button class="fd-btn-dark lesson-action-btn half" id="start-record-${index}" type="button">
                Start Speaking
              </button>
              <button class="fd-btn-light lesson-light-btn half" id="skip-speech-${index}" type="button">
                Skip Activity
              </button>
            </div>

            <div class="feedback" id="speech-feedback-${index}"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}