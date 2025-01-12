import { XMarkIcon } from "@heroicons/react/20/solid";
import { MouseEventHandler, ReactNode } from "react";

import { RoundedButton } from "./button";

const Modal = ({ open, closeHandler, children }: {
  open: boolean,
  closeHandler: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode
}) => {
  return (
    <>
      {open && (
        <div>
          <div className="fixed inset-0 bg-black/80 z-50" />
          <div className="fixed p-3 left-[50%] top-[50%] z-50 w-11/12 md:w-2/3 lg:w-2/3 translate-x-[-50%] translate-y-[-50%] bg-background border rounded border-gray-800">
            <RoundedButton addClassName="absolute right-4 top-4" onClick={closeHandler}>
              <XMarkIcon className="h-5 w-5" />
            </RoundedButton>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

const ModalHeader = ({ title, description }: {
  title: string,
  description?: string,
}) => {
  return (
    <div className="m-1 mb-6">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
      <p className="text-sm">
        {description}
      </p>
    </div>
  );
}

const ModalBody = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div className="flex flex-wrap">
      {children}
    </div>
  );
}

const ModalFooter = ({ children }: {
  children: ReactNode
}) => {
  return (
    <div className="flex flex-wrap mt-6">
      {children}
    </div>
  );
}

export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
};

