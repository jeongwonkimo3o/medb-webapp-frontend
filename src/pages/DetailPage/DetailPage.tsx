import React, { useEffect, useState } from "react";
import DrugFAQ from "../../components/DrugFAQ";
import { DrugInfo } from "../../types/Detail";
import { fetchDrugInfo } from "../../api/detail";
import nullImage from "../../assets/image_null.png";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import formatDate from "../../services/FormatData";
import FloatingMenu from "../../components/FloatingMenu"; // 추가

const DetailPage = (): JSX.Element => {
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const params = useParams();
  const itemSeq = params.item_seq;

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
      
      <FloatingMenu /> {/* 추가 */}
    </div>
  );
};

export default DetailPage;
