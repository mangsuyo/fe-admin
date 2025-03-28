import API from "./API";

export interface StudentIdCard {
  id: number;
  userId: number;
  imageUrl: string;
  university: string;
}

class CertificationRepository {
  async get(): Promise<StudentIdCard[]> {
    const { data } = await API.get("/admin/student-id-cards");
    return data;
  }
  async verifyStudentIdCard({
    id,
    isApproved,
    rejectionReason,
  }: {
    id: number;
    isApproved: boolean;
    rejectionReason: string;
  }): Promise<{ message: string }> {
    const { data } = await API.post("/admin/student-id-cards/verify", {
      id,
      isApproved,
      rejectionReason,
    });
    return data;
  }
}

export default new CertificationRepository();
