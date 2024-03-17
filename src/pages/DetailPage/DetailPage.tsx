import React, { useEffect, useState } from "react";
import DrugFAQ from "../../components/DrugFAQ";
import { DrugInfo } from "../../types/Detail";
import { fetchDrugInfo } from "../../api/detail";
import nullImage from "../../assets/image_null.png";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import FloatingMenu from "../../components/FloatingMenu";
import formatDate from "../../services/formatData";
import ReviewForm from "../../components/ReviewForm";

const DetailPage = (): JSX.Element => {
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false); // 리뷰 폼 표시 여부 상태 추가
  const params = useParams();
  const itemSeq = params.item_seq;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      if (itemSeq) {
        const fetchedDrugInfo = await fetchDrugInfo(itemSeq);
        setDrugInfo(fetchedDrugInfo);
      }
      setIsLoading(false); // 데이터 로딩 완료
    };

    fetchData();
  }, [itemSeq]);

  const handleOpenReviewForm = () => {
    setIsReviewFormVisible(true);
  };

  const handleCloseReviewForm = () => {
    setIsReviewFormVisible(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8 md:p-12 lg:px-32 lg:py-16">
      <div className="mx-auto max-w-l text-center">
        <p className="mb-4">{drugInfo?.entp_name}</p>
        <h2 className="text-2xl font-medium text-blue-600 md:text-2xl">
          {drugInfo?.item_name || "약 이름이 없습니다."}
        </h2>
        <img
          src={drugInfo?.item_image || nullImage}
          alt="약 사진"
          className="w-92 h-72 mx-auto mt-8 mb-20"
        />
        <DrugFAQ title="약의 효능" content={drugInfo?.efcy_qesitm} />
        <DrugFAQ title="복용방법" content={drugInfo?.use_method_qesitm} />
        <DrugFAQ title="주의사항" content={drugInfo?.atpn_warn_qesitm} />
        <DrugFAQ title="병용금기" content={drugInfo?.intrc_qesitm} />
        <DrugFAQ title="이상반응" content={drugInfo?.se_qesitm} />
        <DrugFAQ title="보관방법" content={drugInfo?.deposit_method_qesitm} />

        <p className="text-sm mt-12 text-gray-400">
          최종 업데이트 일자{" "}
          {drugInfo?.updated_at
            ? formatDate(drugInfo.updated_at)
            : "알 수 없음"}
        </p>
      </div>
      {token != null && (
        <FloatingMenu onOpenReviewForm={handleOpenReviewForm} />
      )}

      {isReviewFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseReviewForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ReviewForm onClose={handleCloseReviewForm} />

          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
