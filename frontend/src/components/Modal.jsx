import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#efebe9]/40">
          {/* Overlay background */}
          <div className="absolute inset-0" onClick={onClose}></div>

          {/* Modal content */}
          <div className="relative bg-[#d7ccc8]  w-[90%] max-w-md p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-black text-xl font-bold "
            >
              ×
            </button>

            {/* Modal inner content */}
            <div className="mt-2">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
