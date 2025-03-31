import { UserState } from "../store/useUserStore";
import API from "./API";

class AdminRepository {
  async checkAdmin(userId: string): Promise<{ isAdminAccount: boolean }> {
    const { data } = await API.post("/phone-auth/check-admin-account", {
      phoneNumber: userId,
    });
    return data;
  }

  async sendCode(userId: string) {
    const { data } = await API.post("/phone-auth/send-code", {
      phoneNumber: userId,
    });
    return data;
  }

  async login({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): Promise<UserState> {
    const { data } = await API.post("/phone-auth/verify-code", {
      phoneNumber: userId,
      code: password,
    });
    return data;
  }
}

export default new AdminRepository();
