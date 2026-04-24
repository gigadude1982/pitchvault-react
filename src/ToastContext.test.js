import { renderHook } from '@testing-library/react';
import React from 'react';
import { ToastContext, useToast } from './ToastContext';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test('useToast returns the context value when inside a provider', () => {
  const mockShowToast = jest.fn();
  const wrapper = ({ children }) => (
    <ToastContext.Provider value={mockShowToast}>{children}</ToastContext.Provider>
  );

  const { result } = renderHook(() => useToast(), { wrapper });

  expect(result.current).toBe(mockShowToast);
});

test('useToast throws when used outside a provider', () => {
  expect(() => renderHook(() => useToast())).toThrow(
    'useToast must be used within a ToastContext.Provider'
  );
});
