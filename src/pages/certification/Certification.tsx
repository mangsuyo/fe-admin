import { useEffect, useState } from "react";
import CertificationRepository, {
  StudentIdCard,
} from "../../repository/CertificationRepository";
import FullScreenImage from "../../components/common/FullScreenImage";
import RejectionModal from "../../components/certification/RejectionModal";
import CertificationCard from "../../components/certification/StudentIdCard";

export default function Certification() {
  const [cards, setCards] = useState<StudentIdCard[]>([]);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  const [selectedCardIdForRejection, setSelectedCardIdForRejection] = useState<
    number | null
  >(null);

  useEffect(() => {
    CertificationRepository.get().then((data) => {
      setCards(data);
    });
  }, []);

  const handleApprove = async (id: number) => {
    await CertificationRepository.verifyStudentIdCard({
      id,
      isApproved: true,
      rejectionReason: "",
    });
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const openRejectionModal = (id: number) => {
    setSelectedCardIdForRejection(id);
    setRejectionModalVisible(true);
  };

  const closeRejectionModal = () => {
    setSelectedCardIdForRejection(null);
    setRejectionModalVisible(false);
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!reason.trim()) {
      alert("반려 사유를 입력해주세요.");
      return;
    }
    if (selectedCardIdForRejection === null) return;
    await CertificationRepository.verifyStudentIdCard({
      id: selectedCardIdForRejection,
      isApproved: true,
      rejectionReason: reason,
    });

    alert(`반려 처리되었습니다. 사유: ${reason}`);
    setCards((prevCards) =>
      prevCards.filter((card) => card.id !== selectedCardIdForRejection)
    );
    closeRejectionModal();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-10">
        <h1 className="text-4xl font-bold">✅</h1>
        <h1 className="text-4xl font-bold ml-3">인증</h1>
      </div>
      {cards.map((card) => (
        <CertificationCard
          key={card.id}
          card={card}
          onApprove={handleApprove}
          onReject={openRejectionModal}
          onImageClick={(imageUrl) => setFullScreenImage(imageUrl)}
        />
      ))}
      {fullScreenImage && (
        <FullScreenImage
          imageUri={fullScreenImage}
          onClose={() => setFullScreenImage(null)}
        />
      )}
      <RejectionModal
        visible={rejectionModalVisible}
        onConfirm={handleRejectConfirm}
        onCancel={closeRejectionModal}
      />
    </div>
  );
}
