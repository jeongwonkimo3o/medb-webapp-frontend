import { useEffect, useState, useRef, useCallback } from "react";
import { Review, Image } from "../../types/Review";
import Loading from "../Loading/Loading";
import { deleteReview, getReviews } from "../../api/review";
import { Link } from "react-router-dom";
import ImageModal from "../ImageModal/ImageModal";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await getReviews(page);
        if (response && response.reviews && response.reviews.data.length > 0) {
          setReviews((prev) => [...prev, ...response.reviews.data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [page, loading, hasMore]);

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 리뷰 삭제
  const handleDeleteReview = useCallback(async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      alert("리뷰가 삭제되었습니다.");
      // 삭제 후 리뷰 목록을 새로고침하기 위해 페이지 상태를 초기화하거나 다시 로드
      setPage(1);
      setReviews([]);
      setHasMore(true);
    } catch (error) {
      alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  }, []); // 의존성 배열이 비어있음을 나타냄

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  if (loading && reviews.length === 0) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow overflow-hidden">
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다! 작성해 보시는 건 어떠신가요?</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                to={`/detail/${review.drug.item_seq}`}
                className="text-lg font-semibold hover:underline"
              >
                {review.drug.item_name}
              </Link>
              <div>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  삭제
                </button>
              </div>
            </div>
            <p className="text-gray-800">{review.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
            <div className="flex space-x-2 mt-2">
              {review.images.map((image: Image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={`Review ${review.id} Image ${image.id}`}
                  className="w-32 h-32 object-cover cursor-pointer"
                  onClick={() => handleImageClick(image.image_url)}
                />
              ))}
            </div>
          </div>
        ))
      )}
      <ImageModal
        imageSrc={selectedImage || ""}
        onClose={() => setSelectedImage(null)}
      />
      <div ref={loader} />
    </div>
  );
};

export default ReviewComponent;
