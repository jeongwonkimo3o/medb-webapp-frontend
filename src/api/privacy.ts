import { API } from "../utils/constants/BaseApi";

export const updateUserInfo = async (
  params: UpdateUserInfoParams
): Promise<UpdateUserInfoResponse> => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await API.patch("/users", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User info updated:", response.data.user.nickname);
    localStorage.setItem("nickname", response.data.user.nickname);
  } catch (error: any) {
    throw new Error(
      error.response.data.message ||
        "An error occurred while updating user info."
    );
  }
};

export const deleteUserAccount = async (userId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("is_admin");
    if (!token) {
      throw new Error("User not authenticated");
    }

    await API.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 스토리지에서 사용자 정보 삭제
    if (isAdmin === "false") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("nickname");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
    }
  } catch (error: any) {
    throw new Error(
      error.response.data.message ||
        "An error occurred while deleting user account."
    );
  }
};
