import React, {useEffect, useState, useRef} from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
//import { fetchCoins } from "../api";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { AnimatePresence, motion, useScroll,useMotionValueEvent, } from "framer-motion";
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
const Title = styled.div`
    //position: absolute;
    margin-top:30px;
    font-size:40px;
    font-weight:bold;
    color:black;
`;

const Ul = styled.ul`
 
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
const ImgBox = styled.div`
  margin-top:-50px;
  margin-bottom:20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const Box = styled(motion.div)`
  background: #dfdfdf;
  width: 400px;
  height: 100px;
  font-weight:bold;
  margin-top:40px;
  border-radius: 15px;
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

function AllResults(){

    return (
        <>
        <Wrapper>
            <Header>
                <Title>전체 결과 유형</Title>
            </Header>
            <Ul>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/0`,
                    }}
                >
                  <Box>1번 결과 유형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/1`,
                    }}
                >
                  <Box>2번 결과 유형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/2`,
                    }}
                >
                  <Box>3번 결과 유형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/3`,
                    }}
                >
                  <Box>4번 결과 유형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/4`,
                    }}
                >
                  <Box>5번 결과 유형</Box>
                </Link>
              </li>
              
            </Ul>
        </Wrapper>
        </>
    );
}
export default AllResults;