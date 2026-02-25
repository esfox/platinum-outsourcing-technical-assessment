import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIntegrations } from '@/hooks/use-integrations';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/settings/integrations')({
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const { services, connections } = useIntegrations();
  const [editTarget, setEditTarget] = useState<(typeof connections)[number] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<(typeof connections)[number] | null>(null);

  const totalPages = Math.max(1, Math.ceil(connections.length / itemsPerPage));
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems = connections.slice(startIndex, startIndex + itemsPerPage);

  const getPageItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: Array<number | 'ellipsis'> = [];
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    pages.push(1);
    if (left > 2) {
      pages.push('ellipsis');
    }
    for (let current = left; current <= right; current += 1) {
      pages.push(current);
    }
    if (right < totalPages - 1) {
      pages.push('ellipsis');
    }
    pages.push(totalPages);

    return pages;
  };

  useEffect(() => {
    setPage(1);
  }, [connections.length]);

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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex h-full flex-col">
            <CardHeader className="flex-row items-center gap-2 p-2">
              <div className="flex size-13 items-center justify-center p-1">
                <img src={service.logo} alt={`${service.name} logo`} className="h-full w-full object-contain" />
              </div>
              <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">{service.description}</CardContent>
            <CardFooter className="mt-auto">
              <Button size="sm" className="text-sm h-7 rounded">
                Add Connection
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Existing Connections</h3>
        </div>
        <div className="relative max-w-xs">
          <i className="fa-solid fa-magnifying-glass absolute left-2 top-[50%] -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Integration or Name" className="bg-white pl-9 h-10" />
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
              {pageItems.map((connection) => (
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
                        onClick={() => handleEditClick(connection)}
                      >
                        <i className="fa-solid fa-pen" />
                      </Button>
                      <Button variant="destructive" size="icon-sm" onClick={() => handleDeleteClick(connection)}>
                        <i className="fa-solid fa-trash" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator />
          <div className="flex justify-center gap-8 px-4 py-3 text-muted-foreground">
            <Button
              variant="outline"
              className="text-foreground gap-1 font-semibold"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              <i className="fa-solid fa-arrow-left text-xs mt-0.5"></i>
              Previous
            </Button>

            <div className="flex items-center gap-2 text-muted-foreground">
              {getPageItems().map((item, index) =>
                item === 'ellipsis' ? (
                  <span key={`ellipsis-${index}`}>...</span>
                ) : (
                  <Button
                    key={item}
                    variant={item === page ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </Button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              className="text-foreground gap-1 font-semibold"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
              <i className="fa-solid fa-arrow-right text-xs mt-0.5"></i>
            </Button>
          </div>
        </div>
      </section>

      <AlertDialog
        open={Boolean(editTarget)}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseEditDialog();
          }
        }}
      >
        <AlertDialogContent className="p-10">
          <button
            type="button"
            onClick={handleCloseEditDialog}
            className="absolute right-5 top-5 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
          <div className="grid gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-white ring-10 ring-amber-400/20">
              <i className="fa-solid fa-exclamation" />
            </div>
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-2xl font-semibold">Change to Existing Connection</AlertDialogTitle>
              <AlertDialogDescription>
                <p>Changes may disrupt functionality and impact data flow.</p>
                <p className="mt-2">
                  Are you sure you want to make changes to {editTarget?.integrationName ?? ''} &ldquo;
                  {editTarget?.name ?? ''}&rdquo; connection?
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="pt-8">
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  className="h-12 flex-1 text-base font-semibold"
                  onClick={handleCloseEditDialog}
                >
                  Undo
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="h-12 flex-1 bg-slate-900 text-base font-semibold text-white hover:bg-slate-900/90"
                  onClick={handleCloseEditDialog}
                >
                  Save Changes
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
        }}
      >
        <AlertDialogContent className="p-10">
          <button
            type="button"
            onClick={handleCloseDialog}
            className="absolute right-5 top-5 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
          <div className="grid gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-white ring-10 ring-destructive/10">
              <i className="fa-solid fa-xmark" />
            </div>
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-2xl font-semibold">
                Remove &ldquo;{deleteTarget?.name ?? ''}&rdquo; Connection?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {deleteTarget?.integrationName ?? ''} &ldquo;{deleteTarget?.name ?? ''}
                &rdquo; connection?
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="pt-8">
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline" className="h-12 flex-1 text-base font-semibold" onClick={handleCloseDialog}>
                  Undo
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="h-12 flex-1 bg-destructive text-base font-semibold text-white hover:bg-destructive/90"
                  onClick={handleCloseDialog}
                >
                  Remove
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
