// src/pages/Home.tsx
import { Link, useLocation, Outlet } from "react-router-dom";
import "../styles/effects.css";
import { TokenService } from "../services/TokenService";

const Home = () => {
  const location = useLocation();

  // 사이드바 메뉴
  const sidebarOptions = [
    {
      label: "피드",
      icon: "📝",
      to: "/feed",
    },
    {
      label: "인증",
      icon: "✅",
      to: "/certification",
    },
    {
      label: "신고",
      icon: "👮‍♀️",
      to: "/report",
      children: [
        { label: "게시글", icon: "📄", to: "/report/post" },
        { label: "댓글", icon: "💬", to: "/report/comment" },
        { label: "채팅", icon: "🪣", to: "/report/chat" },
      ],
    },
  ];

  return (
    <div className="flex w-full h-screen bg-gray-50 font-sans">
      {/* 사이드바 */}
      <aside className="min-w-64 bg-white border-r border-gray-200 p-6">
        <nav className="mt-8">
          <ul className="space-y-3">
            {sidebarOptions.map((option, idx) => (
              <li key={idx}>
                <Link
                  to={option.to}
                  className={`flex mouse-effect items-center space-x-3 p-4 rounded transition font-bold text-xl text-black ${
                    location.pathname === option.to ? "bg-rgba(0,0,0,0.1)" : ""
                  }`}
                >
                  <span role="img" aria-label={option.label}>
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </Link>

                {option.children && (
                  <ul className="ml-8 mt-2 space-y-2">
                    {option.children.map((child, cIdx) => (
                      <li key={cIdx}>
                        <Link
                          to={child.to}
                          className={`mouse-effect flex items-center space-x-3 p-3 rounded transition text-lg font-semibold text-black ${
                            location.pathname === child.to
                              ? "bg-rgba(0,0,0,0.1)"
                              : ""
                          }`}
                        >
                          <span role="img" aria-label={child.label}>
                            {child.icon}
                          </span>
                          <span>{child.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 본문 영역 (중첩 라우트 Outlet) */}
      <main className="flex flex-row  justify-center w-full ">
        <div className="bg-white w-[920px] p-18 rounded-lg shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
