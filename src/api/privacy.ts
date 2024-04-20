import { API } from "../utils/constants/BaseApi";
import { getAuthToken } from "../utils/constants/getAuthToken";

const token = getAuthToken();

export const updateUserInfo = async (
  params: UpdateUserInfoParams
): Promise<string> => { // 또는 UpdateUserInfoResponse에 맞는 타입으로 지정


  try {
    const response = await API.patch("/users", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("유저 정보 업데이트:", response.data.user.nickname);
    localStorage.setItem("nickname", response.data.user.nickname);
    return response.data.user.nickname; // 혹은 UpdateUserInfoResponse에 맞는 값을 반환
  } catch (error: any) {
    throw new Error(
      error.response.data.message ||
        "유저 정보 업데이트에 실패하였습니다."
    );
  }
};

export const deleteUserAccount = async (userId: number): Promise<void> => {
  try {
    const isAdmin = localStorage.getItem("is_admin");
    if (!token) {
      throw new Error("유저 정보가 유효하지 않습니다.");
    }

    await API.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 스토리지에서 사용자 정보 삭제
    if (isAdmin === "false") {
      localStorage.clear();
    }
  } catch (error: any) {
    throw new Error(
      error.response.data.message ||
        "회원 탈퇴에 실패하였습니다."
    );
  }
};
