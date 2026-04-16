export const mockDashboardData = {
  user: {
    id: 'u_1001',
    name: 'Cassandra Eloise',
    level: 'B1',
    language: 'Spanish',
    goal: 'Work / Business',
    weeklyMinutes: 145,
    xp: 2380,
    completedLessons: 42,
    quizzesCompleted: 17,
    streakDays: 11,
    weeklyGoalPercent: 72,
    levelProgressPercent: 64,
    xpToNextLevel: 620
  },
  lessons: {
    contentTypes: [
      { id: 'exercises', title: 'Exercises', detail: 'Targeted drills for daily practice.', icon: '✍', cta: 'Open' },
      { id: 'quizzes', title: 'Quizzes', detail: 'Quick checks to validate retention.', icon: '🧠', cta: 'Start' },
      { id: 'exams', title: 'Exams', detail: 'Milestone tests for level progress.', icon: '📝', cta: 'Take' },
      { id: 'lectures', title: 'Lectures', detail: 'Guided lesson explainers.', icon: '🎧', cta: 'Watch' }
    ],
    current: [
      { id: 'l1', title: 'Travel Dialogues: Airport Check-in', type: 'Speaking', progressPercent: 68 },
      { id: 'l2', title: 'Work Updates: Present Simple vs Past', type: 'Grammar', progressPercent: 54 },
      { id: 'l3', title: 'Kitchen Vocabulary Objects 1', type: 'Vocabulary', progressPercent: 43 }
    ],
    recommended: [
      { id: 'r1', title: 'Quiz of the Day', detail: '12-question challenge on recent topics.' },
      { id: 'r2', title: 'Vocabulary Practice', detail: 'Review 20 high-frequency work phrases.' },
      { id: 'r3', title: 'Speaking Practice', detail: '5-minute AI role-play for meetings.' }
    ],
    featuredPath: {
      id: 'fp1',
      title: 'Practical Conversations A2',
      resumeLabel: 'Resume lesson'
    }
  },
  progress: {
    skills: [
      { id: 'vocabulary', label: 'Vocabulary', completionPercent: 78 },
      { id: 'speaking', label: 'Speaking', completionPercent: 62 },
      { id: 'listening', label: 'Listening', completionPercent: 71 },
      { id: 'grammar', label: 'Grammar', completionPercent: 68 },
      { id: 'writing', label: 'Writing', completionPercent: 55 }
    ],
    milestone: {
      title: 'Next Milestone',
      description: 'Complete 1 more quiz to unlock the “Perfect Week” badge and earn +120 XP.'
    },
    activitySummary: [
      { id: 'w', label: 'This Week', value: '145 min studied' },
      { id: 'm', label: 'This Month', value: '18 lessons completed' },
      { id: 'i', label: 'Improvement', value: '+12% speaking confidence' }
    ]
  },
  achievements: {
    earnedBadges: [
      { id: 'b1', category: 'Consistency', name: '11 Day Streak' },
      { id: 'b2', category: 'Quizzes', name: 'Quiz Master' },
      { id: 'b3', category: 'Speaking', name: 'Conversation Boost' },
      { id: 'b4', category: 'Vocabulary', name: 'Word Builder' },
      { id: 'b5', category: 'Course Completion', name: 'Module One Complete' }
    ],
    lockedBadges: [
      { id: 'l1', category: 'Speaking', name: 'Confident Interviewer', requirement: 'Complete 1 more speaking drill' },
      { id: 'l2', category: 'Vocabulary', name: '500 Word Club', requirement: 'Learn 42 more words' },
      { id: 'l3', category: 'Quizzes', name: 'Perfect Week', requirement: 'Score 90%+ in 3 more quizzes' }
    ],
    categories: ['Vocabulary', 'Speaking', 'Consistency', 'Quizzes', 'Course Completion'],
    recentCompletedTopics: ['Ordering food politely', 'Giving work updates', 'Asking follow-up questions'],
    strengths: ['Vocabulary retention', 'Reading comprehension', 'Quiz performance'],
    needsPractice: ['Speaking fluency', 'Advanced grammar patterns']
  },
  sessions: {
    upcoming: [
      { id: 's1', title: 'Live Speaking Session', detail: 'Today • 6:30 PM', cta: 'Join' },
      { id: 's2', title: 'Weekly Progress Review', detail: 'Tomorrow • 8:00 AM', cta: 'Review' },
      { id: 's3', title: 'Quiz Reminder', detail: 'Friday • 7:00 PM', cta: 'Practice' }
    ]
  },
  settings: {
    account: {
      email: 'cassandra@fluentia.app'
    },
    preferenceOptions: {
      languages: ['English', 'Spanish', 'Portuguese', 'French'],
      goals: ['Work / Business', 'Traveling', 'School', 'Friends & Family'],
      targets: ['10 min / day', '20 min / day', '30 min / day', '45 min / day']
    },
    notifications: {
      dailyReminder: true,
      weeklySummary: true,
      productUpdates: false
    }
  }
};
