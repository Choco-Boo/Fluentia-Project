import { escapeHtml, titleCaseVariant } from "../utils/helpers.js";

export function roleplayTemplate(activity, index, total, difficulty, topicTag) {
  const levelAttr = difficulty.toLowerCase();

  return `
    <section class="screen" id="screen-${index}" data-type="roleplay" style="display:none">
      <div class="fd-section lesson-shell">
        <div class="lesson-progress-card">
          <div class="progress-top-row">
            <div>
              <p class="progress-label">Lesson Progress</p>
            </div>
            <div class="level-badge" data-level="${escapeHtml(levelAttr)}">${escapeHtml(difficulty)}</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" id="role-progress-${index}" style="width:0%"></div>
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

            <p class="question-text">${escapeHtml(activity.prompt)}</p>

            <input
              type="text"
              id="role-input-${index}"
              class="role-input"
              placeholder="Type your response..."
            />

            <div class="feedback" id="role-feedback-${index}"></div>

            <button class="fd-btn-dark lesson-action-btn" id="role-btn-${index}" type="button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}