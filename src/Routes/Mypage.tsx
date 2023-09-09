import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import { coffee } from "../data/coffee";
import { useRecoilValue } from "recoil";
import { dataState,fetchcapsule } from "../atoms";
const Wrapper = styled.div`
  overflow-x: hidden;
  height:1200vh;
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:whitesmoke;
`;
const Header = styled.header`
  //height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
    //position: absolute;
    margin-top:30px;
    font-size:40px;
    font-weight:bold;
    color:black;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`//다른탭을 클릭하면 상대 편은 뜨지 않도록 작용
  text-align: center;
  text-transform: uppercase;
  width:210px;
  font-size: 25px;
  font-weight: 400;
  background-color: #ffff81;
  padding: 7px 0px;
  border-radius: 10px;
  color:black;
  a {
    display: block;
  }
`;
const MenuBox = styled.div`
  height: 10vh;
  display: flex;
  margin-left: 500px;
  //justify-content: center;
  //align-items: center;
`;
const CoffeeBox = styled.div``;
const Menu = styled.select`
    width:180px;
    height:50px;
    font-size:20px;
    border-radius: 5px;
    border-color:black;
    border-width: 0dvh;
    background-color: #d6d6d6;
`;
const Option = styled.option`
    width:100px;
    height:100px;
`;
const Ul = styled.ul`
 
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
// 해당 브랜드를 선택했을 때, value에 해당하는 캡슐을 보여줌
interface IProp{
  myname:string;
}

function Sample({myname}:IProp){ //타입스크립트 - 변수 타입 지정
 
  return(
    <Wrapper style = {{backgroundColor:"black",width:"100%", height:"700px"}}>{myname}</Wrapper>
  );
}

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
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
  left: 0;
  right: 0;
  margin: 0 auto;
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
const Info = styled.div`
    width:450px;
    height:200px;
    margin: 10px;
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    h1{
        color:black;
        font-size:20px;
        text-align: left;
    }
    strong{
      font-weight:bold;
    }
    button{
      color:black;
        font-size:20px;
        text-align: left;
    }
`;

interface ICapsuleType{
  /*서버에서 받는 데이터 타입 및 이름 정의 - 전체 속성 적기, DB 예시로 작성*/
  coffee_id:string;
  coffee_name:string;
  origin:string;
  ingredient:string;
  taste_and_aroma:string;
  compatible:string;
  purchase:string;
};

function Mypage(){

  /*sample - 로컬에 저장한 랜덤으로 추천 받은 캡슐 데이터*/
  const data = useRecoilValue(dataState);

  /*서버에 저장된 캡슐 데이터들 모두 가져오기 */
  const { data:capsule, isLoading } = useQuery<ICapsuleType>(["Coffe","capsule"], fetchcapsule);

  var url = "sample";
  const rarr = "-->";
  const history =useHistory();
  const onBoxClicked = (itemId: number)=>{
    history.push(`/MyPage/${itemId}`);
  }
  const bigRoadMatch = useRouteMatch<{ itemId: string }>("/MyPage/:itemId");//해당 캡슐 url 확인 

  const clickedBox = bigRoadMatch?.params.itemId && coffee.find((item) => item.id === +bigRoadMatch.params.itemId);//item과 매치
  
  const onOverlayClick = ()=> history.push("/MyPage/");
  const {scrollY} = useScroll();

  const [position, setPosition] = useState(0);
  const getRandom = (min:number, max:number) =>Math.floor(Math.random() * (max - min) + min);
 

  //카테고리
  const [index,setIndex] = useState("1");//Select 캡슐 종류 선택 -> index 지정
  const [visible,setVisible] =useState(false);
  const onClick = ()=>{
      setVisible((prev) => !prev);
    }

  /*커피 캡슐 브랜드 이름
  const 스타벅스 = data.filter(item => (item.id > 39  && item.id <114 ));
  const 네스프레소 = data.filter(item => (item.id > 1  && item.id < 17 ));
  const 일리 = data.filter(item => (item.id > 113  && item.id < 130 ));
  const 카누 = data.filter(item => (item.id > 16  && item.id < 31 ));

  const 이디야 = data.filter(item => (item.id > 30  && item.id < 35 ));
  const 할리스 = data.filter(item => (item.id > 129  && item.id < 133 ));
  const 폴바셋 = data.filter(item => (item.id > 34  && item.id < 40 ));
  const 투썸 = data.filter(item => (item.id > 132  && item.id < 139 ));
  const 던킨 = data.filter(item => (item.id > 138  && item.id < 144 ));
  */

    return (
        <>
        <Wrapper>
            <Header>
                <Title>마이 페이지 </Title>
            </Header>
       
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           data?.map((item)=> (
             <Box 
                layoutId={item.id +""}
                key={item.id}
                onClick = {()=> onBoxClicked(item.id)}
                >
                 <Img
               src={require(`../images/capsule/${item.id}.png`)}
             /> 
                {item.name} 
               </Box>
           ))
           }
       </li>
        }
         
       </Ul>
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
                                            /*coffe 부분의 데이터만 변경하면 됨 */
                      
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

export default Mypage;
