import { atom } from "recoil";

export const isLoginAtom = atom({
    key: 'isLogin',
    default: "",//로그인 완료 -> 회원 정보 - 이메일 받아오기 -> 이메일 표시
  });