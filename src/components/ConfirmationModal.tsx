import DialogModal from "./DialogModal";
import { Dispatch, SetStateAction } from "react";

type ConfirmationModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  message: string;
  confirmButtonText: string;
  handleConfirm: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  setIsOpen,
  name,
  message,
  confirmButtonText,
  handleConfirm,
}) => (
  <DialogModal isOpen={isOpen} setIsOpen={setIsOpen} name={name}>
    <>
      <p className="my-8 px-16 text-center text-xl md:my-16 md:px-32">
        {message}
      </p>

      <div className="flex gap-3 max-[1129px]:flex-col min-[1130px]:ml-auto min-[1130px]:flex-row-reverse">
        <button
          onClick={handleConfirm}
          className="h-10 rounded-[0.25rem] bg-[#6097ff] font-bold text-white min-[1130px]:w-[12.625rem]"
        >
          {confirmButtonText}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="h-10 rounded-[0.25rem] border border-[#6097ff] font-bold text-[#6097ff] min-[1130px]:w-[12.625rem]"
        >
          Cancelar
        </button>
      </div>
    </>
  </DialogModal>
);

export default ConfirmationModal;
