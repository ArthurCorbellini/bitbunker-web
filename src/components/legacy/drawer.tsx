import { useRouter } from "@/i18n/routing";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import { RoundedButton } from "./button";

const Drawer = ({ title, description, onCloseRoute, children, footer }: {
  title: string;
  description?: string;
  onCloseRoute: string;
  children: ReactNode;
  footer: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape")
        closeDrawer();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown) };
  }, [router]);

  const closeDrawer = () => {
    setIsOpen(false);
    router.push(onCloseRoute);
  }

  return (
    <div className="text-left">
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        onClick={() => closeDrawer()} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed p-3 top-0 right-0 h-full w-1/4 z-50 bg-background border border-gray-800">
        <RoundedButton addClassName="absolute right-4 top-4" onClick={() => closeDrawer()}>
          <ChevronDoubleRightIcon className="h-5 w-5" />
        </RoundedButton>
        <div className="p-1 pb-2">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>
          <p className="text-sm">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap">
          {children}
        </div>
        <div className="flex flex-wrap mt-6">
          {footer}
        </div>
      </motion.div>
    </div>
  );
}

export default Drawer;