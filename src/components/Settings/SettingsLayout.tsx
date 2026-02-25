import { SettingsSideNav } from './SettingsSideNav';
import { SettingsTopBar } from './SettingsTopBar';

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden w-full">
      <SettingsTopBar />
      <div className="grid grid-cols-[256px_1fr] overflow-auto">
        <SettingsSideNav />
        <main className="flex-1 space-y-8 px-6 py-6 h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
