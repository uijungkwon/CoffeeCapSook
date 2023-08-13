import { atom } from "recoil";

export const isLoginAtom = atom({
    key: 'isLogin',
    default: "",//로그인 완료 -> 회원 정보 - 이메일 받아오기 -> 이메일 표시
  });
  
export interface IData{
    id:number;
    name:string; //create category
    성분:string;
    강도:string;
    맛:string;
    커피머신:string;
    구매링크:string;
  }
  export const localData = localStorage.getItem('alldata');//toDos
  export const dataState = atom<IData[]>({
    key:"data", //localstorage에 저장했다가 가져옴
    default: localData === null ? [] : JSON.parse(localData as string), //state들을 이 배열안에 다 넣는건 변하지 않음 
  });