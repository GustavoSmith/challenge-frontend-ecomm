import { Dialog, Transition } from "@headlessui/react";

import { Dispatch, SetStateAction, Fragment } from "react";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  children: React.ReactNode;
}

const DialogModal = ({ isOpen, setIsOpen, name, children }: DialogProps) => {
  const type = name === "Foto de producto" ? "changePic" : "changeProduct";

  const DialogIcon = () =>
    type === "changeProduct" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 18"
        fill="none"
        strokeWidth={0.25}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <circle cx="9" cy="9" r="8.57" stroke="white" strokeWidth="0.86" />
        <path
          d="M9.125 4.77881V13.9712"
          stroke="white"
          strokeWidth="0.86"
          strokeLinecap="round"
        />
        <path
          d="M13.7212 9.375L4.5288 9.375"
          stroke="white"
          strokeWidth="0.86"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 18"
        fill="none"
        strokeWidth={0.25}
        stroke="currentColor"
        className="h-5 w-8"
      >
        <circle cx="9" cy="9" r="8.57" stroke="white" strokeWidth="0.86" />
        <path
          d="M9.125 4.77881V13.9712"
          stroke="white"
          strokeWidth="0.86"
          strokeLinecap="round"
        />
        <path
          d="M13.7212 9.375L4.5288 9.375"
          stroke="white"
          strokeWidth="0.86"
          strokeLinecap="round"
        />
      </svg>
    );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
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
              <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-[0.63rem] bg-white text-left align-middle font-poppins shadow-xl transition-all">
                <div className="flex items-center justify-between bg-[#6097ff] px-3 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <DialogIcon />
                    <Dialog.Title
                      as="h3"
                      className="text-lg/[0.875rem] font-semibold"
                    >
                      {name}
                    </Dialog.Title>
                  </div>
                  <button
                    aria-label="Close modal"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 29"
                      fill="none"
                      strokeWidth={0}
                      stroke="currentColor"
                      className="h-7 w-7"
                    >
                      <circle cx="14" cy="14.5" r="14" fill="#4871BF" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.9144 8.91391C8.13335 9.69496 8.13335 10.9613 8.9144 11.7423L11.2787 14.1066L8.91459 16.4707C8.13354 17.2518 8.13354 18.5181 8.91459 19.2992C9.69564 20.0802 10.962 20.0802 11.743 19.2992L14.1071 16.9351L16.2994 19.1273C17.0804 19.9083 18.3467 19.9083 19.1278 19.1273C19.9088 18.3462 19.9088 17.0799 19.1278 16.2989L16.9355 14.1066L19.128 11.9142C19.909 11.1332 19.909 9.86683 19.128 9.08579C18.3469 8.30474 17.0806 8.30474 16.2995 9.08579L14.1071 11.2782L11.7428 8.91391C10.9618 8.13286 9.69545 8.13286 8.9144 8.91391Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-3 bg-[#ececec] p-3">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogModal;
