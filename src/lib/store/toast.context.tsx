"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { Toast } from "../interfaces";

interface ToastContextProps {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastContextProvider = ({ children }: {
  children: ReactNode
}) => {
  const [toast, setState] = useState<Toast | null>(null);

  const setToast = (toast: Toast | null) => {
    setState(toast);
    setTimeout(() => setState(null), 5000);
  };

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context)
    return context;

  throw new Error('useToast must be used within an ToastProvider');
};