import { API } from "../utils/constants/BaseApi";

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// 유저 정보 불러오기
export const getUserInfo = async () => {
  try {
    const token = getAuthToken();
    const response = await API.get("users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("유저 정보 불러오기 실패");
  }
};
