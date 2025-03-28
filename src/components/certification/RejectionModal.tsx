import React, { useState } from "react";

interface RejectionModalProps {
  visible: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [reason, setReason] = useState("");

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-75 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">반려 사유 입력</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-400"
          rows={5}
          placeholder="반려 사유를 영어로 입력해주세요."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setReason("");
              onCancel();
            }}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm(reason);
              setReason("");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            반려 처리
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
