import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import { coffee } from "../data/coffee";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICoffeeTop3, ITest, MyLove,  isMemIdAtom, testData } from "../atoms";
import axios from 'axios';
import results from "../contents/results";
import { parse } from "path";
const fullHeart = require("../images/hearts/fullHeart.png");
const emptyHeart =  require("../images/hearts/emptyHeart.png");


const Wrapper = styled.div`
  padding: 0px 20px;
  max-width: 1000px; // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  //margin: 0 auto;
  //background-color:whitesmoke;  // 마이페이지 중앙 사각형

  border-radius: 30px;
  position: relative;
`;
 const BigBoxUl = styled.ul`
 color:black;
 list-style-type: square;
 margin-bottom: 60px;
 width:400px;

 li{
  color:black;
  margin-bottom: 5px;
  strong{
      font-weight:bold;
    }
 }
 `;

const Button = styled.button`
  background-color: rgba(211, 211, 211, 0.798);
  font-size:15px;
  font-weight:bold;
  width:50px;

  border-radius: 30px;
  &:hover {//바로 위 태그를 가리킴
      color: #0059ff;
      cursor: pointer;
    }
`;
const Overlay = styled(motion.div)`
  position:fixed;
  opacity:0;
  top:0;

  margin-left: -500px;
  width:1500px;
  height:100vh;
  background-color: rgba(0,0,0,0.5);
`;
const BigBox = styled(motion.div)<{ ypoint: number }>`
  width: 45vw;
  height: 100vh;
  background-Color: whitesmoke;
  border-radius:20px;
  position: absolute;
  padding:5px;

  top:${(props) => props.ypoint + 150}px;
  z-index: 2;
  overflow :hidden;
  //left: 0;
  //right: 0;
  //margin: 0 auto;
  margin-left:-100px;
  margin-top: -200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const Box = styled(motion.div)`
  background: #dfdfdf;
  width: 320px;
  height: 70px;
  //margin-right:120px;
  margin-left:50px;
  font-weight:bold;
  margin-top:40px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px black;
  color: black;
  
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
  h1{
    font-size: 20px;
  }
  h2{
    font-size:12px;
    margin-bottom: 5px;
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
    font-size:23px;
    font-weight: bold;
    border-radius: 20px;
    box-shadow: 1px 1px 1px;
    background-color: #cc9933db;
    width:"50%";
    margin-top: -40px;
    margin-bottom: 15px;
  }
  h2{
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
const Info = styled.div`
    width:250px;
    //height:200px;
    //margin-bottom: 20px;
    margin-left: 100px;
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    h1{
        color:black;
        font-size:17px;
        text-align: left;
    }
    strong{
      font-weight:bold;
    }
`;
const HeartBtn = styled.button`
  margin-top: 7px;
  font-weight: bold;
  font-size: 17px;
  //background-color: yellow;//하트 자리만 표시!
  &.active {
        background-color: red;
    }
  &:hover {//바로 위 태그를 가리킴
      cursor: pointer;
    }
  img {
    margin-bottom:-5px;
    width:20px;
    height:20px;
  }

`;

interface ICapsuleType{
  /*서버에서 받는 데이터 타입 및 이름 정의 - 전체 속성 적기, DB 예시로 작성*/
  coffee_id: number,
  coffeeName: string,
  origin: string,
  ingredient: string,
  strength: string,
  bitter: string,
  acidity: string,
  roasting: string,
  tasteAndAroma: string,
  change_tasteAndAroma: string,
  type: string,
  extraction: string,
  compatible: string,
  purchaseLink: string,
};

function Mypage(){

//(1) member_id값 가져오기
const member_id = useRecoilValue(isMemIdAtom);

//(2) 서버에서 추천받은 캡슐 목록 3묶음으로 표현된 데이터 가져오기
function fetchcapsule() { 
  return fetch(`https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/my-favorite-test/${member_id}`) //예시 URL
  .then((response) =>
    response.json() //"저장된 스타벅스 캡슐 목록 반환받기"
  );
}
const { isLoading, data} = useQuery<ITest[]>('myLoveCoffee', fetchcapsule);
console.log(data);





//(3) 테스트를 위해 예시로 작성한 데이터 -> 서버 연동 시 삭제 
//const data = useRecoilValue(coffeeMyList);
//const data = useRecoilValue<ITest[]>(testData); //이 페이지에서만 테스트해야함!!!



//(4) 화면에 표시하기 위한 변수들 임의 설정 
var url = "sample";
const rarr = "-->";
const today = new Date();
var typenum = "5";
const top3 = ["Top1", "Top2", "Top3"];
  
//(5) 좋아요 버튼 구현하기 위한 state
const [btnActive, setBtnActive] = useState("");
const [mycap, setMycap] = useRecoilState(MyLove);
var tmp = "";

//(6) 목록 중 하나의 박스를 클릭했을 때 나오는 세부 페이지를 위한 "아이디 연결 "작업
const history =useHistory();
const onBoxClicked = (itemId: number)=>{
    history.push(`/Mypage/MyList/${itemId}`);
  }
const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Mypage/MyList/:itemId");//해당 캡슐 url 확인 

const clickedBox = bigRoadMatch?.params.itemId && data?.find((item) => item.testId === +bigRoadMatch.params.itemId);//item과 매치
  
const onOverlayClick = ()=> history.push("/Mypage/MyList/");
const {scrollY} = useScroll();


    return (
        <>
        <Wrapper>
        <ul>
        {
            data?.map((item)=>(
                    <Box
                      layoutId={item?.testId+""}
                      //key={"1"}
                      onClick = {()=> onBoxClicked(item?.testId)}
                    >
                    
                      <h2 style = {{}}>test_id :{ item?.testId}</h2>
                      <h1>{results[parseInt(item?.coffee[0]?.type)].title}</h1>
                    
                    </Box>
            ))
        }
         
       </ul>
       <AnimatePresence>
            
            {bigRoadMatch ? (
              <>
              <Overlay 
                onClick = {onOverlayClick}
                exit = {{opacity:0}}
                animate = {{opacity: 1}}
              />
              <BigBox
                ypoint={scrollY.get()}
                layoutId={bigRoadMatch.params.itemId+""}
                exit={{ opacity: 0 }}
              >

              {
                clickedBox && (
                  <>

                    {
                      data?.find((item)=> item.testId ===+bigRoadMatch.params.itemId )?.coffee.map((c, index) =>(
                        <>
                          {index == 0 ? 
                          <Div>
                             <h1 style = {{color:"black"}}>{results[parseInt(c.type)].title}</h1> 
                             <h2 style = {{color:"black"}}>{results[parseInt(c.type)].content}</h2> 
                          </Div>

                          : null }
                        </>

                      ))
                    }
                    {
                    
                      data?.find((item)=> item.testId ===+bigRoadMatch.params.itemId )?.coffee.map((c, index) => (
                        <>
                    <div style = {{display:"flex", flexDirection:"row", marginBottom:"-40px"}}>
                      
                    <h1 style = {{color:"black", fontSize:"23px", marginTop:"40px", marginLeft:"-10px"}}>{top3[index]}</h1>
                      <img 
                      style = {{width:"100px", height:"100px"}} 
                      src={require(`../images/capsule/${c.coffee_id}.png` )}/>
                          <Info>
                            <BigBoxUl >
                              <li>
                                <h1><strong>이름</strong> : {c.coffeeName}</h1>
                              </li>
                              <li>
                                <h1><strong>맛과향</strong> : {c.tasteAndAroma}</h1>
                              </li>
                              <li>
                                <h1><strong>로스팅 강도</strong> : {c.roasting}</h1>
                              </li>
                              <li>
                                <h1><strong>호환 머신</strong> : {c.compatible}</h1>
                              </li>
                              <li><strong>구매 링크 </strong> {rarr} <Button  onClick={()=>{
                                  url = c.purchaseLink || "/";
                                window.open(url);
                                  }}>click</Button></li>
                              <li>
                                <strong>찜하기 </strong>
                              <HeartBtn 
                                value={index}
                                className={"btn" + (index+"" == btnActive ? " active" : "")}
                                onClick={(e:any)=>{
                                  setMycap((mycap) => [...mycap, c.coffee_id]);

                                  setBtnActive((prev) => {
                                  return e.target.value;
                                  });
                                }}

                              > 
                                 🤍
                                </HeartBtn>
                              </li>
                            </BigBoxUl>
                          </Info>
                        </div>
                        </>
                      ))

                      
                    }

                  </>
                )
              }
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>
        </Wrapper>
        </>
    );
}

export default Mypage;
/*
data?.map((item)=>(
                    <Box
                      layoutId={item.testId+""}
                      //key={"1"}
                      onClick = {()=> onBoxClicked(item.testId)}
                    >
                    <div>
                      <h2>{today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일</h2>
                      <h1>{results[parseInt(item.coffee[0].type)].title}</h1>
                    </div>
                    </Box>
            ))
*/