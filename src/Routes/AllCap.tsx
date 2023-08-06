import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import { coffee } from "../data/coffee";
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
const Ul = styled.ul``;
const Li  = styled.li`
  width: 500px;
  background-color: #dcdcdcb8;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  
  button {
    display: flex; //요소를 감싸는 속성
    align-items: center;
    margin-left:40px;
    margin-top:-50px;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    //&: 바로 위 태그를 가리킴 // 글자에 마우스를 가져다 대면 색깔 변화 (hover)
    button {
      color: #0059ff;
      cursor: pointer;
    }
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
  background-color: #ffffff1a;
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
  width: 40vw;
  height: 60vh;
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
function AllCap(){
  //itemId를 생성해서 박스 클릭시에 모달 박스 나올 수 있는 방법도 생각 해보기
  //id 일치시키기!
  
  const history =useHistory();
  const onBoxClicked = (itemId: number)=>{
    history.push(`/Allcap/${itemId}`);
  }
  const bigRoadMatch = useRouteMatch<{ itemId: string }>("/AllCap/:itemId");

  const clickedBox = bigRoadMatch?.params.itemId && coffee.find((item) => item.id === +bigRoadMatch.params.itemId);
  
  const onOverlayClick = ()=> history.push("/AllCap/");
  const {scrollY} = useScroll();
  
  //useMotionValueEvent(scrollY, "change", (latest) => {latest});
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  
  
    const [index,setIndex] = useState("1");
    const rarr = "->";
    const [visible,setVisible] =useState(false);
    const onClick = ()=>{
      setVisible((prev) => !prev);
      
    }

    return (
        <>
        <Wrapper>
            <Header>
                <Title>전체 캡슐</Title>
            </Header>
        <MenuBox>
        <Menu 
         value = {index}
         name="coffee"
         onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {//타입스크립트에서 
            setIndex(e.target.value); //option에서 선택한 index를 select index로 전달
            //console.log(e.target.value);
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
          <li>{coffee.slice(40, 113).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/네스프레소/${coffee.name}.webp`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }


        {index=="2" ?  (//스타벅스
        <Ul>
          <li>{coffee.slice(0, 15).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

      {index=="3" ?  ( //일리
        <Ul>
          <li>{coffee.slice(114,129).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                  //src={require(`../images/capsule/일리/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

      {index=="4" ?  ( //카누
        <Ul>
          {coffee.slice(17,30 ).map((coffee) => (
            <li  key={coffee.id}>
              <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/카누/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
            </li>
          ))}
        </Ul>
      ):(
       null
      ) }

    {index=="5" ?  ( //이디야
        <Ul>
          <li>{coffee.slice(130, 132).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                  //src={require(`../images/capsule/이디야/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

    {index=="6" ?  ( //할리스
        <Ul>
          <li>{coffee.slice(31, 34).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                  //src={require(`../images/capsule/할리스/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

    {index=="7" ?  ( //폴바셋
        <Ul>
          <li>{coffee.slice(35, 39).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                  //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                  //src={require(`../images/capsule/폴바셋/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

    {index=="8" ?  (//투썸
        <Ul>
          <li>{coffee.slice(133, 138).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                    //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                 // src={require(`../images/capsule/투썸/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
        </Ul>
      ):(
        null
      ) }

    {index=="9" ?  ( //던킨
        <Ul>
          <li>{coffee.slice(139, 143).map((coffee) => (
                  <Box 
                   layoutId={coffee.id +""}
                   key={coffee.id}
                   onClick = {()=> onBoxClicked(coffee.id)}
                   >
                    <Img
                    //src={require(`../images/capsule/스타벅스/${coffee.name}.png`)}
                  //src={require(`../images/capsule/던킨/${coffee.name}.png`)}
                /> 
                   {coffee.name} 
                  </Box>
                ))}</li>
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
                  <h1 style = {{color:"black"}}>
                    {
                    coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.name
                    }</h1>
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

export default AllCap;
/*

          <AnimatePresence>
            
            {bigRoadMatch ? (
              <>
              <Overlay 
                onClick = {onOverlayClick}
                exit = {{opacity:0}}
                animate = {{opacity: 1}}
              />
              <BigBox
                layoutId={bigRoadMatch.params.itemId+""}
                style = {{top:scrollY.get() + 100, }}
              >
              {
                clickedBox && 
                (<>
                  <h1 style = {{color:"black"}}>
                    {
                    coffee.find((item) => item.id === +bigRoadMatch.params.itemId)?.name
                    }</h1>
                </>)
              }
              </BigBox>
            </>
            ) : null}
            
          </AnimatePresence>
*/