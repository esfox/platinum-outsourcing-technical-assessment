import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMemo, useState } from 'react';

export function SettingsTopBar() {
  const userInitials = 'JA';
  const [query, setQuery] = useState('');

  const tenants = [
    { code: 'AL', name: 'Adhesif Labels Ltd' },
    { code: 'AS', name: 'AIA Services New Zealand Limited' },
    { code: 'AN', name: 'Air New Zealand Ltd' },
    { code: 'AB', name: 'All Blacks Organization' },
    { code: 'AH', name: 'All Hands Demo Limited' },
  ];

  const filteredTenants = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return tenants;
    }
    return tenants.filter((tenant) => {
      return tenant.name.toLowerCase().includes(search) || tenant.code.toLowerCase().includes(search);
    });
  }, [query, tenants]);

  return (
    <header className="sticky top-0 grid grid-cols-[auto_1fr_auto] h-16 items-center border-b-2 bg-white">
      <div className="w-64 ps-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between text-sm font-light">
              ABC Group Ltd
              <i className="fa-regular fa-circle-down" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 p-0">
            <ul className="py-2">
              {['Help & Guides', 'Terms of Use', 'Privacy Policy'].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer flex w-full items-center px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t bg-background px-3 py-2">
              <div className="relative">
                <Input
                  placeholder="Type to filter..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="bg-white pr-8"
                />
                <i className="fa-solid fa-magnifying-glass pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <ul className="border-t py-2">
              {filteredTenants.length === 0 ? (
                <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
              ) : (
                filteredTenants.map((tenant) => (
                  <li
                    key={tenant.code}
                    className="flex w-full min-w-0 items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-muted hover:text-blue cursor-pointer"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-blue text-xs font-semibold text-white">
                      {tenant.code}
                    </div>
                    <span className="flex-1 truncate">{tenant.name}</span>
                  </li>
                ))
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2 text-lg font-semibold px-6">
        <i className="fa-regular fa-clone fa-flip-horizontal text-xl" />
        Integrations
      </div>
      <div className="flex items-center gap-4 px-10">
        <Button variant="secondary" size="icon" className="rounded-full" aria-label="Search">
          <i className="fa-solid fa-magnifying-glass fa-lg" />
        </Button>
        <div className="relative">
          <Button variant="secondary" size="icon" className="rounded-full" aria-label="Search">
            <i className="fa-regular fa-bell fa-lg" />
          </Button>
          <p className="absolute -right-1 top-0 size-4 grid place-items-center rounded-full bg-red-500 text-[13px] leading-[16px] font-semibold text-white pb-1">
            3
          </p>
        </div>
        <Button variant="secondary" size="icon" className="rounded-full" aria-label="Search">
          <i className="fa-solid fa-question" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue hover:bg-blue/90" size="icon" aria-label="User menu">
              {userInitials}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
