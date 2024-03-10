import { atom } from 'recoil';

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

export const totalResultsState = atom({
  key: 'totalResultsState',
  default: 0,
});
