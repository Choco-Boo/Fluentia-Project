import { LessonFlow } from "./config/lessonFlow.js";
import { sampleLesson } from "./data/sampleLesson.js";

import { createRouter } from "./utils/screenRouter.js";
import {
  getLevelLabel,
  resolveDifficulty,
  resolveActivityVariant
} from "./utils/helpers.js";

import { matchTemplate } from "./templates/matchTemplate.js";
import { readingTemplate } from "./templates/readingTemplate.js";
import { sentenceTemplate } from "./templates/sentenceTemplate.js";
import { roleplayTemplate } from "./templates/roleplayTemplate.js";
import { speechTemplate } from "./templates/speechTemplate.js";

import { initMatch } from "./modules/matchModule.js";
import { initReading } from "./modules/readingModule.js";
import { initSentence } from "./modules/sentenceModule.js";
import { initRole } from "./modules/roleplayModule.js";
import { initSpeech } from "./modules/speechModule.js";

const root = document.getElementById("lesson-root");
const lesson = sampleLesson;

const lessonDifficulty = resolveDifficulty(lesson.difficulty);

const resolvedActivities = lesson.activities.map((activity) =>
  resolveActivityVariant(activity, lessonDifficulty)
);

const total = resolvedActivities.length;

function goToCheckpoint() {
  window.location.href = lesson.checkpointUrl || LessonFlow.checkpointUrl;
}

const router = createRouter(resolvedActivities, goToCheckpoint);

function renderLesson() {
  root.innerHTML = resolvedActivities
    .map((activity, index) => {
      const difficultyLabel = getLevelLabel(
        activity.resolvedDifficulty || lessonDifficulty
      );

      switch (activity.type) {
        case "match":
          return matchTemplate(
            activity,
            index,
            total,
            difficultyLabel,
            lesson.topicTag
          );
        case "reading":
          return readingTemplate(
            activity,
            index,
            total,
            difficultyLabel,
            lesson.topicTag
          );
        case "sentence":
          return sentenceTemplate(
            activity,
            index,
            total,
            difficultyLabel,
            lesson.topicTag
          );
        case "roleplay":
          return roleplayTemplate(
            activity,
            index,
            total,
            difficultyLabel,
            lesson.topicTag
          );
        case "speech":
          return speechTemplate(
            activity,
            index,
            total,
            difficultyLabel,
            lesson.topicTag
          );
        default:
          return "";
      }
    })
    .join("");
}

function initActivities() {
  resolvedActivities.forEach((activity, index) => {
    const onComplete = () => router.next();

    switch (activity.type) {
      case "match":
        initMatch(activity, index, onComplete);
        break;
      case "reading":
        initReading(activity, index, onComplete);
        break;
      case "sentence":
        initSentence(activity, index, onComplete);
        break;
      case "roleplay":
        initRole(activity, index, onComplete);
        break;
      case "speech":
        initSpeech(activity, index, onComplete);
        break;
    }
  });
}

renderLesson();
initActivities();
router.start();