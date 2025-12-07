// src/components/DeleteConfirmModal.jsx
import React from "react";

const DeleteConfirmModal = ({ show, onClose, onConfirm, productName }) => {
  if (!show) return null; // hide if not active

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50
                 bg-black/35 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] sm:w-[500px]
                   text-center transform transition-all duration-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-600">{productName}</span>?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
