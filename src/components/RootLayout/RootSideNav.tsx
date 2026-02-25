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
        <Link
          to="/settings/integrations"
          activeOptions={{ exact: false }}
          className={cn('block text-center py-3 hover:bg-accent hover:text-white')}
          activeProps={{ className: 'text-accent' }}
        >
          <i className="fa-solid fa-gear text-2xl" />
          <p className="text-xs mt-1">Settings</p>
        </Link>
      </div>
    </div>
  );
}
