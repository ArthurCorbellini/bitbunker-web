import { MouseEventHandler, ReactNode } from "react";

const PrimaryButton = ({ type, onClick, addClassName, children }: {
  type?: "button" | "submit" | "reset" | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>,
  addClassName?: string,
  children: ReactNode
}) => {
  const className = `p-1 w-full ${addClassName}`;
  return (
    <div className={className}>
      <button type={type} onClick={onClick} className={"w-full py-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition"}>
        {children}
      </button>
    </div>
  );
}

const RoundedButton = ({ addClassName, onClick, children }: {
  addClassName?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode
}) => {
  const className = `p-2 bg-gray-700 rounded-full hover:bg-blue-700 transition ${addClassName}`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export {
  PrimaryButton,
  RoundedButton
};

