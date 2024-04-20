import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import SideMenu from "../../components/SideMenu";
import { LogWithDetails } from "../../types/MedicationLog";
import { getOldMedicationLogs, reuseMedication } from "../../api/medicationLog";
import formatDate from "../../services/formatData";

const OldMedicationPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [logsWithDetails, setLogsWithDetails] = useState<LogWithDetails[]>([]);
  const [reloadPage, setReloadPage] = useState(false); // 페이지 다시 로드 여부를 관리하는 상태 추가
  const token = localStorage.getItem("authToken");
  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchOldMedicationLogs = async () => {
      try {
        const logs = await getOldMedicationLogs(token as string);
        setLogsWithDetails(logs);
        setIsLoading(false);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setIsLoading(false);
      }
    };

    fetchOldMedicationLogs();
  }, [reloadPage]); // reloadPage 상태가 변경될 때마다 useEffect가 실행되도록 설정

  const handleReuseMedication = async (logId: number) => {
    try {
      await reuseMedication(logId, token as string); // API를 통해 복용 재개 요청
      alert("복용이 재개되었습니다."); // 성공 시 알림 표시
      setReloadPage(!reloadPage); // 페이지를 다시 로드하기 위해 reloadPage 상태를 변경
    } catch (error) {
      console.error("복용 재개 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님의
          과거 의약품 복용 정보입니다.
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          logsWithDetails.map((log) => (
            <div
              key={log.log_id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 w-full mt-4 relative"
            >
              <p className="font-medium mb-2 text-blue-800">
                {log.drug_details.item_name}
              </p>
              <p className="text-sm mb-4">{log.drug_details.efcy_qesitm}</p>
              <p className="text-xs text-gray-500">
                복용 시작 일자: {formatDate(log.created_at)}
              </p>
              <button
                className="absolute bottom-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm"
                onClick={() => handleReuseMedication(log.log_id)} // 재복용 핸들러 추가
              >
                재복용
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OldMedicationPage;
