import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showNotices, deleteNotice } from "../../api/notice";
import { Notice } from "../../types/Notice";

const NoticeDetail = () => {
  const { notice_id } = useParams();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("is_admin");
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await showNotices(Number(notice_id));
        setNotice(data.notice);
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      }
    };

    if (notice_id) fetchNotice();
  }, [notice_id]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  const goToNoticeList = () => {
    navigate("/notice");
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteNotice(Number(notice_id));
        alert("삭제되었습니다.");
        goToNoticeList();
      } catch (error) {
        console.error("공지사항 삭제 실패:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6 flex flex-col h-full relative">
      {isAdmin === "1" && (
        <div className="absolute top-6 right-6 flex">
          <Link
            to={`/notice/edit/${notice.id}`} // 수정 페이지로 이동할 때 공지사항의 id를 전달
            state={{ title: notice.title, content: notice.content }} // 수정 페이지로 공지사항의 제목과 내용을 전달
            className="bg-blue-800 text-sm text-white px-4 py-2 rounded-lg hover:bg-blue-900 mr-2"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      )}
      <h1 className="text-xl font-bold mb-4">{notice.title}</h1>
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>{new Date(notice.created_at).toLocaleString()}</span>
      </div>
      <p
        className="text-lg text-gray-800 flex-grow"
        dangerouslySetInnerHTML={{ __html: notice.content }}
      ></p>
      <button
        onClick={goToNoticeList}
        className="text-blue-800 text-sm hover:underline mt-4 self-start"
      >
        목록으로
      </button>
    </div>
  );
};

export default NoticeDetail;
