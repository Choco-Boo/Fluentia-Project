# Backend Data Handoff (Quick Guide)

This project now supports **API-first data loading with JSON fallback files**.

## Loading Priority Pattern
For each section, frontend tries sources in this order:
1. API endpoint (`/api/...`)
2. Fallback JSON file (under `FrontEnd/public/...` or local module folder)
3. Built-in defaults in code (last fallback)

---

## 1) Dashboard Data

### Endpoint
- `GET /api/dashboard`

### Fallback file
- `FrontEnd/public/data/dashboard.json`

### Used by
- `FrontEnd/src/hooks/useDashboardData.js`

### Shape
- Same shape as `FrontEnd/src/data/mockDashboardData.js`

---

## 2) Onboarding Steps

### Endpoint
- `GET /api/onboarding/steps`

### Fallback file
- `FrontEnd/public/data/onboarding-steps.json`

### Used by
- `FrontEnd/src/pages/OnboardingPage.jsx`

### Required shape
```json
[
  {
    "key": "goals",
    "title": "What are your learning goals?",
    "subtitle": "...",
    "type": "multi",
    "maxSelect": 3,
    "options": [
      {
        "title": "Traveling",
        "description": "...",
        "icon": "TR",
        "image": "/assets/onboarding/topic-travel.svg"
      }
    ]
  }
]
```

Notes:
- `type` must be `single` or `multi`
- `maxSelect` is optional (for multi-select)
- `key` must be unique

---

## 3) AI Conversations Content

### Endpoint
- `GET /api/ai-conversations`

### Fallback file
- `FrontEnd/public/data/ai-conversations.json`

### Used by
- `FrontEnd/src/pages/AIConversationsPage.jsx`

### Required shape
```json
{
  "messages": [
    { "id": "m1", "from": "ai", "text": "..." },
    { "id": "m2", "from": "user", "text": "..." }
  ],
  "suggestedPrompts": ["Practice introductions", "Travel roleplay"],
  "talk": {
    "idleLabel": "...",
    "listeningLabel": "...",
    "processingLabel": "...",
    "defaultResponse": "...",
    "processingResponse": "..."
  }
}
```

---

## 4) Assessment Questions

### Endpoint
- `GET /api/assessment/questions`

### Fallback files
- `FrontEnd/public/assessment/questions.json`
- `Assessment/questions.json`

### Used by
- `Assessment/script.js`
- `FrontEnd/public/assessment/script.js`

### Required question types
- `mc`: multiple choice
- `tf`: true/false
- `reading`: passage + options
- `match`: `pairs`
- `sa`: short answer

### Example
```json
{
  "id": 11,
  "type": "match",
  "level": "intermediate",
  "text": "Match verbs to their meanings",
  "pairs": [
    { "left": "Comer", "right": "To eat" },
    { "left": "Beber", "right": "To drink" }
  ]
}
```

---

## 5) Learning Module Content Overrides

### Endpoint
- `GET /api/learning-modules/:moduleKey`

### Fallback file
- `Learning Module/data/module-lessons.json`

### Used by
- `Learning Module/JS/data/moduleLessons.js`
- `Learning Module/JS/app.js`

### Behavior
- Response/fallback data is merged onto built-in lesson defaults.
- If you provide `activities`, it replaces default activities.

### Fallback shape
```json
{
  "modules": {
    "travel": {
      "lessonId": "travel-lesson-01",
      "title": "Travel Basics",
      "topicTag": "✈️ Travel"
    },
    "default": {
      "title": "Travel Basics"
    }
  }
}
```

---

## Backend Implementation Tips

- Return `application/json`
- Keep IDs stable (`id`, `key`) so UI state remains consistent
- For missing/empty payloads, frontend automatically falls back
- Start by editing fallback JSON files first, then move to live API responses

---

## Quick Test Checklist

1. Update JSON fallback file.
2. Refresh page and verify UI changes.
3. Add API endpoint response.
4. Confirm endpoint response overrides fallback file.
5. Remove endpoint temporarily and confirm fallback still works.
