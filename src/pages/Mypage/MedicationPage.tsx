import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Loading from "../../components/Loading/Loading"; 
import { LogWithDetails } from "../../types/MedicationLog";
import { fetchMedicationLogs, stopMedication } from "../../api/medication_log";
import formatDate from "../../services/formatData";

const MedicationPage = (): JSX.Element => {
  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("authToken");
  const [logsWithDetails, setLogsWithDetails] = useState<LogWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      try {
        const logs = await fetchMedicationLogs(token as string);
        setLogsWithDetails(logs);
      } catch (error) {
        console.error("Error fetching medication logs:", error);
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchData();
  }, []);

  const handleStopMedication = async (logId: number) => {
    // 복용중단 버튼 클릭 시 해당 약의 복용을 중단하는 로직 추가
    console.log(`Stop medication for log id: ${logId}`);
    try {
      await stopMedication(logId, token as string);
      alert("복용 중단이 정상적으로 처리되었습니다!");
      
      const updatedLogs = logsWithDetails.filter(log => log.log_id !== logId);
      setLogsWithDetails(updatedLogs);
    } catch (error) {
      console.error("Error stopping medication:", error);
      alert("복용 중단 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
    return <Loading />; // 로딩 중이면 로딩 컴포넌트 반환
  }

  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">{nickname}</span>님의
          현재 의약품 복용 정보입니다.
        </div>
        {logsWithDetails.map((log) => (
          <div
            key={log.log_id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 w-full mt-4 relative" // relative 클래스 추가
          >
            <p className="font-medium mb-2 text-blue-800">{log.drug_details.item_name}</p>
            <p className="text-sm mb-4">{log.drug_details.efcy_qesitm}</p>
            <p className="text-xs text-gray-500">복용 시작 일자: {formatDate(log.created_at)}</p>
            <button
              className="absolute bottom-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md text-sm" 
              onClick={() => handleStopMedication(log.log_id)} // handleStopMedication 함수로 변경
            >
              복용중단
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationPage;
