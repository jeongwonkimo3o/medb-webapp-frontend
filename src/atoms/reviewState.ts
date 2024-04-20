import { atom } from 'recoil';

// 리뷰 모달
export const isReviewModalOpenState = atom({
  key: 'isReviewModalOpenState', // 고유한 키
  default: false, // 기본값
});
