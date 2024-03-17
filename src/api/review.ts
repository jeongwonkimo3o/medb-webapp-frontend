import { ImageUploadResponse, ReviewFormData } from "../types/review";
import { API } from "../utils/constants/BaseApi";

const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

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

export const getReviews = async (page: number) => {
  try {
    const token = getAuthToken();
    const response = await API.get(`reviews?item_seq=${itemSeq}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
      }
    });
    console.log('데이터: ', response.data);
    return response.data;
  } catch (error) {

    throw new Error('API 호출 중 오류 발생: ' + error);
  }
};