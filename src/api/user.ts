import { API } from "../utils/constants/BaseApi";
import { LoginData, RegisterData } from "../types/Auth";

// 로그인 함수
export const loginUser = async (
  loginData: LoginData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await API.post("/auth/login", loginData);
    localStorage.setItem("authToken", response.data.token);
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
