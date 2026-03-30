(function () {
  var root = document.getElementById('onboarding-root');
  if (!root) {
    return;
  }

  var steps = [
    {
      key: 'goals',
      title: 'What are your learning goals?',
      subtitle: 'Please select as many options as you like, you can always change these later.',
      type: 'multi',
      options: [
        { title: 'Traveling', description: 'Speak confidently while traveling abroad', icon: 'TR' },
        { title: 'Work / Business', description: 'Use language in meetings and emails', icon: 'WK' },
        { title: 'School', description: 'Improve grades and class participation', icon: 'SC' },
        { title: 'Friends & Family', description: 'Communicate in daily personal conversations', icon: 'FF' },
        { title: 'Culture / Media', description: 'Enjoy movies, music, and articles', icon: 'CM' },
        { title: 'Just for fun', description: 'Learn casually and stay mentally active', icon: 'FN' }
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

  var state = {
    stepIndex: 0,
    showSummary: false,
    formData: {
      goals: [],
      ageRange: '',
      level: '',
      studyTime: '',
      focusSkills: []
    }
  };

  function currentStep() {
    return steps[state.stepIndex];
  }

  function isSelected(optionTitle) {
    var key = currentStep().key;
    var value = state.formData[key];
    if (Array.isArray(value)) {
      return value.indexOf(optionTitle) !== -1;
    }
    return value === optionTitle;
  }

  function canContinue() {
    var key = currentStep().key;
    var value = state.formData[key];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  }

  function setOption(optionTitle) {
    var step = currentStep();
    var key = step.key;

    if (step.type === 'single') {
      state.formData[key] = optionTitle;
      return;
    }

    var currentValues = state.formData[key].slice();
    var currentIndex = currentValues.indexOf(optionTitle);

    if (currentIndex !== -1) {
      currentValues.splice(currentIndex, 1);
      state.formData[key] = currentValues;
      return;
    }

    if (step.maxSelect && currentValues.length >= step.maxSelect) {
      return;
    }

    currentValues.push(optionTitle);
    state.formData[key] = currentValues;
  }

  function renderSummary() {
    root.innerHTML =
      '<div class="onboarding-page">' +
      '  <div class="onboarding-card onboarding-card-small">' +
      '    <div class="brand-row">' +
      '      <div class="brand-icon">S</div>' +
      '      <p class="brand-name">Fluentia</p>' +
      '    </div>' +
      '    <h2 class="summary-title">Great, your profile is ready</h2>' +
      '    <p class="onboarding-subtitle">Review your answers before starting your placement test.</p>' +
      '    <div class="summary-box">' +
      '      <p><strong>Goals:</strong> ' + state.formData.goals.join(', ') + '</p>' +
      '      <p><strong>Age:</strong> ' + state.formData.ageRange + '</p>' +
      '      <p><strong>Level:</strong> ' + state.formData.level + '</p>' +
      '      <p><strong>Study time:</strong> ' + state.formData.studyTime + '</p>' +
      '      <p><strong>Focus skills:</strong> ' + state.formData.focusSkills.join(', ') + '</p>' +
      '    </div>' +
      '    <div class="nav-buttons">' +
      '      <button type="button" class="back-btn" id="summary-back">Back</button>' +
      '      <button type="button" class="continue-btn" id="to-dashboard">Go to dashboard</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    document.getElementById('summary-back').addEventListener('click', function () {
      state.showSummary = false;
      render();
    });

    document.getElementById('to-dashboard').addEventListener('click', function () {
      window.location.href = 'dashboard.html';
    });
  }

  function renderStep() {
    var step = currentStep();
    var progress = ((state.stepIndex + 1) / steps.length) * 100;

    var optionsHtml = step.options.map(function (option) {
      var selected = isSelected(option.title);
      return (
        '<button type="button" class="' + (selected ? 'option-card selected' : 'option-card') + '" data-option="' + option.title + '">' +
        '  <div class="option-left">' +
        '    <div class="option-icon">' + option.icon + '</div>' +
        '    <div>' +
        '      <p class="option-title">' + option.title + '</p>' +
        '      <p class="option-description">' + option.description + '</p>' +
        '    </div>' +
        '  </div>' +
        '  <span class="' + (selected ? 'check-dot checked' : 'check-dot') + '"></span>' +
        '</button>'
      );
    }).join('');

    root.innerHTML =
      '<div class="onboarding-page">' +
      '  <div class="onboarding-card">' +
      '    <div class="brand-row">' +
      '      <div class="brand-icon">S</div>' +
      '      <p class="brand-name">Fluentia</p>' +
      '    </div>' +
      '    <div class="progress-track">' +
      '      <div class="progress-fill" style="width:' + progress + '%"></div>' +
      '    </div>' +
      '    <h2>' + step.title + '</h2>' +
      '    <p class="onboarding-subtitle">' + step.subtitle + '</p>' +
      '    <div class="option-grid">' + optionsHtml + '</div>' +
      '    <div class="nav-buttons">' +
      '      <button type="button" class="back-btn" id="step-back" ' + (state.stepIndex === 0 ? 'disabled' : '') + '>Back</button>' +
      '      <button type="button" class="continue-btn" id="step-continue" ' + (!canContinue() ? 'disabled' : '') + '>Continue</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    var optionButtons = root.querySelectorAll('[data-option]');
    optionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setOption(button.getAttribute('data-option'));
        render();
      });
    });

    document.getElementById('step-back').addEventListener('click', function () {
      if (state.stepIndex > 0) {
        state.stepIndex -= 1;
        render();
      }
    });

    document.getElementById('step-continue').addEventListener('click', function () {
      if (!canContinue()) {
        return;
      }

      if (state.stepIndex < steps.length - 1) {
        state.stepIndex += 1;
      } else {
        state.showSummary = true;
      }

      render();
    });
  }

  function render() {
    if (state.showSummary) {
      renderSummary();
      return;
    }

    renderStep();
  }

  render();
})();
