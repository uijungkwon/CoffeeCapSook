import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import { coffee } from "../data/coffee";
import { useRecoilValue } from "recoil";
import { dataState } from "../atoms";
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
function Mypage(){

  const data = useRecoilValue(dataState);
  var num = 1;
  //서버와 반환 타입 의논 - id외에도 다른 캡슐 정보도 함께 반환받아야함.
  //서버에도 전체 캡슐 데이터 정보가 있어야함 - 데이터 타입 의논
  //"네스프레소" - 저장된 캡슐이라고 생각

  const MyData = [
    {"id":43,"name":"오라피오","성분":"브라질,코스타리카,우간다", "강도":"6","맛":"부드러운 풍미, 은은한 산미, 캐러멜 향","커피머신":"네스프레소 버츄오 머신 ","구매링크":"https://www.nespresso.com/kr/ko/order/capsules/vertuo"},
    {"id":44,"name":"볼테소","성분":"브라질, 콜롬비아", "강도":"4","맛":"비스킷향, 와인향,마일드","커피머신":"네스프레소 버츄오 머신 ","구매링크":"https://www.nespresso.com/kr/ko/order/capsules/vertuo"},
    {"id":58,"name":"아이스 포르테","성분":"콜롬비아,인도네시아,에티오피아", "강도":"6","맛":"곡물향, 우디향, 로스팅향","커피머신":"네스프레소 버츄오 머신 ","구매링크":"https://www.nespresso.com/kr/ko/order/capsules/vertuo"},
    {"id":86,"name":"리스트레토-디카페나토(디카페인)","성분":"브라질,콜롬비아", "강도":"10","맛":"미디엄 다크로스팅, 산미, 쓴맛","커피머신":"네스프레소 오리지널 머신 ","구매링크":"https://www.nespresso.com/kr/ko/order/capsules/original"},
  ];//서버에서 반환받은 "마이페이지" id 목록이라고 생각
  
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
  
  //연습
  /*useEffect(() => {
    /*
    num = getRandom(2, 143);
    //다른 recoil만들어서 데이터 셋 만들기!!
    console.log(coffee.find(item =>item.id == num)); //맞는 배열 찾을 수 있음
    
  const sample =50;
  if(sample > 49 && sample < 70)
      console.log(`속해 있습니다!`);
  else
      console.log("노 속");
  }, []);
  */

//coffee.find(item => item.id == num)?.id || 5 , name:coffee.find(item =>item.id == num)?.name || " ",성분:coffee.find(item =>item.id == num)?.성분 || " ", 강도:coffee.find(item =>item.id == num)?.강도 || " ", 맛:coffee.find(item =>item.id == num)?.맛 || " ", 커피머신:coffee.find(item =>item.id == num)?.커피머신 || " ", 구매링크:coffee.find(item =>item.id == num)?.구매링크 || " ",
//coffee.find(item => (item.id > 50  && item.id < 80 ))?.name || " "


  const [index,setIndex] = useState("1");//Select 캡슐 종류 선택 -> index 지정
  const [visible,setVisible] =useState(false);
  const onClick = ()=>{
      setVisible((prev) => !prev);
    }
    //////////추려낸 데이터
  const select_1 = data.filter(item => (item.id > 39  && item.id <114 ));
  const select_2 = data.filter(item => (item.id > 1  && item.id < 17 ));
  const select_3 = data.filter(item => (item.id > 113  && item.id < 130 ));
  const select_4 = data.filter(item => (item.id > 16  && item.id < 31 ));

  const select_5 = data.filter(item => (item.id > 30  && item.id < 35 ));
  const select_6 = data.filter(item => (item.id > 129  && item.id < 133 ));
  const select_7 = data.filter(item => (item.id > 34  && item.id < 40 ));
  const select_8 = data.filter(item => (item.id > 132  && item.id < 139 ));
  const select_9 = data.filter(item => (item.id > 138  && item.id < 144 ));
    
    return (
        <>
        <Wrapper>
            <Header>
                <Title>마이 페이지 </Title>
            </Header>
        <MenuBox>
        <Menu 
         value = {index}
         name="coffee"
         onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {//타입스크립트에서 
            setIndex(e.target.value); //option에서 선택한 index를 select index로 전달
        }}
         >
         <Option value="1">네스프레소</Option>
         <Option value="2">스타벅스</Option>
         <Option value="3">일리</Option>
         <Option value="4">카누</Option>
         <Option value="5">이디야</Option>
         <Option value="6">할리스</Option>
         <Option value="7">폴바셋</Option>
         <Option value="8">투썸</Option>
         <Option value="9">던킨</Option>
        </Menu>
        </MenuBox>
        <AnimatePresence>
        {index=="1" ?  (  //네스프레소
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_1?.map((item)=> (
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
     ):(
       null
      ) }


        {index=="2" ?  (//스타벅스 (id:2~16)
        <Ul>
         {
          <li style = {{color:"black"}}>
          { 
            select_2?.map((item)=> (
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
      ):(
        null
      ) }

      {index=="3" ?  ( //일리(id:114~129 )
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_3?.map((item)=> (
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
     ):(
       null
      ) }

      {index=="4" ?  ( //카누(id:17~30)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_4?.map((item)=> (
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
     ):(
       null
      ) }

    {index=="5" ?  ( //이디야(id:130~132)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_5?.map((item)=> (
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
     ):(
       null
      ) }

    {index=="6" ?  ( //할리스(id:31~34)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_6?.map((item)=> (
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
     ):(
       null
      ) }

    {index=="7" ?  ( //폴바셋(id:35~39)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_7?.map((item)=> (
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
     ):(
       null
      ) }

    {index=="8" ?  (//투썸(id:133~138)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_8?.map((item)=> (
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
     ):(
       null
      ) }

    {index=="9" ?  ( //던킨(id:139~143)
        <Ul>
        {
         <li style = {{color:"black"}}>
         { 
           select_9?.map((item)=> (
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
     ):(
       null
      ) }
          </AnimatePresence>
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
                    { 
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
                      <strong>머신:</strong>{coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.커피머신} 
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
