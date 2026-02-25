import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import qs from 'query-string';
import './index.css';

const router = createRouter({
  routeTree,
  context: {},
  stringifySearch: (value) => `?${qs.stringify(value, { arrayFormat: 'none' })}`,
  parseSearch: (value) => qs.parse(value, { arrayFormat: 'none' }),
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
