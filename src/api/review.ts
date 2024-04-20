import { ImageUploadResponse, ReviewFormData } from "../types/Review";
import { API } from "../utils/constants/BaseApi";
import { getAuthToken } from "../utils/constants/getAuthToken";

const itemSeq = localStorage.getItem("itemSeq");

export const uploadImages = async (
  images: FileList
): Promise<ImageUploadResponse[]> => {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("images[]", images[i]);
  }

  try {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error("토큰이 없습니다.");
    }

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const response = await API.post<{ images: ImageUploadResponse[] }>(
      "images/upload",
      formData,
      { headers }
    );

    // 'images' 속성 내의 데이터만 반환
    return response.data.images;
  } catch (error) {
    throw new Error("이미지 업로드 실패");
  }
};

export const submitReview = async (data: ReviewFormData): Promise<void> => {
  try {
    if (!itemSeq) {
      throw new Error("의약품 정보가 유효하지 않습니다.");
    }

    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error("토큰이 없습니다.");
    }

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const queryString = `?item_seq=${itemSeq}`;
    await API.post(`reviews${queryString}`, data, { headers });
  } catch (error) {
    throw new Error("리뷰 작성 실패");
  }
};

export const showReviews = async (page: number) => {
  try {
    const token = getAuthToken();
    const response = await API.get(`reviews/${itemSeq}`, {
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
    throw new Error("API 호출 중 오류 발생: " + error);
  }
};

// 내 리뷰 불러오기
export const getReviews = async (page: number) => {
  try {
    const token = getAuthToken();
    const response = await API.get("reviews", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    });
    let reviews_total = response.data.reviews.total; // 수정된 부분
    localStorage.setItem("reviews_total", reviews_total);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("리뷰 불러오기 실패");
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  const authToken = getAuthToken();
  if (!authToken) {
    throw new Error("토큰이 없습니다.");
  }

  try {
    await API.delete(`reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("리뷰가 삭제되었습니다.");
  } catch (error) {
    console.error("리뷰 삭제 중 오류 발생:", error);
    throw new Error("리뷰 삭제 실패");
  }
};
