import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

function getRouteFromPath(pathname) {
  if (pathname === '/login') return { page: 'login', section: 'dashboard' };
  if (pathname === '/signup') return { page: 'signup', section: 'dashboard' };
  if (pathname === '/onboarding') return { page: 'onboarding', section: 'dashboard' };
  if (pathname === '/dashboard') return { page: 'dashboard', section: 'dashboard' };
  if (pathname === '/lessons') return { page: 'dashboard', section: 'lessons' };
  if (pathname === '/practice') return { page: 'dashboard', section: 'practice' };
  if (pathname === '/courses') return { page: 'dashboard', section: 'courses' };
  if (pathname === '/achievements') return { page: 'dashboard', section: 'achievements' };
  if (pathname === '/settings') return { page: 'dashboard', section: 'settings' };
  if (pathname === '/ai-conversations') return { page: 'dashboard', section: 'ai-conversations' };
  return { page: 'landing', section: 'dashboard' };
}

function getPathFromRoute(page, section) {
  if (page === 'login') return '/login';
  if (page === 'signup') return '/signup';
  if (page === 'onboarding') return '/onboarding';
  if (page === 'dashboard' && section === 'lessons') return '/lessons';
  if (page === 'dashboard' && section === 'practice') return '/practice';
  if (page === 'dashboard' && section === 'courses') return '/courses';
  if (page === 'dashboard' && section === 'achievements') return '/achievements';
  if (page === 'dashboard' && section === 'settings') return '/settings';
  if (page === 'dashboard' && section === 'ai-conversations') return '/ai-conversations';
  if (page === 'dashboard') return '/dashboard';
  return '/';
}

function App() {
  const [route, setRoute] = useState(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    function onPopState() {
      setRoute(getRouteFromPath(window.location.pathname));
    }

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function navigate(page, section = 'dashboard') {
    const path = getPathFromRoute(page, section);
    window.history.pushState({}, '', path);
    setRoute({ page, section });
  }

  if (route.page === 'landing') {
    return (
      <LandingPage
        goToLogin={() => navigate('login')}
        goToSignup={() => navigate('signup')}
      />
    );
  }

  if (route.page === 'signup') {
    return (
      <SignupPage
        goToLanding={() => navigate('landing')}
        goToLogin={() => navigate('login')}
        goToOnboarding={() => navigate('onboarding')}
      />
    );
  }

  if (route.page === 'onboarding') {
    return <OnboardingPage goToAssessment={() => { window.location.href = '/assessment/assessment.html'; }} />;
  }

  if (route.page === 'dashboard') {
    return (
      <DashboardPage
        goToLanding={() => navigate('landing')}
        goToOnboarding={() => navigate('onboarding')}
        initialSection={route.section}
        onSectionChange={(nextSection) => navigate('dashboard', nextSection)}
      />
    );
  }

  return (
    <LoginPage
      goToSignup={() => navigate('signup')}
      goToDashboard={() => navigate('dashboard')}
    />
  );
}

export default App;
