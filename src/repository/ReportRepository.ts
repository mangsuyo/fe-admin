import API from "./API";

export type ReportType = "FEED" | "COMMENT" | "CHATROOM";

export interface FeedReport {
  id: number;
  type: "FEED";
  reportedId: null;
  reportUserId: number;
  reportedUserId: number;
  title: string;
  content: string;
  reason: string;
  imageUrls: string[] | null;
}

export interface CommentReport {
  id: number;
  type: "COMMENT";
  reportedId: null;
  reportUserId: number;
  reportedUserId: number;
  title: null;
  content: string;
  reason: string;
  imageUrls: null;
}

export interface ChatroomReport {
  id: number;
  type: "CHATROOM";
  reportedId: number;
  reportUserId: number;
  reportedUserId: number;
  title: null;
  content: null;
  reason: string;
  imageUrls: null;
}

export type Report = FeedReport | CommentReport | ChatroomReport;

class ReportRepository {
  async getReportsByType(type: ReportType): Promise<Report[]> {
    const { data } = await API.get(`/admin/reports/${type}`);
    return data;
  }

  async deleteReport(reportId: number): Promise<void> {
    await API.delete(`/admin/reports/${reportId}`);
  }

  async banUser(
    studentId: number,
    days: number,
    banReason: string
  ): Promise<{ message: string }> {
    console.log(studentId, days, banReason);
    const { data } = await API.patch(`/admin/ban/${studentId}/activate`, {
      days,
      banReason,
    });
    return data;
  }
}

export default new ReportRepository();
