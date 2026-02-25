import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

export function RootSideNav() {
  const menuItems = [
    {
      icon: 'fa-solid fa-gauge-high',
      label: 'Insights',
    },
    {
      icon: 'fa-solid fa-inbox',
      label: 'Collect',
    },
    {
      icon: 'fa-regular fa-thumbs-up',
      label: 'Reviews',
    },
    {
      icon: 'fa-solid fa-tree',
      label: 'Carbon',
    },
    {
      icon: 'fa-regular fa-lightbulb',
      label: 'Utilities',
    },
    {
      icon: 'fa-solid fa-chart-pie',
      label: 'Reports',
    },
    {
      icon: 'fa-solid fa-clipboard-check',
      label: 'Actions',
    },
  ];

  return (
    <div className="w-17 min-h-screen overflow-y-auto grid grid-rows-[auto_1fr_auto] place-items-start gap-16 bg-sidebar-main text-white">
      <div className="mx-auto size-11 py-4">
        <img src="/images/bravegen_logo.png" alt="BraveGen" />
      </div>
      <div className="w-full h-full flex flex-col justify-center">
        {menuItems.map((item) => (
          <Link to="#" className="text-center hover:bg-[color:var(--accent)] py-3">
            <i className={cn(item.icon, 'text-2xl')} />
            <p className="text-xs mt-1">{item.label}</p>
          </Link>
        ))}
      </div>
      <div className="w-full h-full flex flex-col justify-center">
        <Link to="#" className="text-center hover:bg-[color:var(--accent)] py-3">
          <i className="fa-solid fa-gear text-2xl" />
          <p className="text-xs mt-1">Settings</p>
        </Link>
      </div>
    </div>
    // <div className="w-64 space-y-6 px-4 py-5">
    //   <AppSidebarSection
    //     title="Organisation"
    //     items={[
    //       { label: 'Manage', icon: 'fa-house' },
    //       { label: 'Users', icon: 'fa-users' },
    //       { label: 'Tags', icon: 'fa-tags' },
    //       { label: 'Integrations', icon: 'fa-plug', active: true },
    //     ]}
    //   />
    //     <AppSidebarSection
    //       title="Utilities"
    //     items={[
    //       { label: 'Configuration', icon: 'fa-gear' },
    //       { label: 'Hierarchy', icon: 'fa-sitemap' },
    //       { label: 'Assets', icon: 'fa-layer-group' },
    //     ]}
    //   />
    //       <AppSidebarSection
    //         title="Carbon"
    //         items={[
    //           { label: 'Configuration', icon: 'fa-gear' },
    //           { label: 'Hierarchy', icon: 'fa-sitemap' },
    //           { label: 'Inventory Items', icon: 'fa-boxes-stacked' },
    //           { label: 'Emission Factors', icon: 'fa-fire-flame-curved' },
    //           { label: 'Snapshots', icon: 'fa-camera' },
    //         ]}
    //       />
    //         <AppSidebarSection title="Displays" items={[{ label: 'Manage', icon: 'fa-clipboard-list' }]} />
    // </div>
  );
}
