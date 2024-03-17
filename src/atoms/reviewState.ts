import { atom } from 'recoil';

export const isReviewModalOpenState = atom({
  key: 'isReviewModalOpenState', // 고유한 키
  default: false, // 기본값
});
