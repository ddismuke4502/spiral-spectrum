import { useCallback, useEffect, useState } from 'react';
import { fetchEducationalResources } from '../services/resourcesApi';
import { EducationalResource } from '../types/resource';

export function useResources() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function hydrateResources() {
      try {
        const nextResources = await fetchEducationalResources();

        if (!isMounted) {
          return;
        }

        setResources(nextResources);
        setErrorMessage(null);
      } catch {
        if (!isMounted) {
          return;
        }

        setErrorMessage('Unable to load resources right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void hydrateResources();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshResources = useCallback(async () => {
    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const nextResources = await fetchEducationalResources();
      setResources(nextResources);
    } catch {
      setErrorMessage('Unable to refresh resources right now.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return {
    resources,
    isLoading,
    isRefreshing,
    errorMessage,
    refreshResources,
  };
}