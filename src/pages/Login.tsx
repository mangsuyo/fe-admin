import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import AdminRepository from "../repository/AdminRepository";
import { removeNullValues, useUserStore } from "../store/useUserStore";
import { TokenService } from "../services/TokenService";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const updateUser = useUserStore((state) => state.update);

  useEffect(() => {
    checkAuth();
    console.log("CHECK!");
  }, [checkAuth]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleVerifyPhoneNumber = async () => {
    try {
      const data = await AdminRepository.checkAdmin(userId);
      setIsAdmin(data.isAdminAccount);
      if (data.isAdminAccount) {
        await AdminRepository.sendCode(userId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await AdminRepository.login({ userId, password });
      updateUser(removeNullValues(data));
      await TokenService.save(data.accessToken, data.refreshToken);
      await checkAuth();
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="min-h-screen w-7xl flex flex-row items-center justify-between ">
      <div className="w-2/3 flex flex-col justify-center items-start pl-16 pr-8">
        <h1 className="text-5xl font-extrabold mb-3">버디야</h1>
        <p className="text-lg text-gray-600 mb-10">
          유학생들에게 가장 빠르고 정확하게 공지를 전달해보세요
        </p>

        <div className="w-full max-w-[400px] space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-primary"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          {isAdmin === false && (
            <button
              onClick={handleVerifyPhoneNumber}
              className="w-full bg-black text-white rounded px-4 py-3 font-medium hover:bg-gray-800 transition mt-1"
            >
              다음
            </button>
          )}
          {isAdmin && (
            <>
              <input
                type="text"
                placeholder="비밀번호"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-indigo-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="w-full bg-black text-white rounded px-4 py-3 font-medium hover:bg-gray-800 transition"
              >
                로그인
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex w-1/3 items-center justify-center bg-white">
        <img
          src="/assets/characters.svg"
          alt="Illustration"
          className="max-w-lg h-[300px]"
        />
      </div>
    </div>
  );
};

export default Login;
