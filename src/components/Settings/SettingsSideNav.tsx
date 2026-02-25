import { cn } from '@/lib/utils';

type SettingsSideNavSectionItem = {
  label: string;
  icon: string;
  active?: boolean;
  disabled?: boolean;
};

type SettingsSideNavSectionProps = {
  title: string;
  items: SettingsSideNavSectionItem[];
};

function SettingsSideNavSection({ title, items }: SettingsSideNavSectionProps) {
  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-muted-foreground">{title}</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.label}
            className={cn(
              'flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer font-semibold',
              item.active ? 'bg-accent text-white' : 'hover:bg-background-hover ',
              item.disabled && 'pointer-events-none opacity-50',
            )}
          >
            <i
              className={cn(
                'text-[color:var(--accent)] text-xl',
                item.icon,
                item.active ? 'text-white' : 'text-accent',
                item.disabled ? 'text-muted-foreground' : '',
              )}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SettingsSideNav() {
  return (
    <div className="sticky top-0 h-full space-y-6 px-4 py-5">
      <SettingsSideNavSection
        title="Organisation"
        items={[
          { label: 'Manage', icon: 'fa-regular fa-house' },
          { label: 'Users', icon: 'fa-solid fa-users' },
          { label: 'Tags', icon: 'fa-solid fa-tags' },
          { label: 'Integrations', icon: 'fa-regular fa-clone fa-flip-horizontal', active: true },
        ]}
      />
      <SettingsSideNavSection
        title="Utilities"
        items={[
          { label: 'Configuration', icon: 'fa-solid fa-gear' },
          { label: 'Hierarchy', icon: 'fa-solid fa-sitemap' },
          { label: 'Assets', icon: 'fa-solid fa-city' },
        ]}
      />
      <SettingsSideNavSection
        title="Carbon"
        items={[
          { label: 'Configuration', icon: 'fa-solid fa-gear' },
          { label: 'Hierarchy', icon: 'fa-solid fa-sitemap' },
          { label: 'Inventory Items', icon: 'fa-solid fa-table-list' },
          { label: 'Emission Factors', icon: 'fa-regular fa-cloud' },
          { label: 'Snapshots', icon: 'fa-regular fa-camera', disabled: true },
        ]}
      />
      <SettingsSideNavSection
        title="Displays"
        items={[
          {
            label: 'Manage',
            icon: 'fa-solid fa-display',
          },
        ]}
      />
    </div>
  );
}
