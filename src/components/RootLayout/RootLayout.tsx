import * as React from 'react';

import { RootSideNav } from './RootSideNav';

type RootLayoutProps = {
  children: React.ReactNode;
};

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30 text-foreground">
      <aside className="flex sticky top-0 h-screen border-r bg-background">
        <RootSideNav />
      </aside>
      {children}
    </div>
  );
}
