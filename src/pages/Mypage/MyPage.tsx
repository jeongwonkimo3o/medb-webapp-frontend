import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import { getNotices } from "../../api/notice";
import { NoticesResponse } from "../../types/Notice";

const MyPage = (): JSX.Element => {
  const [latestNotice, setLatestNotice] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const fetchLatestNotice = async () => {
      try {
        const noticesData: NoticesResponse = await getNotices(1); // 첫 번째 페이지의 공지사항 가져오기
        if (noticesData.notices.data.length > 0) {
          // 공지사항이 존재하는 경우
          const latestNoticeData = noticesData.notices.data[0]; // 첫 번째 공지사항을 가져옴
          setLatestNotice({
            title: latestNoticeData.title,
            content: latestNoticeData.content,
          });
        }
      } catch (error) {
        console.error("최신 공지사항 불러오기 실패:", error);
      }
    };

    fetchLatestNotice(); // 최신 공지사항 가져오기 함수 호출
  }, []);

  // 로컬스토리지에서 닉네임을 가져옴
  const nickname = localStorage.getItem("nickname");
  const totalDrugs = localStorage.getItem("total_drugs");
  const oldLogs = localStorage.getItem("old_logs");
  const id = localStorage.getItem("id");
  const reviews_total = localStorage.getItem("reviews_total");

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님의
          마이페이지입니다.
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 w-full mt-4">
          {latestNotice && (
            <>
              <p className="font-medium mb-2 text-blue-800">최근 공지사항</p>
              <p className="text-sm">{latestNotice.title}</p>
              <p className="text-sm">{latestNotice.content}</p>
            </>
          )}
        </div>
        {/* 수평 컨테이너 시작 */}
        <div className="flex mt-4">
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <Link
              to={`/mypage/${id}/medication`}
              className="text-sm hover:underline"
            >
              현재 복용 중인 약
            </Link>
            <p className="text-xl font-semibold text-blue-600">{totalDrugs}</p>
          </div>
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm">과거에 복용한 약</p>
            <p className="text-xl font-semibold text-blue-600">{oldLogs}</p>
          </div>
          <div className="flex-1 mx-1 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm">작성한 리뷰</p>
            <p className="text-xl font-semibold text-blue-600">
              {reviews_total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
