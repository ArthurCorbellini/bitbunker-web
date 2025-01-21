import { Alert } from "@/lib/interfaces";
import { ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";

export const FormAlert = ({ formState }: {
  formState: any
}) => {
  const alert: Alert = formState["_alert"];
  if (!alert) return;

  let icon;
  let className = "p-2 space-y-1 rounded-md border"
  switch (alert.severity) {
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
    <div className="p-1 w-full">
      <div className={className}>
        {alert.title ?
          <>
            <div className="flex items-center">
              {icon}
              <h2 className="font-bold">
                {alert.title}
              </h2>
            </div>
            <p className="text-sm">
              {alert.message}
            </p>
          </>
          :
          <div className="flex items-center">
            {icon}
            <p className="text-sm">
              {alert.message}
            </p>
          </div>
        }
      </div>
    </div>
  );
}