import React, { useEffect, useState, useRef } from "react";
import { showReviews } from "../../api/review";
import { Review, Image } from "../../types/Review";
import Loading from "../../components/Loading/Loading";
import ImageModal from "../ImageModal/ImageModal";

interface Props {
  onClose: () => void;
}

const ReviewModal = ({ onClose }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await showReviews(page);
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

    fetchReviews();
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 함수로 리뷰 등급에 따른 색상 반환
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "좋아요":
        return "text-blue-500";
      case "보통이에요":
        return "text-orange-500";
      case "별로예요":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading && reviews.length === 0) {
    return <Loading />;
  }

  return (
    <div className="review-modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50 overflow-auto">
      <div
        className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full overflow-y-auto relative"
        style={{ maxHeight: "90vh" }}
      >
        <button
          className="close-btn absolute top-4 right-4 text-gray-500 text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">리뷰 목록</h2>
        <p className="text-sm text-gray-400 mb-4">
          유저 닉네임은 익명으로 표시됩니다. 참고 바랍니다.
        </p>
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`mb-4 ${
              index < reviews.length - 1 ? "border-b border-gray-200 pb-4" : ""
            }`}
          >
            <div className="mb-2">
              {review.images.map((image: Image, imageIndex: number) => (
                <img
                  key={imageIndex}
                  src={image.image_url}
                  alt={`Review ${review.id} Image ${image.id}`}
                  className="inline-block w-20 h-20 object-cover mr-2 cursor-pointer"
                  onClick={() => handleImageClick(image.image_url)}
                />
              ))}
            </div>

            <div className="text-xs">
              <p className={`${getRatingColor(review.rating)} font-bold`}>
                {review.rating}
              </p>
              <p className="text-gray-500 mb-2">익명의 헬시</p>
            </div>
            <p className="text-gray-800 mb-2">{review.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        <div ref={loader} className="text-center py-4">
          Loading more...
        </div>
        {selectedImage && (
          <ImageModal
            imageSrc={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
