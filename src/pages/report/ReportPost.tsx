import { useEffect, useState } from "react";
import ReportRepository, {
  FeedReport,
} from "../../repository/ReportRepository";
import FullScreenImage from "../../components/common/FullScreenImage";
import BanModal from "../../components/ban/BanModal";

export default function ReportPost() {
  const [reports, setReports] = useState<FeedReport[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedStudentIdForBan, setSelectedStudentIdForBan] = useState<
    number | null
  >(null);
  const [banModalVisible, setBanModalVisible] = useState(false);

  useEffect(() => {
    ReportRepository.getReportsByType("FEED")
      .then((data) => {
        setReports(data as FeedReport[]);
      })
      .catch((error) => {
        console.error("Error fetching feed reports", error);
      });
  }, []);

  const handleDeleteReport = async (id: number) => {
    try {
      await ReportRepository.deleteReport(id);
      setReports((prev) => prev.filter((report) => report.id !== id));
      alert("신고목록에서 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting report", error);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  const openBanModal = (reportedUserId: number) => {
    setSelectedStudentIdForBan(reportedUserId);
    setBanModalVisible(true);
  };

  const closeBanModal = () => {
    setSelectedStudentIdForBan(null);
    setBanModalVisible(false);
  };

  const handleBanConfirm = async (days: number, banReason: string) => {
    if (!banReason.trim()) {
      alert("정지 사유를 입력해주세요.");
      return;
    }
    if (selectedStudentIdForBan === null) return;

    try {
      const res = await ReportRepository.banUser(
        selectedStudentIdForBan,
        days,
        banReason
      );
      // DB에서 동일 학생에 대한 신고가 여러 건 있을 수 있으므로, 해당 학생의 모든 신고 항목 삭제 처리
      const reportsToDelete = reports.filter(
        (report) => report.reportedUserId === selectedStudentIdForBan
      );
      await Promise.all(
        reportsToDelete.map((report) =>
          ReportRepository.deleteReport(report.id)
        )
      );
      setReports((prev) =>
        prev.filter(
          (report) => report.reportedUserId !== selectedStudentIdForBan
        )
      );
      alert(
        res.message ||
          `유저가 ${days}일 동안 정지되었습니다. 사유: ${banReason}`
      );
      closeBanModal();
    } catch (error) {
      console.error("Error banning user", error);
      alert("정지 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-10">
        <h1 className="text-4xl font-bold">📝</h1>
        <h1 className="text-4xl font-bold ml-3">신고된 게시글</h1>
      </div>
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{report.title}</h2>
            {/* 생성일 등 추가 정보 표시 가능 */}
          </div>
          <p className="mt-2 text-lg text-gray-700">{report.content}</p>
          <p className="mt-3 text-red-500 font-semibold">
            신고 사유 - {report.reason}
          </p>
          {report.imageUrls && report.imageUrls.length > 0 && (
            <div className="mt-4">
              <div className="flex space-x-4 overflow-x-auto">
                {report.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`신고 이미지 ${index + 1}`}
                    className="w-48 h-48 object-cover rounded cursor-pointer"
                    onClick={() => setPreviewImage(url)}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleDeleteReport(report.id)}
              className="px-4 py-2 bg-primary text-white hover:bg-[#00916A] rounded-lg"
            >
              삭제
            </button>
            <button
              onClick={() => openBanModal(report.reportedUserId)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              정지
            </button>
          </div>
        </div>
      ))}
      {previewImage && (
        <FullScreenImage
          imageUri={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
      <BanModal
        visible={banModalVisible}
        onConfirm={handleBanConfirm}
        onCancel={closeBanModal}
      />
    </div>
  );
}
