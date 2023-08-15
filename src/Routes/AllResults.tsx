import { styled } from "styled-components";
import { Link} from "react-router-dom";
import {  motion } from "framer-motion";


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
const Ul = styled.ul` `;
const Li  = styled.li`
  color:black;
  strong{
      font-weight:bold;
    }
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
                  <Box>암 슈퍼 sour 슈퍼 sour 형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/1`,
                    }}
                >
                  <Box>나 가을 타나봐 형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/2`,
                    }}
                >
                  <Box>자유로운 예술가 형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/3`,
                    }}
                >
                  <Box>건물 사이에 피어난 장미 형</Box>
                </Link>
              </li>
              <li>
                <Link
                  to={{
                   pathname: `/AllResults/4`,
                    }}
                >
                  <Box>무엇이든 다좋다 형</Box>
                </Link>
              </li>
              
            </Ul>
        </Wrapper>
        </>
    );
}
export default AllResults;