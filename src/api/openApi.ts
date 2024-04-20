import { API } from "../utils/constants/BaseApi"; // API 인스턴스 가져오기
import { getAuthToken } from "../utils/constants/getAuthToken";

const token = getAuthToken();

// 데이터 업데이트를 시작하는 API 호출
export const startDrugUpdate = async (): Promise<void> => {
  try {
    const response = await API.get("/fetch-store-drugs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }); // API 인스턴스를 사용하여 엔드포인트 호출
    console.log(response.data);
  } catch (error: any) {
    console.error("업데이트 시작 실패:", error.response.data.message);
    throw new Error(
      error.response.data.message || "업데이트 시작에 실패하였습니다."
    );
  }
};

// 진행 상태를 가져오는 API 호출
export const fetchDrugUpdateProgress = async (): Promise<{
  progress: number;
  lastUpdated?: string;
}> => {
  try {
    const response = await API.get("/fetch-store-drugs/progress", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("진행 상태 정보 가져오기 실패:", error.response.data.message);
    throw new Error(
      error.response.data.message ||
        "진행 상태 정보를 가져오는 데 실패하였습니다."
    );
  }
};
