import { useEffect, useState } from 'react';
import { mockDashboardData } from '../data/mockDashboardData';

const DASHBOARD_API_URL = '/api/dashboard';
const DASHBOARD_FALLBACK_URL = '/data/dashboard.json';

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

        let payload = null;
        const requests = [DASHBOARD_API_URL, DASHBOARD_FALLBACK_URL];

        for (const url of requests) {
          try {
            const response = await fetch(url, { headers: { Accept: 'application/json' } });
            if (!response.ok) continue;
            payload = await response.json();
            break;
          } catch {
            // Try next source.
          }
        }

        if (!isMounted) {
          return;
        }

        setData(payload || mockDashboardData);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setData(mockDashboardData);
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
