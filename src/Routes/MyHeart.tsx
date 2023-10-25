import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import { coffee } from "../data/coffee";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICoffeeTop3, MyLove, coffeeTop3, coffeeTop3Atom,isMemIdAtom } from "../atoms";
import axios from 'axios';
const Wrapper = styled.div`
  padding: 0px 20px;
  //max-width: 1000px; // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  margin: 0 auto;
  //background-color:whitesmoke;  // 마이페이지 중앙 사각형

  border-radius: 30px;
  position: relative;
`;

 const BigBoxUl = styled.ul`
 color:black;
 font-size:20px;
 list-style-type: square;
 margin-bottom:20px;
 
 `;
const Li  = styled.li`
  color:black;
  strong{
      font-weight:bold;
    }
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
const Button = styled.button`
  background-color: rgba(211, 211, 211, 0.798);
  font-size:20px;
  font-weight:bold;
  width:70px;

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
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
`;
const BigBox = styled(motion.div)<{ ypoint: number }>`

  width: 35vw;
  height: 70vh;
  background-Color: whitesmoke;
  border-radius:20px;
  position: absolute;

  top:${(props) => props.ypoint + 150}px;
  z-index: 2;
  overflow :hidden;
  //left: 0;
  //right: 0;
  //margin: 0 auto;
  margin-left:-50px;
  margin-top: -200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const ImgBox = styled.div`
  margin-top:-50px;
  margin-bottom:20px;
  width:30%;
  height:30%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const Box = styled(motion.div)`
  background: #dfdfdf;
  width: 400px;
  height: 70px;
  //margin-right:120px;
  //margin-left:120px;
  font-weight:bold;
  margin-top:40px;
  border-radius: 30px;
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
`;
function MyHeart(){
//(0) 화면 접속 시 , id 배열을 보내고 서버로 부터 객체 값을 받아와야함.
const love = useRecoilValue(MyLove);
const [myLoveCoffee, setMyLoveCoffee] = useRecoilState(coffeeTop3Atom); //서버와 데이터 유형 일치시켜야함!
useEffect(()=>{
  console.log([1,5,9]);
  axios.post( `https://port-0-coffeecapsook-3prof2llleypwbv.sel3.cloudtype.app/my-love-coffee/${member_id}`,
          { 
           //서버에서 나타내는 변수는 임의로 작성(왼쪽 값) -- 수정 필요!!
          coffee_id: love,  //post 형태가 잘못됨!!!
          },
          {
            headers: {
              //'Content-Type': 'application/json',
              "Access-Control-Allow-Origin" : "*",

            }
          })
          .then((response) => {//서버에 데이터가 제대로 전송되었을 경우
            console.log(response?.data);
            setMyLoveCoffee((myLoveCoffee) => response?.data);//캡슐 목록 전체를 가져옴
          }).catch((error) => { //서버에 데이터가 제대로 전송되지 않은 경우

            console.log(error);
            window.alert(error);
          })

},[])

//(1) 멤버아이디 
const member_id = useRecoilValue(isMemIdAtom);

//임시 데이터 정의
const data = useRecoilValue(coffeeTop3);//내가 만들어 놓은 임시 커피 데이터 
const mylove = useRecoilValue(MyLove);

//(2) 화면에 보여주기위한 변수들 임의 설정 
  var url = "sample";
  const rarr = "-->";

//(3) 상세 페이지를 보여주기위한 아이디 매치 작업 
  const history =useHistory();
  const onBoxClicked = (itemId: number)=>{
    history.push(`/Mypage/MyHeart/${itemId}`);
  }
  const bigRoadMatch = useRouteMatch<{ itemId: string }>("/Mypage/MyHeart/:itemId");//해당 캡슐 url 확인 

  const clickedBox = bigRoadMatch?.params.itemId && coffee.find((item) => item.id === +bigRoadMatch.params.itemId);//item과 매치
  
  const onOverlayClick = ()=> history.push("/Mypage/MyHeart/");
  const {scrollY} = useScroll();

  return (
        <>
        <Wrapper>
       
        <ul>
        {
         <li style = {{color:"black"}}>
        
         { 
           myLoveCoffee?.map((coff)=> (
             <Box 
                layoutId={ coff.coffee_id +""}
                //key={"1"}
                onClick = {()=> onBoxClicked(coff.coffee_id)}
                >
                 <Img
               src={require(`../images/capsule/${coff.coffee_id}.png`)}
             /> 
                {coffee.find((item) => item.id === coff.coffee_id)?.name} 
               </Box>
           ))
           }
       </li>
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
                clickedBox && 
                (<>
                    {/*서버에서 보내준 데이터 "속성" 값으로 수정 */
                    <>
                    <ImgBox>
                      <img style = {{width:"100%", height:"100%"}} src={require(`../images/capsule/${coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.id}.png` )}/>
                    </ImgBox>
                    <BigBoxUl >
                      <Li >
                        <strong>이름: </strong>{coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.name} 
                      </Li>
                      <br></br>
                      <Li>
                      <strong>성분:</strong> {coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.성분}  
                      </Li>
                      <br></br>
                      <Li>
                      <strong>강도:</strong>{coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.강도} 
                      </Li>
                      <br></br>
                      <Li>
                      <strong>맛:</strong>{coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.맛} 
                      </Li>
                      <br></br>
                      <Li>
                      <strong>머신:</strong>{coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.커피머신
                      
                      } 
                      </Li>
                      <br></br>
                      <Li><strong>구매 링크 </strong> {rarr} <Button  onClick={()=>{
                          url = coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.구매링크 || "/";
                          window.open(url);
                          
                          }}>click</Button></Li>
                        
                    </BigBoxUl>
                    </>
                    }
                </>)
              }
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>


        </Wrapper>
        </>
    );
}

export default MyHeart;
