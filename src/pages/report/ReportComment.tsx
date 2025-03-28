import { useEffect, useState } from "react";
import ReportRepository, {
  CommentReport,
} from "../../repository/ReportRepository";
import BanModal from "../../components/ban/BanModal";

export default function ReportComent() {
  const [reports, setReports] = useState<CommentReport[]>([]);
  const [banModalVisible, setBanModalVisible] = useState(false);
  const [selectedStudentIdForBan, setSelectedStudentIdForBan] = useState<
    number | null
  >(null);

  useEffect(() => {
    ReportRepository.getReportsByType("COMMENT")
      .then((data) => {
        setReports(data as CommentReport[]);
      })
      .catch((error) => {
        console.error("Error fetching comment reports", error);
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
      // 동일 학생에 대한 신고 항목들을 모두 필터링 후 삭제 처리
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
        <h1 className="text-4xl font-bold">💬</h1>
        <h1 className="text-4xl font-bold ml-3">신고된 댓글</h1>
      </div>
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          <p className="text-2xl font-medium">{report.content}</p>
          <p className="mt-3 text-red-500 font-semibold">
            신고 사유: {report.reason}
          </p>
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
      <BanModal
        visible={banModalVisible}
        onConfirm={handleBanConfirm}
        onCancel={closeBanModal}
      />
    </div>
  );
}
