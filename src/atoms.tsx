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

  export const MyLove = atom<number[]>({
    key: 'isMyLove', //52번으로 저장되어 있음
    default: [], //숫자 배열로 구성할 것 -> 예시로 표현 
  });


/*서버의 커피 캡슐 속성(똑같이) - dateId 있는거 없는거 두개의 유형으로 만들어서 표현해야할 수도 있음 !!! */
export interface ICoffeeTop3{
  coffee_id: number,
  coffeeName: string,
  origin: string,
  ingredient: string,
  strength:string,
  bitter: string,
  acidity:string,
  roasting:string,
  tasteAndAroma:string,
  change_tasteAndAroma: string,
  type:string,
  extraction: string,
  compatible:string,
  purchaseLink: string,

}

  
//MyList - 3개의 묶음씩 여러 묶음을 표현할 경우 
/*
export const coffeeMyList = atom<ICoffeeTop3[][]>({
  key:"coffeeList",
  default:
  [[
    {
  coffee_id: 99,
  coffeeName: "1번 커피 이름",
  origin: "1",
  ingredient: "1",
  strength:"1번 커피 강도",
  bitter: "1번 쓴 강도",
  acidity:"1번 산미 강도",
  roasting:"1번 로스팅 강도 ",
  tasteAndAroma:"1번 커피 향",
  change_tasteAndAroma: "1",
  type:"1",
  extraction:"1",
  compatible:"1번 호환 머신",
  purchaseLink: "https://velog.io/@eeeve/React-07",
  dateID:"1111",
  },
  {
  coffee_id: 44,
  coffeeName: "2번 커피 이름",
  origin: "2",
  ingredient: "2",
  strength:"2번 커피 강도",
  bitter: "2번 쓴 강도",
  acidity:"2번 산미 강도",
  roasting:"2번 로스팅 강도",
  tasteAndAroma:"2번 커피향",
  change_tasteAndAroma: "2",
  type:"1",
  extraction: "2",
  compatible:"2번 호환머신",
  purchaseLink: "https://velog.io/@eeeve/React-07",

  dateID:"1111",
  },
  {
  coffee_id: 81,
  coffeeName: "3번 커피 이름",
  origin: "3",
  ingredient: "3",
  strength:"3번 커피 강도",
  bitter: "3번 쓴 강도",
  acidity:"3번 산미 강도",
  roasting:"3번 로스팅 강도",
  tasteAndAroma:"3번 맛과향 강도",
  change_tasteAndAroma:"3",
  type:"1",
  extraction: "3",
  compatible:"3번 호환머신",
  purchaseLink: "https://velog.io/@eeeve/React-07",

  dateID:"1111",
  },],
  
  
  [{
    coffee_id: 100,
    coffeeName: "4",
    origin: "4",
    ingredient: "4",
    strength:"4",
    bitter: "4",
    acidity:"4",
    roasting:"4",
    tasteAndAroma:"4",
    change_tasteAndAroma:"4",
    type:"2",
    extraction: "4",
    compatible:"4",
    purchaseLink: "4",

    dateID:"2222",
    },
    
  {
    coffee_id: 76,
    coffeeName: "5",
    origin: "5",
    ingredient: "5",
    strength:"5",
    bitter: "5",
    acidity:"5",
    roasting:"5",
    tasteAndAroma:"5",
    change_tasteAndAroma:"5",
    type:"2",
    extraction: "5",
    compatible:"5",
    purchaseLink: "5",

    dateID:"2222",
    },
    {
      coffee_id: 88,
      coffeeName: "6",
      origin: "6",
      ingredient: "6",
      strength:"6",
      bitter: "6",
      acidity:"6",
      roasting:"6",
      tasteAndAroma:"6",
      change_tasteAndAroma:"6",
      type:"2",
      extraction: "6",
      compatible:"6",
      purchaseLink: "6",

      dateID:"2222",
      },],
]

});

*/

//캡슐을 한 묶음만 OR 그냥 각각의 목록으로 보여줄 경우 - 서버의 받아온 객체를 그대로 저장할 용도 
export const coffeeTop3Atom = atom<ICoffeeTop3[]>({ 
  key: 'iscoffee', //52번으로 저장되어 있음
  default: [],
});
//테스트 위해 생성 (23.10.14) -> TOP3 캡슐 데이터 모음 "한 개" 생성! ===> 테스트!!
export const coffeeTop3 = atom<ICoffeeTop3[]>({
  key:"coffeeTop3",
  default:
  [{
  coffee_id: 99,
  coffeeName: "1",
  origin: "1",
  ingredient: "1",
  strength:"1",
  bitter: "1",
  acidity:"1",
  roasting:"1",
  tasteAndAroma:"1",
  change_tasteAndAroma: "1",
  type:"1",
  extraction:"1",
  compatible:"1",
  purchaseLink: "1",
  },
  {
  coffee_id: 44,
  coffeeName: "2",
  origin: "2",
  ingredient: "2",
  strength:"2",
  bitter: "2",
  acidity:"2",
  roasting:"2",
  tasteAndAroma:"2",
  change_tasteAndAroma: "2",
  type:"1",
  extraction: "2",
  compatible:"2",
  purchaseLink: "2",
  },
  {
  coffee_id: 81,
  coffeeName: "3",
  origin: "3",
  ingredient: "3",
  strength:"3",
  bitter: "3",
  acidity:"3",
  roasting:"3",
  tasteAndAroma:"3",
  change_tasteAndAroma:"3",
  type:"1",
  extraction: "3",
  compatible:"3",
  purchaseLink: "3",
  },
  
]
});

// 다른 ID 형태 테스트로 작성해보기!!
export interface ITest{
  testId:number;
  coffee:ICoffeeTop3[];

}

export const testData = atom<ITest[]>({
  key:"testData",
  default:
    [{
      testId:5,
      coffee:[
        {
          coffee_id: 99,
          coffeeName: "1",
          origin: "1",
          ingredient: "1",
          strength:"1",
          bitter: "1",
          acidity:"1",
          roasting:"1",
          tasteAndAroma:"1",
          change_tasteAndAroma: "1",
          type:"1",
          extraction:"1",
          compatible:"1",
          purchaseLink: "1",
          },
          {
          coffee_id: 44,
          coffeeName: "2",
          origin: "2",
          ingredient: "2",
          strength:"2",
          bitter: "2",
          acidity:"2",
          roasting:"2",
          tasteAndAroma:"2",
          change_tasteAndAroma: "2",
          type:"1",
          extraction: "2",
          compatible:"2",
          purchaseLink: "2",
          },
          {
          coffee_id: 81,
          coffeeName: "3",
          origin: "3",
          ingredient: "3",
          strength:"3",
          bitter: "3",
          acidity:"3",
          roasting:"3",
          tasteAndAroma:"3",
          change_tasteAndAroma:"3",
          type:"1",
          extraction: "3",
          compatible:"3",
          purchaseLink: "3",
          },


      ],
    },
    {
      testId:11,
      coffee:[
        {
          coffee_id: 97,
          coffeeName: "1",
          origin: "1",
          ingredient: "1",
          strength:"1",
          bitter: "1",
          acidity:"1",
          roasting:"1",
          tasteAndAroma:"1",
          change_tasteAndAroma: "1",
          type:"2",
          extraction:"1",
          compatible:"1",
          purchaseLink: "1",
          },
          {
          coffee_id: 45,
          coffeeName: "2",
          origin: "2",
          ingredient: "2",
          strength:"2",
          bitter: "2",
          acidity:"2",
          roasting:"2",
          tasteAndAroma:"2",
          change_tasteAndAroma: "2",
          type:"2",
          extraction: "2",
          compatible:"2",
          purchaseLink: "2",
          },
          {
          coffee_id: 80,
          coffeeName: "3",
          origin: "3",
          ingredient: "3",
          strength:"3",
          bitter: "3",
          acidity:"3",
          roasting:"3",
          tasteAndAroma:"3",
          change_tasteAndAroma:"3",
          type:"2",
          extraction: "3",
          compatible:"3",
          purchaseLink: "3",
          },


      ],
    }
  ]
});

/*윈도우 로컬 스토리지에 저장된 데이터 - 지금은 사용 안함 */
/*
export const localData = localStorage.getItem('alldata');
export const dataState = atom<IData[]>({
  key:"data", //localstorage에 저장했다가 가져옴
  default: localData === null ? [] : JSON.parse(localData as string),  
  });

  const BASE_URL  = 'https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/';
*/