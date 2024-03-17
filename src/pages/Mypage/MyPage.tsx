import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu";

const MyPage = (): JSX.Element => {

  // 로컬스토리지에서 닉네임을 가져옴
  const nickname = localStorage.getItem("nickname");
  const totalDrugs = localStorage.getItem("total_drugs");
  const oldLogs = localStorage.getItem("old_logs");
  const id = localStorage.getItem("id");

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님의
          마이페이지입니다.
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 w-full mt-4">
          <p className="font-medium mb-2 text-blue-800">
            최근 공지사항 들어갈거임
          </p>
          <p className="text-sm">자퇴 참는 법</p>
        </div>
        {/* 수평 컨테이너 시작 */}
        <div className="flex mt-4">
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <Link to={`/mypage/${id}/medication`} className="text-sm hover:underline">현재 복용 중인 약</Link>
            <p className="text-xl font-semibold text-blue-600">{totalDrugs}</p>
          </div>
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm">과거에 복용한 약</p>
            <p className="text-xl font-semibold text-blue-600">{oldLogs}</p>
          </div>
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm">작성한 리뷰</p>
            <p className="text-xl font-semibold text-blue-600">3</p>
          </div>
          
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 w-full mt-4">
          <p className="mb-4">
            <span className="font-medium text-blue-800">약쟁이</span>님은 다음과
            같은 약을 장기복용하고 있습니다.
          </p>
          <div className="flex justify-start space-x-4">
            <p className="text-sm rounded-2xl bg-blue-800 text-white font-medium text-center p-1 w-32">
              자퇴 참는 법
            </p>
            <p className="text-sm rounded-2xl bg-blue-800 text-white font-medium text-center p-1 w-32">
              자퇴 참는 법
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 w-full mt-4">
          <p className="mb-2 text-sm">
            <span className="font-medium text-blue-800">약쟁이</span>님이
            달마다 먹은 약의 개수가 궁금하실까봐 그래프로 준비해 봤어요! 🧐
          </p>
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/600x120"
              alt="그래프"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
