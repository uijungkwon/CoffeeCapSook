import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useParams,RouteComponentProps,useLocation,useHistory,useRouteMatch ,withRouter } from "react-router-dom";
import quiz from "../contents/questions";
import results from '../contents/results';
const loading = require("../images/spinner.gif");


const Wrapper = styled.div`
  overflow-x: hidden;
  height:130vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-size: cover;
  position: relative;
  background-color:whitesmoke;
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
const Button = styled.button`
    margin-top:20px;
	width:200px;
    height:50px;
    font-family:"Hanna" ;
	background-color: rgba(211, 211, 211, 0.798);
	border: none;
	border-radius: 10px;
	font-size: 25px;
	color: ${(props) => props.theme.accentColor};
    //margin-top:50px;
    //margin-left:50px;
`;

interface MatchParams {
    tendency:string;
};
interface IResult {
    title:string;
    content: string;
};
const Img = styled.img`
    width:200px;
    height: 800px;
`;
const ResultCard: React.FunctionComponent<RouteComponentProps<MatchParams>> 
      = ({match}) => {
    const [showResult, setShowResult] = useState(false);
     console.log(match.params.tendency);
    useEffect(()=> {
        const tick = setTimeout(() => {
            setShowResult(true);
        }, 3000);
        return () => clearTimeout(tick);
    });
const history = useHistory();
const onClick = () =>{
    //추천된 캡슐 정보 저장 하는 코드 작성 
    history.push("/MyPage");
}
return (
        <>
            <Wrapper>
             <AnimatePresence>
                { showResult &&
                
                    <Div
                    //키를 다르게 설정 해주어야 해당 애니메이션이 계속 설정됨
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={{ duration: 2 }}
                    variants={divVariants}
                    
                    >
                     <Title>
                        <h1 >{results[parseInt(match.params.tendency)-1].title}</h1>
                        <h1> 결과 유형 부가 설명</h1>
                     </Title>   
                     <Content>
                       <h1>커피 유형 설명</h1>
                     </Content>
                     <Hr></Hr>
                     <Content>
                     <h1>추천해주는 커피 특징 </h1>
                     </Content>
                     <Hr></Hr>
                     <Content>
                     <h1>추천된 커피 캡슐 자리</h1>
                     </Content>
                       <Link to = "/QuizPage/1"><Button>다시하기</Button></Link>
                    </Div>
                 
                }
            
                {!showResult &&
                <>
                    <div>
                     <img src = {loading}></img>
                    </div>
                    <div style = {{color:"black", fontSize:"35px"}}>Loading...</div>
                </>
                }
              </AnimatePresence>
            </Wrapper>
        </>
    );
};

export default withRouter(ResultCard);
/*
<Button onClick = {onClick}>저장하기</Button>
//저장하기 버튼 보류(자동 저장 되도록 생성)
*/