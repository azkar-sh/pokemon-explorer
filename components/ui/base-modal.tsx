import { Dialog, Transition } from "@headlessui/react";
import { Fragment, JSX } from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  children?: JSX.Element | JSX.Element[] | string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const BaseModal = ({ isOpen, closeModal, children, size = "md" }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                  size === "sm" && "max-w-sm",
                  size === "md" && "max-w-md",
                  size === "lg" && "max-w-lg",
                  size === "xl" && "max-w-xl",
                  size === "2xl" && "max-w-2xl",
                  size === "3xl" && "max-w-3xl"
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BaseModal;
