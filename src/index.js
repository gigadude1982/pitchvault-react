import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <RouterProvider router={router} />);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
