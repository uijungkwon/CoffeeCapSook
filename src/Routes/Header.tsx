import {
    motion,
    useAnimation,
    useMotionValueEvent,
    useScroll,
  } from "framer-motion";
  import { useState } from "react";
  import { Link, useHistory, useRouteMatch } from "react-router-dom";
  import styled from "styled-components";
  import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../atoms";
  const homeBg = require("../images/homeBg.png");
  //스타일 컴포넌트
  const Nav = styled(motion.nav)`
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:black;
    position: fixed;
    width: 100%;
    top: 0;

    height: 68px;
    font-size: 15px;
    padding: 20px 20px;
    :hover {
    cursor: pointer;
  }
  `;
  
  const Col = styled(motion.div)`
    display:flex;
    width:100%;//웹 페이지 모양에 맞게 자유롭게 변형 
    height: 100%;
    margin: 0 auto;//가운데 정렬
    align-items: center;
    justify-content:space-between; 

  `;
  // 1) 로고 화면 
  const Logo = styled.h1`
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    top:-10px;
    height: 25px;
    font-size: 42px;
    font-family:'Just Me Again Down Here', cursive;
  `;
  //2) 메뉴바 화면 
  const Items = styled.ul`
    display: flex;
    font-family: "Hanna";
    transition: color 0.3 ease-in-out;
  `;
  //로그인 후 나타내는 div자리
  const LogItems = styled.ul`

    display: flex;
    align-items: center;
    font-family: "Hanna";
    transition: color 0.3 ease-in-out;
    `;
  const Item = styled.li`
    margin-right: 40px;
    display: flex;
    position: relative;
    font-size:15px;
    justify-content: center;
    flex-direction: column;
     //color:white;
  `;
  //4) 페이지 이동 동그라미
  const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: white;
  `;
  const H1 = styled.h1`
  font-size:15px;
  margin-left:60px;
  `;
function Header(){
    //1) 로그인 완료 => recoil로 로그인 한 메일 log 저장
    const log = useRecoilValue(isLoginAtom);
    //2) 현재 어느 페이지에 있는지 확인
    const myMatch = useRouteMatch("/Mypage");
    const allCapMatch = useRouteMatch("/AllCap");
    const enrollMatch = useRouteMatch("/Enroll");
    const loginMatch = useRouteMatch("/Login");
    const testMatch = useRouteMatch("/QuizPage/1");
    //3) 로고 클릭시 홈으로 이동
    const history = useHistory();
    const gohome = () => {
        history.push(`/`);
  };
    //4) 스크롤 내릴때 Nav바 색깔 변환
    const { scrollY } = useScroll();
    const navAnimation = useAnimation();//애니메이션을 변수로 작성 
    const fontAnimation = useAnimation();
      useMotionValueEvent(scrollY, "change", () => {
        if (scrollY.get() > 40) {
          navAnimation.start({
          backgroundColor: "#0000000",
        });
          fontAnimation.start({
          color:"rgba(0,0,0,1)",
        })

      } else {
          navAnimation.start({
          backgroundColor: "rgba(0,0,0,1)",
        });
          fontAnimation.start({
          color:"#ffffff",
        })
      }
    });

    return (
        <>
      <Nav
        initial={{ backgroundColor: "rgba(0,0,0,1)" }}
        animate={navAnimation}
      >
        <Col
          initial={{ color:"#ffffff" }}
          animate={fontAnimation}
        >
          <Logo onClick = {gohome}>
            coffee capsook
          </Logo>
            {
              log?(
            <LogItems>
              <Item>
                <Link to="/QuizPage/1">
                취향 테스트 {testMatch ? <Circle layoutId="circle" /> : null}
                </Link>
              </Item>
              <Item>
                <Link to="/AllCap">
                전체 캡슐 {allCapMatch ? <Circle layoutId="circle" /> : null}
                </Link>
              </Item>
                <Item>
                  <Link to="/Mypage/MyList">
                    마이페이지 {myMatch?.isExact ? <Circle layoutId="circle" /> : null}
                  </Link>
                </Item>
                <H1 >{log} 님 </H1>
              </LogItems>
              ):
              (
            <Items>
             <Item>
                <Link to="/Login">
                로그인 {loginMatch ? <Circle layoutId="circle" /> : null}
                </Link>
            </Item>
            <Item>
              <Link to="/Enroll">
                회원 가입 {enrollMatch ? <Circle layoutId="circle" /> : null}
              </Link>
             </Item>
            </Items>
            )
            }
        </Col>
      </Nav>
     </>
    );
}
export default Header;