import { useEffect, useState } from 'react';
import { mockDashboardData } from '../data/mockDashboardData';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setIsLoading(true);
        setError(null);

        // Backend-ready placeholder: replace with API request later.
        await new Promise((resolve) => setTimeout(resolve, 180));

        if (!isMounted) {
          return;
        }

        setData(mockDashboardData);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error
  };
}
