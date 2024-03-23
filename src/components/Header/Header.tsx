import { Link } from "react-router-dom";
import Logo from "../../assets/medb_logo.png";

const Header = (): JSX.Element => {
  const token = localStorage.getItem("authToken");
  const nickname = localStorage.getItem("nickname");
  const id = localStorage.getItem("id");

  // 닉네임이 존재하지 않을 때 기본값 설정
  const displayName = nickname ? `${nickname}님` : "로그인";

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <img src={Logo} className="w-20" alt="로고" />
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {/* 링크의 텍스트를 displayName으로 설정 */}
                <Link
                  className="px-5 py-2.5 text-sm font-medium text-blue-800 hover:text-blue-400"
                  to={token ? `/mypage/${id}` : "/login"}
                >
                  {displayName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
