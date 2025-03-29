import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const reissueToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: null }> => {
  const { data } = await axios.post(`/auth/reissue`, {
    refreshToken,
  });
  return data;
};

export const TOKEN_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorCode = error.response?.data?.code;
    if (
      error.response?.status === 401 &&
      errorCode === 3002 &&
      !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }
        const { accessToken } = await reissueToken(refreshToken);
        localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return API(error.config);
      } catch (reissueError) {
        localStorage.removeItem(TOKEN_KEYS.ACCESS);
        localStorage.removeItem(TOKEN_KEYS.REFRESH);
        delete API.defaults.headers.common["Authorization"];
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
