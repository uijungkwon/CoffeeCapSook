import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import MyHeart from './MyHeart';
import MyList from './MyList';
import styled from 'styled-components';
import { motion } from 'framer-motion';
//마이 페이지 detail 화면 -> 이중 라우터를 사용하기 위해서 스타일 위치 맞춰야함

const Bg = require("../images/MyList.jpg");

const Wrapper = styled(motion.div)`
  height: 130vh;
  display: flex;
  //background-size:1450px;
  //background-image:linear-gradient(rgba(0, 0, 0, 0.117), #000000ae), url(${Bg});
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color:white;
`;

const Container = styled.div`
  height: 100vh;
  width:500px;
  padding: 0px 20px;
  border-radius: 30px;
   // 탭의 "최대 길이 " 정하기  - 탭의 너비 구하기 => 페이지 스타일링
  //margin: 0 auto;
  //background-color:#e3e0e0d3;// 마이페이지 중앙 사각형
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: -50px;
  font-size: 40px;
  font-weight:bold;
  color: black;
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
  width:180px;
  box-shadow: 2px 2px 2px;

  font-size: 23px;
  font-weight: bold;
  background-color: #cc9933ec;//#cc9933db;;#d6d5d5
  padding: 7px 0px;
  border-radius: 10px;
  color:black;
  a {
    display: block;
  }
`;

function Mypage (){
  const myHeartMatch = useRouteMatch('/MyHeart');
  const myListMatch = useRouteMatch('/MyList');

  
  return (
    //홈 버튼 생성
  <>
<Wrapper>
  <Container>
      <Header>
        <Title
        style={{marginRight:"15px"}}
        >
          마이페이지
        </Title>
      </Header>
          <Tabs>
            <Tab
            style={{}} 
            isActive={myListMatch !== null}>
              <Link to="/Mypage/MyList">#나의 캡슐 목록</Link>
            </Tab>

            <Tab
            style={{marginLeft:"50px"}}  
            isActive={myHeartMatch !== null}>
              <Link to="/Mypage/MyHeart">#내가 찜한 캡슐</Link>
            </Tab>
          </Tabs>
        
          <Switch>
           <Route path="/Mypage/MyList">
              <MyList />
            </Route>

            <Route path="/Mypage/MyHeart">
              <MyHeart />
            </Route>
          </Switch>
          </Container>
      </Wrapper>
    </>
  );
}
export default Mypage;