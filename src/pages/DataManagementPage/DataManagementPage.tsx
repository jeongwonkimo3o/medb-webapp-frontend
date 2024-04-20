import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import { fetchDrugUpdateProgress, startDrugUpdate } from "../../api/openApi";

const DataManagementPage = (): JSX.Element => {
  // 업데이트 최종 업데이트 일자 데이터
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

  // 업데이트 시작 함수
  const startUpdate = async () => {
    try {
      await startDrugUpdate(); // API 서비스 함수 호출
      fetchProgress(); // 최종 업데이트 일자 업데이트
    } catch (error: any) {
      console.error("업데이트 시작 에러:", error.message);
    }
  };

  const formatKST = (dateString: string) => {
    const date = new Date(dateString + 'Z'); // UTC 시간임을 명시
    return date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul"
    });
  };
  

  // 업데이트 진행 상태 가져오기
  const fetchProgress = async () => {
    try {
      const data = await fetchDrugUpdateProgress();
      if (data.lastUpdated) {
        const formattedDate = formatKST(data.lastUpdated);
        setLastUpdated(formattedDate);
      }
    } catch (error: any) {
      console.error("진행 상태 확인 에러:", error.message);
    }
  };

  useEffect(() => {
    fetchProgress(); // 컴포넌트 마운트 시 최종 업데이트 상태 확인
  }, []);

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">데이터 관리</span>
          <p className="text-sm mb-4">
            공공데이터 API에 통신하여 약품 데이터를 추가 또는 업데이트합니다.
          </p>
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm py-2 px-4 rounded"
            onClick={startUpdate}
          >
            업데이트 하기
          </button>
          {lastUpdated && (
            <p className="text-sm mt-5 text-gray-400">
              최종 업데이트 일자: {lastUpdated}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManagementPage;
