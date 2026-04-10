import { createContext, useContext } from 'react';

export const ToastContext = createContext(null);
export const useToast = () => {
  const toast = useContext(ToastContext);

  if (toast === null) {
    throw new Error('useToast must be used within a ToastContext.Provider');
  }

  return toast;
};
