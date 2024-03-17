import { Link } from "react-router-dom";
import medb_logo from "../../assets/medb_logo.png"; // 이미지 경로는 실제 이미지 경로로 변경해야 합니다.

const SideMenu = () => {
  const id = localStorage.getItem("id");

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white w-64">
      <div className="px-4 py-6">
        <img src={medb_logo} alt="로고" className="w-16 mb-10" />

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to={`/mypage/${id}`}
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              마이페이지 홈
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> 약 관리 </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    to={`/mypage/${id}/medication`}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    현재 복용 중인 약
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/mypage/${id}/oldmedication`}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    과거 복용 약
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link
              to={`/mypage/${id}/myreview`}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              작성한 리뷰
            </Link>
          </li>

          <li>
            <Link
              to={`/mypage/${id}/privacy`}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              개인 정보 변경
            </Link>
          </li>

         
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          to="/" // 로그아웃
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
