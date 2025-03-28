import React from "react";
import { StudentIdCard } from "../../repository/CertificationRepository";
import { getUniversityName } from "../../constants/universities";

interface CertificationCardProps {
  card: StudentIdCard;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onImageClick?: (imageUrl: string) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  card,
  onApprove,
  onReject,
  onImageClick,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow flex items-center justify-center">
      <div className="flex-col">
        <h3 className="text-3xl font-semibold ">
          🏫 {getUniversityName(card.university)}
        </h3>
        <img
          src={card.imageUrl}
          alt="학생증"
          className="w-full mt-7 rounded-xl cursor-pointer max-h-[700px] border"
          onClick={() => onImageClick && onImageClick(card.imageUrl)}
        />
        <div>
          <div className="flex items-center mt-6 space-x-8">
            <button
              onClick={() => onApprove(card.id)}
              className="w-full h-[50px] bg-primary text-white rounded-xl hover:bg-[#00916A]"
            >
              승인
            </button>
            <button
              onClick={() => onReject(card.id)}
              className="w-full h-[50px] bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              반려
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
