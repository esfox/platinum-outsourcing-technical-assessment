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
import { Button } from '@/components/ui/button';
import type { IntegrationConnection } from '@/services/integrations';

type IntegrationsRemoveConnectionDialogProps = {
  connection: IntegrationConnection | null;
  open: boolean;
  onClose: () => void;
};

export function IntegrationsRemoveConnectionDialog({
  connection,
  open,
  onClose,
}: IntegrationsRemoveConnectionDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <AlertDialogContent className="p-10">
        <button
          type="button"
          onClick={onClose}
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
              Remove &ldquo;{connection?.name ?? ''}&rdquo; Connection?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {connection?.integrationName ?? ''} &ldquo;{connection?.name ?? ''}
              &rdquo; connection?
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <div className="pt-8">
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" className="h-12 flex-1 text-base font-semibold" onClick={onClose}>
                Undo
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="h-12 flex-1 bg-destructive text-base font-semibold text-white hover:bg-destructive/90"
                onClick={onClose}
              >
                Remove
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
