import React from 'react';
import QuizCard from '../components/QuizCard';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
const Wrapper = styled.div`
  overflow-x: hidden;
  height:110vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:whitesmoke;
`;
const Title = styled.div`
    position: absolute;
    margin-top:-550px;
    font-size:40px;
    font-weight:bold;
    color:black;
`;
const Box = styled(motion.div)`
  //background: #f5f5f50;
  width: 450px;
  height: 450px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px black;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  //flex-direction: column;
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
	width:200px;
    height:50px;
    font-family:"Hanna" ;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 25px;
	color: ${(props) => props.theme.accentColor};
    margin-top:50px;
    margin-left:50px;
`;
const QuizPage = () => {
    const [index, setIndex]  = useState(1);
    const onClick = ()=>{
        setIndex((prev) => prev+1);

    }

    return (
        <>
        <Wrapper>
            <Link to = {`/QuizPage/${index}`}><Button onClick = {onClick}> 다음으로 !</Button></Link>
        </Wrapper>
        </>
    );//디테일 페이지를 호줄 
};

export default QuizPage;