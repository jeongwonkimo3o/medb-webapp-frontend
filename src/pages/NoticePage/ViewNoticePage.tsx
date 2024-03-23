import NoticeDetail from "../../components/Notice/NoticeDetail";
import SideMenu from "../../components/SideMenu";

const ViewNoticePage = (): JSX.Element => {
  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">공지사항 상세보기</span>
          <p className="text-sm mb-10">공지사항을 상세히 확인할 수 있습니다.</p>
          <NoticeDetail />
        </div>
      </div>
    </div>
  );
};

export default ViewNoticePage;
