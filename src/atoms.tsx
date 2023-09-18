import { atom } from "recoil";
//로그인 완료 후, 반환된 이메일로 값 저장 
export const isLoginAtom = atom({
    key: 'isLogin',
    default: "",
  });
//로그인 완료 후, 반환된 mem_id로 값 저장
export const isMemIdAtom = atom({
    key: 'isMemId', //52번으로 저장되어 있음
    default: 0,
  });

export interface ICoffee{
  type:string;
  coffee_id: number;
  coffeeName:string;//커피 이름
  tasteAndAroma:string//맛
  strength:string
  compatible:string//머신
  purchaseLink:string//구매링크

}
export const coffeeState = atom<ICoffee>({
  key:"coffee",
  default:{
    type:"2",
    strength:"0",
    coffee_id:2,
    coffeeName:"",//커피 이름
    tasteAndAroma:"",//맛
    compatible:"",//머신
    purchaseLink:"",//구매링크
  }
});


export const isCoffeeIdAtom = atom({
    key: 'isCoffeeId', //52번으로 저장되어 있음
    default: 0,
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

/*윈도우 로컬 스토리지에 저장된 데이터 - 지금은 사용 안함 */
export const localData = localStorage.getItem('alldata');
export const dataState = atom<IData[]>({
  key:"data", //localstorage에 저장했다가 가져옴
  default: localData === null ? [] : JSON.parse(localData as string),  
  });

  const BASE_URL  = 'https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/';
