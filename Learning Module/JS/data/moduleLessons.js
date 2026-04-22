import { sampleLesson } from "./sampleLesson.js";

function buildLesson(overrides) {
  return {
    ...sampleLesson,
    ...overrides,
  };
}

const lessonByModuleKey = {
  "basic-communication": buildLesson({
    lessonId: "basic-communication-lesson-01",
    title: "Basic Communication",
    topicTag: "💬 Basic Communication",
  }),
  travel: buildLesson({
    lessonId: "travel-lesson-01",
    title: "Travel Basics",
    topicTag: "✈️ Travel",
  }),
  restaurant: buildLesson({
    lessonId: "restaurant-lesson-01",
    title: "Restaurant Basics",
    topicTag: "🍽️ Restaurant",
  }),
  workplace: buildLesson({
    lessonId: "workplace-lesson-01",
    title: "Workplace Communication",
    topicTag: "💼 Workplace",
  }),
  shopping: buildLesson({
    lessonId: "shopping-lesson-01",
    title: "Shopping Essentials",
    topicTag: "🛍️ Shopping",
  }),
  "health-emergencies": buildLesson({
    lessonId: "health-emergencies-lesson-01",
    title: "Health & Emergencies",
    topicTag: "🏥 Health & Emergencies",
  }),
};

function normalizeKey(moduleKey) {
  return String(moduleKey || "")
    .toLowerCase()
    .trim();
}

function mergeLesson(baseLesson, override) {
  if (!override || typeof override !== "object") return baseLesson;
  return {
    ...baseLesson,
    ...override,
    activities: Array.isArray(override.activities)
      ? override.activities
      : baseLesson.activities,
  };
}

export function getLessonByModuleKey(moduleKey) {
  const normalized = normalizeKey(moduleKey);
  return lessonByModuleKey[normalized] || sampleLesson;
}

export async function getLessonByModuleKeyAsync(moduleKey) {
  const normalized = normalizeKey(moduleKey);
  const fallback = getLessonByModuleKey(normalized);
  const sources = [
    `/api/learning-modules/${encodeURIComponent(normalized || "default")}`,
    new URL("../../data/module-lessons.json", import.meta.url).href,
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { headers: { Accept: "application/json" } });
      if (!response.ok) continue;
      const payload = await response.json();

      if (source.includes("/api/learning-modules/")) {
        return mergeLesson(fallback, payload);
      }

      const modules = payload?.modules;
      if (modules && typeof modules === "object") {
        const moduleOverride = modules[normalized] || modules.default;
        if (moduleOverride) return mergeLesson(fallback, moduleOverride);
      }
    } catch {
      // Try next source.
    }
  }

  return fallback;
}
