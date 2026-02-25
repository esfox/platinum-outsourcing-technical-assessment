import { SettingsLayout } from '@/components/Settings/SettingsLayout';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  );
}
