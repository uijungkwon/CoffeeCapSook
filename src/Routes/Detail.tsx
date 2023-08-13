import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
//import { fetchCoins } from "../api";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
import results from "../contents/results";
//import { coffee } from "../data/coffee";

const Wrapper = styled.div`
  overflow-x: hidden;
  height:100vh;
  display: flex;
  flex-direction: column;
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

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
const ImgBox = styled.div`
  margin-top:-50px;
  margin-bottom:20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;


interface RouteParams {
    num: string;
  }
  const Title = styled.div`
  background-color: pink;
  //margin-top:-400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
      color:black;
      font-size:37px;
      font-weight: bold;
  }
`;
const Content = styled.div`
  width:620px;
  height:200px;
  background-color: #81eaff;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1{
      color:black;
      font-size:37px;
      font-weight: bold;
  }
`;
const Hr = styled.hr`
  background-color:black;
  width:90%;
  height:2px;
`;
const Div = styled(motion.div)`//화면을 부드럽게 넘기는 모션 적용
  margin-top: 70px;
  background-color:whitesmoke;
  width: 700px; 
  height: 900px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  padding: 22px 22px 22px 22px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;
const divVariants = {
    initial: {
      opacity: 0
    },
    in: { 
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };
//디테일한 결과 유형 디테일 페이지 만들기
export function Detail(){
  //URL에 적힌 값 가져오기(이중 라우터 X)
  const { num } = useParams<RouteParams>();
  const n = parseInt(num);
    return (
     <>
     <Wrapper>
            <Div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 2 }}
            variants={divVariants}
            >
                <Title>
                    <h1>{results[n].title}</h1>
                </Title>   
                    <Content>
                       <h1>{results[n].content}</h1>
                     </Content>
                    <Hr></Hr>
                    <Content>
                     <h1>추천해주는 커피 특징 </h1>
                    </Content>
            </Div>
     </Wrapper>
     </>
    );
}