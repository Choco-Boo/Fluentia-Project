import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [page, setPage] = useState('landing');

  if (page === 'landing') {
    return (
      <LandingPage
        goToLogin={() => setPage('login')}
        goToSignup={() => setPage('signup')}
      />
    );
  }

  if (page === 'signup') {
    return (
      <SignupPage
        goToLanding={() => setPage('landing')}
        goToLogin={() => setPage('login')}
        goToOnboarding={() => setPage('onboarding')}
      />
    );
  }

  if (page === 'onboarding') {
    return <OnboardingPage goToDashboard={() => setPage('dashboard')} />;
  }

  if (page === 'dashboard') {
    return <DashboardPage goToLanding={() => setPage('landing')} goToOnboarding={() => setPage('onboarding')} />;
  }

  return (
    <LoginPage
      goToSignup={() => setPage('signup')}
      goToDashboard={() => setPage('dashboard')}
    />
  );
}

export default App;
