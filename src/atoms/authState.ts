import { atom } from 'recoil';

export const authMsgState = atom({
  key: 'authMsgState', 
  default: '', 
});

// 닉네임 관리
export const nicknameState = atom({
  key: 'nicknameState',
  default: '',
});