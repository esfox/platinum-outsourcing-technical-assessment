import { IntegrationsConnectionsTable } from '@/components/Settings/Integrations/IntegrationsConnectionsTable';
import { IntegrationsEditConnectionDialog } from '@/components/Settings/Integrations/IntegrationsEditConnectionDialog';
import { IntegrationsRemoveConnectionDialog } from '@/components/Settings/Integrations/IntegrationsRemoveConnectionDialog';
import { IntegrationsServicesSection } from '@/components/Settings/Integrations/IntegrationsServicesSection';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useIntegrations } from '@/hooks/use-integrations';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/settings/integrations')({
  validateSearch: (search) => {
    const rawPage = search.page;
    const pageNumber =
      typeof rawPage === 'number' ? rawPage : typeof rawPage === 'string' ? Number.parseInt(rawPage, 10) : 1;
    const rawQuery = search.q;

    return {
      page: Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1,
      q: typeof rawQuery === 'string' ? rawQuery : '',
    };
  },
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const itemsPerPage = 10;
  const navigate = Route.useNavigate();
  const { page, q } = Route.useSearch();
  type SearchParams = ReturnType<typeof Route.useSearch>;
  const searchTerm = q ?? '';
  const currentPage = page ?? 1;
  const debouncedSearch = useDebouncedValue(searchTerm, 500);
  const { services, connections, isLoading, total } = useIntegrations(debouncedSearch, currentPage, itemsPerPage);
  const [editTarget, setEditTarget] = useState<(typeof connections)[number] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<(typeof connections)[number] | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const pageItems = connections;

  useEffect(() => {
    if (!isLoading && currentPage > totalPages) {
      navigate({
        search: (prev: SearchParams) => ({ ...prev, page: totalPages }),
        replace: true,
      });
    }
  }, [currentPage, isLoading, navigate, totalPages]);

  const handleEditClick = (connection: (typeof connections)[number]) => {
    setEditTarget(connection);
  };

  const handleDeleteClick = (connection: (typeof connections)[number]) => {
    setDeleteTarget(connection);
  };

  const handleCloseEditDialog = () => {
    setEditTarget(null);
  };

  const handleCloseDialog = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <section className="space-y-1">
        <h2 className="text-xl font-semibold">Choose a Service to Connect</h2>
        <p className="text-sm text-muted-foreground mt-2">Connect BraveGen to other tools you use.</p>
      </section>
      <IntegrationsServicesSection services={services} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Existing Connections</h3>
        </div>
      <IntegrationsConnectionsTable
        connections={pageItems}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchTermChange={(value) =>
          navigate({
            search: (prev: SearchParams) => ({ ...prev, q: value, page: 1 }),
          })
        }
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(nextPage) =>
          navigate({
            search: (prev: SearchParams) => ({ ...prev, page: nextPage }),
          })
        }
      />
      </section>
      <IntegrationsEditConnectionDialog
        connection={editTarget}
        open={Boolean(editTarget)}
        onClose={handleCloseEditDialog}
      />
      <IntegrationsRemoveConnectionDialog
        connection={deleteTarget}
        open={Boolean(deleteTarget)}
        onClose={handleCloseDialog}
      />
    </>
  );
}
