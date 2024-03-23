import { API } from "../utils/constants/BaseApi";

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// 공지 불러오기
export const getNotices = async (page: number) => {
  try {
    const token = getAuthToken();
    const response = await API.get("notices", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    });
    console.log("데이터: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("리뷰 불러오기 실패");
  }
};

// 특정 id의 공지 불러오기
export const showNotices = async (id: number) => {
  try {
    const token = getAuthToken();
    const response = await API.get(`notices/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("데이터: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("리뷰 불러오기 실패");
  }
};

// 공지 작성
export const createNotice = async (title: string, content: string) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("토큰이 없습니다.");
  }

  try {
    const response = await API.post(
      "notices",
      { title, content },
      {
        // JSON 형태로 데이터 전송
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("공지 작성 완료:", response.data);
  } catch (error) {
    console.error("공지 작성 중 오류 발생:", error);
    throw new Error("공지 작성 실패");
  }
};

// 공지 작성
export const editNotice = async (
  noticeId: number,
  title: string,
  content: string
) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("토큰이 없습니다.");
  }

  try {
    const response = await API.patch(
      `notices/${noticeId}`,
      { title, content },
      {
        // JSON 형태로 데이터 전송
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("공지 수정 완료:", response.data);
  } catch (error) {
    console.error("공지 수정 중 오류 발생:", error);
    throw new Error("공지 수정 실패");
  }
};

// 공지 삭제
export const deleteNotice = async (noticeId: number) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("토큰이 없습니다.");
  }

  try {
    await API.delete(`notices/${noticeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("공지가 삭제되었습니다.");
  } catch (error) {
    console.error("공지 삭제 중 오류 발생:", error);
    throw new Error("공지 삭제 실패");
  }
};
