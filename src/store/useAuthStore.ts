import { create } from "zustand";
import { TokenService } from "../services/TokenService";
import API from "../repository/API";

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  checkAuth: async () => {
    const tokenExists = await TokenService.isTokenPresent();
    const accessToken = await TokenService.getAccessToken();
    if (accessToken) {
      API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    set({ isAuthenticated: tokenExists });
  },
}));
