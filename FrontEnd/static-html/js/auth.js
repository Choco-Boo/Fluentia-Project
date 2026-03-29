(function () {
  var loginForm = document.getElementById('login-form');
  var signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      window.location.href = 'onboarding.html';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      window.location.href = 'onboarding.html';
    });
  }
})();
