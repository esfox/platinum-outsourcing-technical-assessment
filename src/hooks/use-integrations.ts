import { useQuery } from '@tanstack/react-query';

import type { IntegrationConnection, IntegrationService } from '@/services/integrations';
import { fetchIntegrationConnections, fetchIntegrationServices } from '@/services/integrations';

type UseIntegrationsState = {
  services: IntegrationService[];
  connections: IntegrationConnection[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

export function useIntegrations(searchTerm: string, page: number, pageSize: number): UseIntegrationsState {
  const normalizedSearch = searchTerm.trim();

  const servicesQuery = useQuery<IntegrationService[], Error>({
    queryKey: ['integration-services'],
    queryFn: fetchIntegrationServices,
  });

  const connectionsQuery = useQuery<{ items: IntegrationConnection[]; total: number }, Error>({
    queryKey: ['integration-connections', normalizedSearch, page, pageSize],
    queryFn: () =>
      fetchIntegrationConnections({
        search: normalizedSearch,
        page,
        pageSize,
      }),
    placeholderData: (previous) => previous,
  });

  const error = servicesQuery.error ?? connectionsQuery.error;

  return {
    services: servicesQuery.data ?? [],
    connections: connectionsQuery.data?.items ?? [],
    total: connectionsQuery.data?.total ?? 0,
    isLoading: servicesQuery.isFetching || connectionsQuery.isFetching,
    isFetching: connectionsQuery.isFetching,
    error: error ? error.message : null,
  };
}
