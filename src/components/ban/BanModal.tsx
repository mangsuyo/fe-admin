import React, { useState } from "react";

interface BanModalProps {
  visible: boolean;
  onConfirm: (days: number, banReason: string) => void;
  onCancel: () => void;
}

const BanModal: React.FC<BanModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [banReason, setBanReason] = useState("");
  const [days, setDays] = useState<number>(1);

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
        <h2 className="text-xl font-bold mb-4">정지 사유 및 기간 입력</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-400"
          rows={5}
          placeholder="정지 사유를 입력해주세요."
          value={banReason}
          onChange={(e) => setBanReason(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            정지 기간 (일)
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setBanReason("");
              setDays(1);
              onCancel();
            }}
            className="px-4 py-2 bg-primary text-white hover:bg-[#00916A] rounded-lg "
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm(days, banReason);
              setBanReason("");
              setDays(1);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            정지 처리
          </button>
        </div>
      </div>
    </div>
  );
};

export default BanModal;
