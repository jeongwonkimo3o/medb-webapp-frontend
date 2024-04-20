import { useEffect, useState, useRef } from "react";
import { getNotices } from "../../api/notice";
import { Notice } from "../../types/Notice";
import { Link } from "react-router-dom";

const NoticeComponent = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await getNotices(page);
        if (response && response.notices && response.notices.data.length > 0) {
          setNotices((prev) => [...prev, ...response.notices.data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("공지사항 호출 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  if (loading && notices.length === 0) {
    return <div>Loading...</div>; // Loading 컴포넌트 혹은 로딩 표시 대체
  }

  return (
    <div>
      {/* 공지사항 목록을 렌더링 */}
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
        >
          <Link to={`detail/${notice.id}`} className="text-lg font-semibold hover:underline">{notice.title}</Link>
          <p className="text-gray-500 text-sm mb-2">관리자</p>
          <div className="text-sm text-gray-500">
            {new Date(notice.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
      <div ref={loader} className="py-5 text-center">
        더 보기
      </div>
    </div>
  );
};

export default NoticeComponent;
