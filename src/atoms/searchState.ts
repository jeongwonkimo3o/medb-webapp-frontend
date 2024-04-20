import { atom } from 'recoil';

// 검색어 관리
export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});
