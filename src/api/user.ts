import { API } from "../utils/constants/BaseApi";
import { getAuthToken } from "../utils/constants/getAuthToken";

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
