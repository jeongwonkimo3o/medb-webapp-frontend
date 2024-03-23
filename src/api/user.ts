import { API } from "../utils/constants/BaseApi";
import { LoginData, RegisterData } from "../types/Auth";

// 로그인 함수
export const loginUser = async (
  loginData: LoginData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await API.post("login", loginData);
    localStorage.setItem("authToken", response.data.access_token);
    localStorage.setItem("nickname", response.data.user.nickname);
    localStorage.setItem("id", response.data.user.id);
    localStorage.setItem("email", response.data.user.email);
    localStorage.setItem("is_admin", response.data.user.is_admin);
    return { success: true, message: "로그인 성공!" }; // 항상 성공 메시지를 문자열로 반환
  } catch (error: any) {
    const message = error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
    return { success: false, message };
  }
};

// 회원가입 함수
export const registerUser = async (registerData: RegisterData) => {
  // 타입 명시
  try {
    await API.post("register", registerData);
    return {
      success: true,
      message: "회원가입이 완료되었습니다. 이메일을 확인해주세요.",
    };
  } catch (error: any) {
    let message = "회원가입 실패";
    if (error.response) {
      message =
        error.response.data.message || "회원가입 중 문제가 발생했습니다.";
    }
    return { success: false, message };
  }
};

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// 로그아웃
export const logoutUser = async () => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error("로그인 정보가 없습니다.");
    }

    await API.post("logout", null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // 스토리지에서 사용자 정보 삭제
    localStorage.removeItem("authToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    localStorage.removeItem("email");

    return { success: true, message: "로그아웃 성공!" };
  } catch (error: any) {
    const message = error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
    return { success: false, message };
  }
};