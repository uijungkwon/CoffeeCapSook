import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useParams,RouteComponentProps,useLocation,useHistory,useRouteMatch ,withRouter } from "react-router-dom";
import quiz from "../contents/questions";
import results from '../contents/results';

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
	font-size: 20px;
	color: ${(props) => props.theme.accentColor};
    margin-top:50px;
    margin-left:50px;
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
        }, 2000);
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
                { showResult &&
                    <div>
                       <h1 style = {{color:"black", fontSize:"40px"}}>{results[parseInt(match.params.tendency)-1].title}</h1>
                       <h2 style = {{color:"black", fontSize:"25px"}}>{results[parseInt(match.params.tendency)-1].content}</h2> 
                       <Button onClick = {onClick}>저장하기</Button>
                       <Link to = "/QuizPage"><Button>다시하기</Button></Link>
                    </div>

                }
                {!showResult &&
                    <div style = {{color:"black", fontSize:"40px"}}>로딩중입니다..</div>
                }
            </Wrapper>
        </>
    );
};

export default withRouter(ResultCard);