"use client"

import { useToast } from "@/lib/store/toast-context";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export const Toast = () => {
  const { toast, setToast } = useToast();
  if (!toast) return;

  setTimeout(() => setToast(null), 5000);

  let icon;
  let className = "p-2 space-y-1 rounded-md border"
  switch (toast.severity) {
    case "success":
      icon = <><CheckCircleIcon className="w-7 mr-1" /></>
      className = `${className} bg-green-500 border-green-300`
      break;
    case "info":
      icon = <><ExclamationCircleIcon className="w-7 mr-1" /></>
      className = `${className} bg-blue-500 border-blue-300`
      break;
    case "warning":
      icon = <><ExclamationTriangleIcon className="w-7 mr-1" /></>
      className = `${className} bg-orange-500 border-orange-300`
      break;
    case "error":
      icon = <><XCircleIcon className="w-7 mr-1" /></>
      className = `${className} bg-red-500 border-red-300`
      break;
  }

  return (
    <div className="m-3 w-96 fixed right-0 bottom-0 z-50">
      <div className={className}>
        {toast.title ?
          <>
            <div className="flex items-center">
              {icon}
              <h2 className="font-bold">
                {toast.title}
              </h2>
            </div>
            <p className="text-sm">
              {toast.message}
            </p>
          </>
          :
          <div className="flex items-center">
            {icon}
            <p className="text-sm">
              {toast.message}
            </p>
          </div>
        }
        <motion.div
          className="h-1 bg-white absolute bottom-0 left-0 w-full rounded-bl-full"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }} />
      </div>
    </div>
  );
}