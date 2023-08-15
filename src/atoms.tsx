import { atom } from "recoil";

//로그인 완료 후, 반환된 이메일로 값 저장 
export const isLoginAtom = atom({
    key: 'isLogin',
    default: "",
  });
//캡슐 정보 데이터 이름 및 값
export interface IData{
    id:number;
    name:string; //create category
    성분:string;
    강도:string;
    맛:string;
    커피머신:string;
    구매링크:string;
  }
//윈도우 로컬 스토리지에 저장된 데이터
export const localData = localStorage.getItem('alldata');
export const dataState = atom<IData[]>({
  key:"data", //localstorage에 저장했다가 가져옴
  default: localData === null ? [] : JSON.parse(localData as string),  
  });