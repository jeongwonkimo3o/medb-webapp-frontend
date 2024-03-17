import { API } from '../utils/constants/BaseApi';

export const submitMedicationLog = async (itemSeq: string, token: string) => {
  try {
    const response = await API.post('medication-logs', { item_seq: itemSeq }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('약 복용 기록 생성:', response.data);
    return response.data; 
  } catch (error) {
    throw new Error('API 호출 중 오류 발생: ' + error); 
  }
};

export const fetchMedicationLogs = async (token: string) => {
  try {
    const response = await API.get("medication-logs", {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    const { logs_with_details, total_drugs } = response.data;
    
    // total_drugs 값을 로컬 스토리지에 저장
    localStorage.setItem("total_drugs", String(total_drugs));

    return logs_with_details;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const getOldMedicationLogs = async (token: string) => {
  try {
    const response = await API.get("old-medication-logs", {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    const { logs_with_details } = response.data;
    localStorage.setItem("old_logs", String(response.data.total_drugs));

    return logs_with_details;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

export const stopMedication = async (logId: number, token: string) => {
  try {
    const response = await API.patch(`medication-logs/${logId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    console.log(`복용중단 요청 완료: ${logId}`);
    return response.data; 
  } catch (error) {
    console.error("복용중단 요청 중 오류 발생:", error);
    throw error;
  }
};

export const reuseMedication = async (logId: number, token: string) => {
  try {
    const response = await API.patch(`medication-logs/${logId}/reuse`, {}, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    console.log(`복용 재개 요청 완료: ${logId}`);
    return response.data; 
  } catch (error) {
    console.error("복용 재개 요청 중 오류 발생:", error);
    throw error;
  }
}
