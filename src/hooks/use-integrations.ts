import { useQuery } from "@tanstack/react-query"

import type { IntegrationConnection, IntegrationService } from "@/services/integrations"
import {
  fetchIntegrationConnections,
  fetchIntegrationServices,
} from "@/services/integrations"

type UseIntegrationsState = {
  services: IntegrationService[]
  connections: IntegrationConnection[]
  isLoading: boolean
  error: string | null
}

export function useIntegrations(): UseIntegrationsState {
  const servicesQuery = useQuery<IntegrationService[], Error>({
    queryKey: ["integration-services"],
    queryFn: fetchIntegrationServices,
  })

  const connectionsQuery = useQuery<IntegrationConnection[], Error>({
    queryKey: ["integration-connections"],
    queryFn: fetchIntegrationConnections,
  })

  const error = servicesQuery.error ?? connectionsQuery.error

  return {
    services: servicesQuery.data ?? [],
    connections: connectionsQuery.data ?? [],
    isLoading: servicesQuery.isLoading || connectionsQuery.isLoading,
    error: error ? error.message : null,
  }
}
