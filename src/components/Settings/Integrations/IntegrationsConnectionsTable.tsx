import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { IntegrationConnection } from '@/services/integrations';

type IntegrationsConnectionsTableProps = {
  connections: IntegrationConnection[];
  isLoading: boolean;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onEdit: (connection: IntegrationConnection) => void;
  onDelete: (connection: IntegrationConnection) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function IntegrationsConnectionsTable({
  connections,
  isLoading,
  searchTerm,
  onSearchTermChange,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}: IntegrationsConnectionsTableProps) {
  const getPageItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: Array<number | 'ellipsis'> = [];
    const lastPage = totalPages;

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5, 'ellipsis', lastPage);
      return pages;
    }

    if (currentPage >= totalPages - 2) {
      pages.push(1, 'ellipsis', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
      return pages;
    }

    pages.push(
      1,
      'ellipsis',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      'ellipsis',
      lastPage,
    );

    return pages;
  };

  const paginationItems = getPageItems();
  return (
    <>
      <div className="relative max-w-xs">
        <i className="fa-solid fa-magnifying-glass absolute left-2 top-[50%] -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Integration or Name"
          className="bg-white pl-9 h-10"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-normal"> </TableHead>
              <TableHead className="font-normal">Integration</TableHead>
              <TableHead className="font-normal">Name</TableHead>
              <TableHead className="font-normal">Source</TableHead>
              <TableHead className="font-normal">Entity/Group</TableHead>
              <TableHead className="font-normal">Interval</TableHead>
              <TableHead className="font-normal">Connector URL</TableHead>
              <TableHead className="font-normal">Instructions</TableHead>
              <TableHead className="font-normal text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-3">
                    <Spinner className="h-5 w-5" />
                    <span>Loading connections...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : connections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              connections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell className="min-w-14 !pl-3 !pr-0">
                    <img
                      src={connection.integrationLogo}
                      alt={`${connection.integrationName} logo`}
                      className="size-8 object-contain"
                    />
                  </TableCell>
                  <TableCell className="max-w-32">
                    <div className="flex">
                      <span className="truncate">{connection.integrationName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-30 text-teal">
                    <div className="flex">
                      <span className="truncate">{connection.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        connection.source === 'Carbon'
                          ? 'border-badge-carbon-border bg-badge-carbon-background text-badge-carbon-foreground'
                          : 'border-badge-utility-border bg-badge-utility-background text-badge-utility-foreground'
                      }
                    >
                      {connection.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-50">
                    <div className="flex">
                      <span className="font-medium truncate">{connection.entityGroup}</span>
                    </div>
                  </TableCell>
                  <TableCell>{connection.interval}</TableCell>
                  <TableCell>
                    <Button variant="link" className="text-teal h-auto underline p-0">
                      Copy to Clipboard
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-teal h-auto border-b-1 border-teal rounded-none p-0 gap-1">
                      View
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="text-muted-foreground"
                        onClick={() => onEdit(connection)}
                      >
                        <i className="fa-solid fa-pen" />
                      </Button>
                      <Button variant="destructive" size="icon-sm" onClick={() => onDelete(connection)}>
                        <i className="fa-solid fa-trash" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Separator />
        <div className="flex justify-center gap-8 px-4 py-3 text-muted-foreground">
          <Button
            variant="outline"
            className="text-foreground gap-1 font-semibold"
            disabled={isLoading || currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <i className="fa-solid fa-arrow-left text-xs mt-0.5"></i>
            Previous
          </Button>

          <div className="flex items-center gap-2 text-muted-foreground">
            {paginationItems.map((item, index) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${index}`}>...</span>
              ) : (
                <Button
                  key={item}
                  variant={item === currentPage ? 'secondary' : 'ghost'}
                  size="icon-sm"
                  disabled={isLoading}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </Button>
              ),
            )}
          </div>
          <Button
            variant="outline"
            className="text-foreground gap-1 font-semibold"
            disabled={isLoading || currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            Next
            <i className="fa-solid fa-arrow-right text-xs mt-0.5"></i>
          </Button>
        </div>
      </div>
    </>
  );
}
