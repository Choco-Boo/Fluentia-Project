import { useEffect, useState } from 'react';

const steps = [
  {
    key: 'goals',
    title: 'What are your learning goals?',
    subtitle: 'Please select as many options as you like, you can always change these later.',
    type: 'multi',
    options: [
      {
        title: 'Traveling',
        description: 'Handle airport, transport, and hotel conversations confidently.',
        icon: 'TR',
        image: '/assets/onboarding/topic-travel.svg'
      },
      {
        title: 'Work / Business',
        description: 'Use better English or Spanish in meetings, updates, and emails.',
        icon: 'WK',
        image: '/assets/onboarding/topic-work.svg'
      },
      {
        title: 'School',
        description: 'Improve your English for class presentations, writing, and exams.',
        icon: 'SC',
        image: '/assets/onboarding/topic-school.svg'
      },
      {
        title: 'Friends & Family',
        description: 'Communicate naturally in day-to-day personal conversations.',
        icon: 'FF',
        image: '/assets/onboarding/topic-family.svg'
      },
      {
        title: 'Culture / Media',
        description: 'Understand movies, shows, podcasts, and social content better.',
        icon: 'CM',
        image: '/assets/onboarding/topic-culture.svg'
      },
      {
        title: 'Just for fun',
        description: 'Learn casually and keep your brain active with practical practice.',
        icon: 'FN',
        image: '/assets/onboarding/topic-fun.svg'
      }
    ]
  },
  {
    key: 'ageRange',
    title: 'Which age range describes you best?',
    subtitle: 'This helps us personalize examples and real-life scenarios.',
    type: 'single',
    options: [
      { title: '18-24', description: 'Young adult learning track', icon: '18' },
      { title: '25-34', description: 'Career-focused learning track', icon: '25' },
      { title: '35-44', description: 'Professional and family balance', icon: '35' },
      { title: '45-54', description: 'Practical communication goals', icon: '45' },
      { title: '55+', description: 'Flexible pace and clear structure', icon: '55' }
    ]
  },
  {
    key: 'level',
    title: 'What is your current level?',
    subtitle: 'Choose your best estimate. We confirm it with a placement test next.',
    type: 'single',
    options: [
      { title: 'Complete beginner', description: 'I am starting from zero', icon: 'A0' },
      { title: 'Beginner', description: 'I know basic words and phrases', icon: 'A1' },
      { title: 'Intermediate', description: 'I can hold simple conversations', icon: 'B1' },
      { title: 'Advanced', description: 'I can communicate with confidence', icon: 'C1' },
      { title: 'Not sure', description: 'Help me find my level', icon: '?' }
    ]
  },
  {
    key: 'language',
    title: 'Which language do you want to learn first?',
    subtitle: 'Choose your target language. You can add another language later.',
    type: 'single',
    options: [
      { title: 'English', description: 'Global communication for work, school, and travel.', icon: 'EN', image: '/assets/onboarding/lang-english.svg' },
      { title: 'Spanish', description: 'Practical for travel, business, and daily conversation.', icon: 'ES', image: '/assets/onboarding/lang-spanish.svg' },
      { title: 'Portuguese', description: 'Useful for Brazil, Portugal, and global communities.', icon: 'PT', image: '/assets/onboarding/lang-portuguese.svg' },
      { title: 'French', description: 'Build confidence for academics, travel, and culture.', icon: 'FR', image: '/assets/onboarding/lang-french.svg' }
    ]
  },
  {
    key: 'studyTime',
    title: 'How much study time is realistic for you?',
    subtitle: 'We build your schedule around your real weekly availability.',
    type: 'single',
    options: [
      { title: '10 min / day', description: 'Light daily practice', icon: '10' },
      { title: '20 min / day', description: 'Balanced pace', icon: '20' },
      { title: '30 min / day', description: 'Strong progress pace', icon: '30' },
      { title: '45 min / day', description: 'Accelerated pace', icon: '45' },
      { title: '60+ min / day', description: 'Intensive pace', icon: '60' }
    ]
  },
  {
    key: 'focusSkills',
    title: 'Which skills should we prioritize first?',
    subtitle: 'Select up to 3 skills for your first personalized lesson path.',
    type: 'multi',
    maxSelect: 3,
    options: [
      { title: 'Speaking', description: 'Build conversation confidence', icon: 'SP' },
      { title: 'Listening', description: 'Understand natural speech faster', icon: 'LS' },
      { title: 'Vocabulary', description: 'Learn practical words and phrases', icon: 'VC' },
      { title: 'Grammar', description: 'Use correct sentence patterns', icon: 'GR' },
      { title: 'Pronunciation', description: 'Sound clearer and more natural', icon: 'PR' },
      { title: 'Writing', description: 'Write messages and emails better', icon: 'WR' }
    ]
  }
];

function OnboardingPage({ goToDashboard }) {
  useEffect(() => {
    document.body.className = 'fd-body';

    return () => {
      document.body.className = '';
    };
  }, []);
  const [stepIndex, setStepIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState({
    goals: [],
    ageRange: '',
    level: '',
    language: '',
    studyTime: '',
    focusSkills: []
  });

  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const selectedValue = formData[currentStep.key];
  const selectedCount = Array.isArray(selectedValue) ? selectedValue.length : selectedValue ? 1 : 0;

  function isSelected(optionTitle) {
    const value = formData[currentStep.key];
    if (Array.isArray(value)) {
      return value.includes(optionTitle);
    }
    return value === optionTitle;
  }

  function handleOptionClick(optionTitle) {
    const key = currentStep.key;

    if (currentStep.type === 'single') {
      setFormData({ ...formData, [key]: optionTitle });
      return;
    }

    const currentValues = formData[key];

    if (currentValues.includes(optionTitle)) {
      setFormData({
        ...formData,
        [key]: currentValues.filter((item) => item !== optionTitle)
      });
      return;
    }

    if (currentStep.maxSelect && currentValues.length >= currentStep.maxSelect) {
      return;
    }

    setFormData({
      ...formData,
      [key]: [...currentValues, optionTitle]
    });
  }

  function canContinue() {
    const value = formData[currentStep.key];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  }

  function handleContinue() {
    if (!canContinue()) {
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    setShowSummary(true);
  }

  function handleBack() {
    if (showSummary) {
      setShowSummary(false);
      return;
    }

    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  function handleQuickAction(action) {
    const key = currentStep.key;

    if (currentStep.type === 'single') {
      if (action === 'suggest') {
        const randomIndex = Math.floor(Math.random() * currentStep.options.length);
        setFormData({ ...formData, [key]: currentStep.options[randomIndex].title });
      }
      return;
    }

    if (action === 'clear') {
      setFormData({ ...formData, [key]: [] });
      return;
    }

    if (action === 'smart') {
      const limit = currentStep.maxSelect ?? Math.min(3, currentStep.options.length);
      const smartSelection = currentStep.options.slice(0, limit).map((option) => option.title);
      setFormData({ ...formData, [key]: smartSelection });
      return;
    }

    if (action === 'all' && !currentStep.maxSelect) {
      setFormData({
        ...formData,
        [key]: currentStep.options.map((option) => option.title)
      });
    }
  }

  if (showSummary) {
    return (
      <div className="onboarding-page">
        <div className="onboarding-card onboarding-card-small">
          <div className="brand-row">
            <div className="brand-icon">S</div>
            <p className="brand-name">Fluentia</p>
          </div>

          <h2 className="summary-title">Great, your profile is ready</h2>
          <p className="onboarding-subtitle">Review your answers before starting your placement test.</p>

          <div className="summary-box">
            <p><strong>Goals:</strong> {formData.goals.join(', ')}</p>
            <p><strong>Age:</strong> {formData.ageRange}</p>
            <p><strong>Level:</strong> {formData.level}</p>
            <p><strong>Language:</strong> {formData.language}</p>
            <p><strong>Study time:</strong> {formData.studyTime}</p>
            <p><strong>Focus skills:</strong> {formData.focusSkills.join(', ')}</p>
          </div>

          <div className="nav-buttons">
            <button type="button" className="back-btn" onClick={handleBack}>Back</button>
            <button type="button" className="continue-btn" onClick={goToDashboard}>Go to dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="brand-row">
          <div className="brand-icon">S</div>
          <p className="brand-name">Fluentia</p>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: progress + '%' }}></div>
        </div>

        <h2>{currentStep.title}</h2>
        <p className="onboarding-subtitle">{currentStep.subtitle}</p>

        <div className="onboarding-meta-row">
          <p className="onboarding-step-pill">Step {stepIndex + 1} of {steps.length}</p>
          <p className="onboarding-selection-pill">
            {currentStep.type === 'multi' && currentStep.maxSelect
              ? `${selectedCount} of ${currentStep.maxSelect} selected`
              : `${selectedCount} selected`}
          </p>
        </div>

        <div className="onboarding-quick-actions">
          {currentStep.type === 'single' ? (
            <button type="button" className="onboarding-quick-btn" onClick={() => handleQuickAction('suggest')}>
              Suggest one
            </button>
          ) : (
            <>
              <button type="button" className="onboarding-quick-btn" onClick={() => handleQuickAction('smart')}>
                Quick fill
              </button>
              {!currentStep.maxSelect && (
                <button type="button" className="onboarding-quick-btn" onClick={() => handleQuickAction('all')}>
                  Select all
                </button>
              )}
              <button type="button" className="onboarding-quick-btn" onClick={() => handleQuickAction('clear')}>
                Clear
              </button>
            </>
          )}
        </div>

        <div className="onboarding-step-dots" aria-hidden="true">
          {steps.map((step, index) => (
            <span
              key={step.key}
              className={
                index < stepIndex
                  ? 'onboarding-dot onboarding-dot-complete'
                  : index === stepIndex
                    ? 'onboarding-dot onboarding-dot-active'
                    : 'onboarding-dot'
              }
            ></span>
          ))}
        </div>

        <div className="option-grid">
          {currentStep.options.map((option) => (
            <button
              key={option.title}
              type="button"
              className={isSelected(option.title) ? 'option-card selected' : 'option-card'}
              onClick={() => handleOptionClick(option.title)}
            >
              <div className="option-left">
                {option.image ? (
                  <div className="option-image-wrap">
                    <img src={option.image} alt="" className="option-image" />
                  </div>
                ) : (
                  <div className="option-icon">{option.icon}</div>
                )}
                <div>
                  <p className="option-title">{option.title}</p>
                  <p className="option-description">{option.description}</p>
                </div>
              </div>
              <span className={isSelected(option.title) ? 'check-dot checked' : 'check-dot'}></span>
            </button>
          ))}
        </div>

        <div className="nav-buttons">
          <button type="button" className="back-btn" onClick={handleBack} disabled={stepIndex === 0}>
            Back
          </button>
          <button type="button" className="continue-btn" onClick={handleContinue} disabled={!canContinue()}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
