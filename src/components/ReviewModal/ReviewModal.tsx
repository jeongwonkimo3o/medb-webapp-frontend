// ReviewModal.tsx

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getReviews } from "../../api/review";
import { Review } from "../../types/review";
import Loading from "../../components/Loading/Loading"; // 로딩 컴포넌트 추가

interface Props {
  onClose: () => void;
}

const ReviewModal = ({ onClose }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 로드할 리뷰가 있는지 추적
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [noReviews, setNoReviews] = useState(false); // 리뷰가 없는지 여부 상태 추가

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true); // 로딩 시작
      const response = await getReviews(page);
      if (response && response.reviews) {
        if (response.reviews.length > 0) {
          setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
        } else {
          setNoReviews(true); // 리뷰가 없음을 표시
        }
        // 리뷰가 더 없으면 hasMore 상태를 false로 설정
        setHasMore(response.reviews.length > 0);
      } else {
        console.error("Reviews data is missing in the response");
        setHasMore(false);
      }
      setLoading(false); // 로딩 완료
    };

    loadReviews();
  }, [page]);

  return (
    <div className="review-modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full overflow-y-auto relative"
        style={{ maxHeight: "80vh" }}
      >
        <button
          className="close-btn text-sm mb-4 text-gray-400 absolute top-4 right-4"
          onClick={onClose}
        >
          닫기
        </button>
        <p className="text-2xl font-bold text-blue-800 mb-2">리뷰 목록</p>
        <p className="text-sm text-gray-400 mb-4">
          리뷰 작성자는 익명으로 표시됩니다.
        </p>
        {loading ? ( // 로딩 중인 경우 로딩 컴포넌트 표시
          <Loading />
        ) : (
          <>
            {noReviews ? (
              <p>리뷰가 없습니다! 작성해 보시는 건 어떠신가요?</p>
            ) : (
              reviews.map((review, reviewIndex) => (
                <div
                  key={reviewIndex}
                  className={`mb-8 ${
                    reviews.length - 1 !== reviewIndex
                      ? "border-b border-gray-200 pb-4"
                      : ""
                  }`}
                >
                  {review.images.length > 0 && (
                    <Swiper
                      modules={[Navigation]}
                      navigation
                      spaceBetween={50}
                      slidesPerView={1}
                    >
                      {review.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image.image_url}
                            alt=""
                            className="h-56 w-full rounded-md object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  <div className="text-content mt-4">
                    <p className="text-sm text-blue-500">{review.rating}</p>
                    <p className="font-medium mb-4">메디비{review.id}</p>
                    <span>{review.content}</span>
                  </div>
                </div>
              ))
            )}
          </>
        )}
        <button
          className="load-more-btn text-blue-300 py-2 px-4 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          더 보기
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
