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

type IntegrationsEditConnectionDialogProps = {
  connection: IntegrationConnection | null;
  open: boolean;
  onClose: () => void;
};

export function IntegrationsEditConnectionDialog({ connection, open, onClose }: IntegrationsEditConnectionDialogProps) {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-white ring-10 ring-amber-400/20">
            <i className="fa-solid fa-exclamation" />
          </div>
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-2xl font-semibold">Change to Existing Connection</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Changes may disrupt functionality and impact data flow.</p>
              <p className="mt-2">
                Are you sure you want to make changes to {connection?.integrationName ?? ''} &ldquo;
                {connection?.name ?? ''}&rdquo; connection?
              </p>
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
                className="h-12 flex-1 bg-slate-900 text-base font-semibold text-white hover:bg-slate-900/90"
                onClick={onClose}
              >
                Save Changes
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
