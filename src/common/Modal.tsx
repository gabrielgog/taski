import React from "react";
import Image from "next/image";
import CloseIcon from "../../public/icons/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-md relative min-h-60 min-w-90">
              <button
                onClick={onClose}
                className="text-gray-600 absolute top-0 right-0 p-2"
              >
                <Image
                  src={CloseIcon.src}
                  alt="close-icon"
                  width={20}
                  height={20}
                />
              </button>
              <div className="p-4 ">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
