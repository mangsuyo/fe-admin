// src/routes/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// 실제 페이지 컴포넌트 import
import Feed from "../pages/feed/Feed";
import Certification from "../pages/certification/Certification";
import Report from "../pages/report/Report";
import ReportPost from "../pages/report/ReportPost";
import ReportComent from "../pages/report/ReportComent";
import ReportChat from "../pages/report/ReportChat";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 라우트 */}
        <Route path="/login" element={<Login />} />

        {/* 홈 (ProtectedRoute) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* 중첩 라우트: /feed, /certification, /report 등 */}
          <Route path="feed" element={<Feed />} />
          <Route path="certification" element={<Certification />} />
          <Route path="report" element={<Report />}>
            <Route path="post" element={<ReportPost />} />
            <Route path="comment" element={<ReportComent />} />
            <Route path="chat" element={<ReportChat />} />
          </Route>

          {/* 기본 라우트(/) 접근 시 /feed로 이동하거나, Feed 페이지 표시 가능 */}
          <Route index element={<Feed />} />
        </Route>

        {/* 404 처리 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
