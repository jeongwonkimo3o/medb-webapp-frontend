import { Link } from "react-router-dom";
import NoticeTable from "../../components/Notice/NoticeTable";
import SideMenu from "../../components/SideMenu";

const NoticePage = (): JSX.Element => {
  const isAdmin = localStorage.getItem("is_admin");
  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">공지사항 </span>
          <p className="text-sm mb-4">공지사항을 확인 및 작성할 수 있습니다.</p>

          {isAdmin === "1" && (
            <Link to="/notice/write">
            <button className="bg-blue-800 text-white px-2 py-2 text-sm rounded-lg hover:bg-blue-900 mb-10">
              공지작성
            </button>
            </Link>
          )}
          <NoticeTable />
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
