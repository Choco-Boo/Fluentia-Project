import { escapeHtml, titleCaseVariant } from "../utils/helpers.js";

export function matchTemplate(activity, index, total, difficulty, topicTag) {
  const rightLabelMap = {
    "text-text": "Translations",
    "text-image": "Pictures",
    "text-audio": "Audio"
  };

  const levelAttr = difficulty.toLowerCase();

  return `
    <section class="screen" id="screen-${index}" data-type="match" style="display:none">
      <div class="fd-section lesson-shell">
        <div class="lesson-progress-card">
          <div class="progress-top-row">
            <div>
              <p class="progress-label">Lesson Progress</p>
            </div>
            <div class="level-badge" data-level="${escapeHtml(levelAttr)}">${escapeHtml(difficulty)}</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="match-progress-${index}" style="width:0%"></div>
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

            <div class="score-chip" id="match-score-${index}">
              ⭐ 0 / ${activity.items.length} pairs matched
            </div>

            <p class="row-label">Words</p>
            <div class="match-grid" id="words-row-${index}"></div>

            <p class="row-label">${rightLabelMap[activity.mode] || "Matches"}</p>
            <div class="match-grid" id="trans-row-${index}"></div>

            <div class="feedback" id="match-feedback-${index}"></div>

            <button class="fd-btn-dark lesson-action-btn" id="match-btn-${index}" disabled type="button">
              Check Matches
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}