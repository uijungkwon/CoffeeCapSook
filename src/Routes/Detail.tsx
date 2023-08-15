import { styled } from "styled-components";
import {  useParams} from "react-router-dom";
import {  motion} from "framer-motion";
import results from "../contents/results";
const Wrapper = styled.div`
  overflow-x: hidden;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:white;
`;
interface RouteParams {
    num: string;
  }
  const Title = styled.div`
  border-radius: 10px;
  background-color: #de9b319c;
  box-shadow: 0px 2px 4px black;
  width:60%;

  margin-top:-130px;
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
  margin: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
      color:black;
      font-size:21px;
  }
  h2 {
    background-color: #de9b319c;
    text-align: center;
    width:45%;
    font-size:23px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px black;
  }
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
                    <br></br>
                    
                    <Content>
                    <h2 style = {{color:"black", fontSize:"30px", fontWeight:"bold", marginBottom:"25px"}}>이런 커피가 잘맞아요</h2>
                     <h1>{results[n].feature}</h1>
                    </Content>
            </Div>
     </Wrapper>
     </>
    );
}