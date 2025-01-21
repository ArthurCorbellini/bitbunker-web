import { Alert } from "@/lib/interfaces";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export const FormAlert = ({ formState }: {
  formState: any
}) => {
  const alert: Alert = formState["_alert"];
  if (!alert) return;

  let className = "p-2 space-y-1 rounded-md border"
  switch (alert.severity) {
    case "info":
      className = `${className} bg-blue-600 border-blue-300`
      break;
    case "warning":
      className = `${className} bg-orange-600 border-orange-300`
      break;
    case "error":
      className = `${className} bg-red-600 border-red-300`
      break;
  }

  return (
    <div className="p-1 w-full">
      <div className={className}>
        {alert.title &&
          <h2 className="font-bold">
            {alert.title}
          </h2>
        }
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
          <p className="text-sm">
            {alert.message}
          </p>
        </div>
      </div>
    </div>
  );
}