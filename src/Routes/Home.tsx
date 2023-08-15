import { styled } from "styled-components";
import {useState,useEffect,useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useRecoilValue} from "recoil";
import { isLoginAtom } from "../atoms";
const homeBg = require("../images/homeBg.png");

const Wrapper = styled.div`
  overflow-x: hidden;
  height:100vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color: black;
  // 첫번째 프레임 배경사진 삽입
  background-image:linear-gradient(rgba(0, 0, 0, 0.195), #000000ca),
  url(${homeBg});
  background-repeat: no-repeat;
`;

//부모 - 자식 상속관계 이용 => 폰트 크기 조절
const FontBox = styled.div`
    margin-top:-200px;
    margin-left:100px;
    position: absolute;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
    font-family:'Just Me Again Down Here', cursive;
    font-size: 80px;
    margin-left:50px;
    margin-top:50px;
    font-weight: bold;
    }
    h2 {
        margin-bottom: 20px;
        font-size: 40px;
        margin-top: 40px;
        font-weight:bold;
    }
    h3 {
        //margin-top: 200px;
        font-size: 16px;
        margin-left:40px;
    }

`;
const Button = styled.button`
        width:220px;
        height:50px;
		background-color: whitesmoke;
		border: none;
		border-radius: 10px;
		font-size: 27px;
		color: ${(props) => props.theme.accentColor};
        margin-top:200px;
        margin-left:50px;
`;
interface IUseInterval {
    (callback: () => void, interval: number): void;
  }
function Home(){
    //1) 로그인 여부 확인
    const log = useRecoilValue(isLoginAtom);//아이디를 입력했는지 알려주는 boolean 값
    console.log(`값 : ${log}`);

    return (
        <>
        <Wrapper >
          <FontBox>
            <h1>coffee capsook</h1>
            <h2>당신의 커피 취향은 무엇인가요?</h2>
            {log ?(<h3>시작 버튼을 눌러 커피 캡슐 취향 테스트를 시작해보세요.</h3>):(<h3>로그인 후 테스트를 시작하면 당신만의 커피 캡슐을 추천해드립니다. </h3>)}
            
          </FontBox>
        {log ?  (<Button><Link to = "/QuizPage/1">시작 하기</Link></Button>) :(<Button><Link to = "/Login">로그인</Link></Button>)}
    </Wrapper> 
        </>

    );
}
export default Home;