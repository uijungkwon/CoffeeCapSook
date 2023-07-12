import { styled } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../Login";

const homeBg = require("../images/homeBg.png");
const Wrapper = styled.div`
  overflow-x: hidden;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-image:linear-gradient(rgba(0, 0, 0, 0.195), #000000ca),
  url(${homeBg});// 첫번째 프레임 배경사진 삽입
  background-repeat: no-repeat;
`;

//부모 - 자식 상속관계 이용 => 폰트 크기 조절
const FontBox = styled.div`
    margin-top:-400px;
    margin-left:100px;
    position: absolute;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
    font-family:'Just Me Again Down Here', cursive;
    font-size: 80px;
    margin-left:100px;
    margin-top:30px;
    font-weight: bold;
    }
    h2 {
        margin-bottom: 20px;
        font-size: 40px;
        margin-top: 23px;
    }
    h3 {
        //margin-bottom: 10px;
        font-size: 16px;

    }

`;
//버튼에 가까이 대면 버튼 커지도록 만들기
//위치 및 디자인 조정 필요

const ButtonLink = styled(Link)`
    font-size:27px;
    margin-left:70px;
    margin-bottom:40px;

`;
//폰트 크기가 안바뀜
const ButtonBox = styled.div`
    width:220px;
    height:45px;
	background-color: rgba(254, 176, 98, 0.798);
	border: none;
	border-radius: 10px;
	color: black;
    margin-top:170px;
    margin-left:50px;
    //text-align: center;
`;

function Home(){
    return (
        <>
        <Wrapper>
            <FontBox>
                <h1>coffe capsook</h1>
                <h2>당신의 커피 취향은 무엇인가요?</h2>
                <h3>coffe capsook에서 당신의 취향에 맞는 커피 캡슐을 추천해드립니다 </h3>
            </FontBox>
            <ButtonBox>
                <ButtonLink to="/Login">Log in</ButtonLink>
            </ButtonBox>
             
        </Wrapper>  
           
        </>
    );
}
export default Home;
//