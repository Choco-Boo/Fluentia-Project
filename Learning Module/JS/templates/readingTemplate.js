import { escapeHtml, titleCaseVariant } from "../utils/helpers.js";

export function readingTemplate(activity, index, total, difficulty, topicTag) {
  const levelAttr = difficulty.toLowerCase();

  return `
    <section class="screen" id="screen-${index}" data-type="reading" style="display:none">
      <div class="fd-section lesson-shell">
        <div class="lesson-progress-card">
          <div class="progress-top-row">
            <div>
              <p class="progress-label">Lesson Progress</p>
            </div>
            <div class="level-badge" data-level="${escapeHtml(levelAttr)}">${escapeHtml(difficulty)}</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="reading-progress-${index}" style="width:0%"></div>
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

            <div class="passage-box">${escapeHtml(activity.passage)}</div>

            <p class="question-label">
              Question <span id="q-num-${index}">1</span> of
              <span id="q-total-${index}">${activity.questions.length}</span>
            </p>

            <p class="question-text" id="question-text-${index}"></p>

            <div class="answer-grid" id="answer-grid-${index}"></div>

            <div class="feedback" id="reading-feedback-${index}"></div>

            <button class="fd-btn-dark lesson-action-btn" id="reading-btn-${index}" disabled type="button">
              Confirm Answer
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}