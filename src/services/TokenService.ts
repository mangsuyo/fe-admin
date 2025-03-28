import API from "../repository/API";

export const TOKEN_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
};

export const TokenService = {
  async getAccessToken(): Promise<string | null> {
    const token = API.defaults.headers.common["Authorization"];
    if (typeof token === "string") {
      return token.replace("Bearer ", "");
    }
    return localStorage.getItem(TOKEN_KEYS.ACCESS);
  },

  async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem(TOKEN_KEYS.REFRESH);
  },

  async setAccessToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },

  async save(
    accessToken: string | undefined,
    refreshToken: string | undefined
  ) {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken || "#");
    API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    if (refreshToken) {
      localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
    }
  },

  async remove() {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
    delete API.defaults.headers.common["Authorization"];
  },

  async isTokenPresent(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();
    return !!(accessToken && refreshToken);
  },
};
